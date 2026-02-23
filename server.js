const express=require('express')
const fetch=require('node-fetch')
const net=require('net')
const multer=require('multer')
const zlib=require('zlib')

const app=express()
const upload=multer()

app.use(express.json())
app.use(express.static('public'))

function parseTarget(link){
try{
let t=link.split('://')[1]
let hp=t.split('@')[1].split('?')[0].split('#')[0]
return {host:hp.split(':')[0],port:parseInt(hp.split(':')[1])}
}catch{ return null }
}

function tcpPing(host,port,timeout=6000){
return new Promise(r=>{
let s=new net.Socket()
let st=Date.now(),done=false
s.setTimeout(timeout)
s.connect(port,host,()=>{
if(done)return
done=true
s.destroy()
r(Date.now()-st)
})
s.on('error',()=>{if(done)return;done=true;r(null)})
s.on('timeout',()=>{if(done)return;done=true;s.destroy();r(null)})
})
}

async function geo(ip){
try{
let f=await fetch(`https://ipapi.co/${ip}/json/`)
let j=await f.json()
return (j.country||'').toUpperCase()
}catch{ return '' }
}

function flag(c){
if(!c||c.length!==2)return '🏳️'
return String.fromCodePoint(...[...c].map(x=>0x1F1E6+x.charCodeAt(0)-65))
}

app.post('/api/test',async(req,res)=>{
let {configs,name}=req.body
let out=[]
let i=1

for(let c of configs){
let t=parseTarget(c)
if(!t)continue

let p=await tcpPing(t.host,t.port)
let code=await geo(t.host)

let label=`${flag(code)} | ${p===null?'fail':p+'ms'} - ${name}-${i}`
let base=c.split('#')[0]

out.push(base+'#'+label)
i++
}

res.json(out)
})

function tryJson(t){ try{return JSON.parse(t)}catch{return null} }

function tryGunzip(buf){
try{ return zlib.gunzipSync(buf).toString('utf8') }
catch{ return null }
}

app.post('/api/npvt',upload.single('file'),(req,res)=>{
try{

let raw=req.file.buffer
let txt=raw.toString('utf8').trim()

let j=tryJson(txt)
if(j)return res.json({ok:true,data:j})

let b
try{ b=Buffer.from(txt,'base64') }catch{}

if(b){
let t=b.toString('utf8')
let j2=tryJson(t)
if(j2)return res.json({ok:true,data:j2})

let g=tryGunzip(b)
if(g){
let j3=tryJson(g)
if(j3)return res.json({ok:true,data:j3})
}
}

return res.json({ok:false,locked:true})

}catch{
res.json({ok:false,locked:true})
}
})

app.listen(3000)