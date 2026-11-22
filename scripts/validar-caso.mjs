import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function csv(name){
 const lines=fs.readFileSync(path.join(root,'datos',name+'.csv'),'utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/);
 assert(lines.length>1,name+': faltan datos');
 const header=lines.shift().split(',');
 assert.equal(new Set(header).size,header.length,name+': cabeceras repetidas');
 // El formato actual no contiene campos entrecomillados; fallar si cambia.
 return lines.map(line=>{
  assert(!line.includes('"'),'Revisar parser si se añaden campos CSV entrecomillados');
  const fields=line.split(',');
  assert.equal(fields.length,header.length,name+': columnas');
  return Object.fromEntries(header.map((key,i)=>[key,fields[i]]));
 });
}
function n(row,key){
 const value=Number(row[key]);
 assert(row[key]?.trim()&&Number.isSafeInteger(value)&&value>=0,'Conteo inválido: '+key);
 return value;
}
const totals=csv('totales');
assert.equal(totals.length,1,'Se requiere una sola cohorte de totales');
const t=totals[0];
const total=n(t,'total'),abandono=n(t,'con_abandono'),pedidos=n(t,'confirmados'),recuperados=n(t,'recuperados');
assert(total>0&&abandono>0,'Denominadores positivos');
for(const key of ['con_abandono','confirmados','checkout','pago','recuperados'])assert(n(t,key)<=total,key+': excede cohorte');
assert(recuperados<=abandono&&recuperados<=pedidos,'Recuperados fuera de alcance');
assert(n(t,'pago')<=n(t,'checkout'),'Hitos');
const sum=(rows,key)=>rows.reduce((a,r)=>a+n(r,key),0);
const etapas=csv('etapas'),periodos=csv('periodos'),segmentos=csv('segmentos'),envios=csv('envio'),rangos=csv('rangos_subtotal'),umbral=csv('umbral');
assert.equal(sum(etapas,'carritos'),abandono,'Etapas');
for(const rows of [periodos,segmentos,envios]){
 assert.equal(sum(rows,'total'),total,'Desglose total');
 assert.equal(sum(rows,'abandono'),abandono,'Desglose abandono');
 assert.equal(sum(rows,'confirmados'),pedidos,'Desglose pedidos');
 for(const row of rows){assert(n(row,'abandono')<=n(row,'total'));assert(n(row,'confirmados')<=n(row,'total'));}
}
assert.equal(sum(segmentos,'recuperados'),recuperados,'Segmentos recuperados');
const domicilio=envios.filter(r=>r.metodo_analisis==='Entrega a domicilio'&&r.envio_analisis!=='');
// Rangos y umbral deben excluir retiro y cotizaciones desconocidas.
for(const [rows,keys]of [[rangos,['carritos','con_abandono','pedidos']],[umbral,['total','abandono','confirmados']]]){
 for(const [i,key]of keys.entries()){
  assert.equal(sum(rows,key),sum(domicilio,['total','abandono','confirmados'][i]),'Subconjunto domicilio: '+key);
 }
}
const debajo=umbral.find(r=>r.grupo==='Por debajo'),encima=umbral.find(r=>r.grupo==='Por encima');
assert(debajo&&encima);
assert(n(debajo,'total')>0&&n(encima,'total')>0,'Umbral sin observaciones');
const por= (a,b)=>(a/b*100).toFixed(2);
let linkCount=0;const markdown=[];
function walk(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  if(entry.name.startsWith('.')||entry.name==='node_modules')continue;
  const full=path.join(dir,entry.name);
  if(entry.isDirectory())walk(full);
  else if(entry.name.endsWith('.md'))markdown.push(full);
 }
}
walk(root);
for(const file of markdown){
 const content=fs.readFileSync(file,'utf8');
 assert.equal((content.match(/^```/gm)||[]).length%2,0,'Bloque incompleto: '+file);
 for(const m of content.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)){
  const target=m[1].trim().replace(/^<|>$/g,'');
  if(/^(?:https?:|mailto:|#)/.test(target))continue;
  const relative=decodeURIComponent(target.split('#')[0]);
  assert(fs.existsSync(path.resolve(path.dirname(file),relative)),'Enlace roto: '+path.relative(root,file)+' → '+relative);
  linkCount++;
 }
}
console.log('Agregados conciliados, subconjuntos de domicilio correctos y '+linkCount+' enlaces locales válidos.');
console.log(JSON.stringify({carritos:total,abandono:por(abandono,total)+'%',conversion:por(pedidos,total)+'%',recuperacion:por(recuperados,abandono)+'%',checkout:por(n(t,'checkout'),total)+'%',conversionDebajo:por(n(debajo,'confirmados'),n(debajo,'total'))+'%',conversionEncima:por(n(encima,'confirmados'),n(encima,'total'))+'%',diferenciaPuntos:(n(encima,'confirmados')/n(encima,'total')*100-n(debajo,'confirmados')/n(debajo,'total')*100).toFixed(2)},null,2));
