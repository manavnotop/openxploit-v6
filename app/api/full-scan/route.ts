import { NextRequest } from "next/server";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(req: NextRequest){
  const body = await req.json()
  const url = body.url
  console.log(url);

  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing or invalid URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  //http://localhost:8090/JSON/spider/action/scan/?apikey=&url=http://host.docker.internal:3000

  try{
    const base = 'http://localhost:8090/JSON';
    console.log('start spider scan')

    const spiderScan = await fetch(`${base}/spider/action/scan/?apikey=&url=${url}`);

    console.log(spiderScan);

    const { scan: scanid } = await spiderScan.json();
    
    console.log(scanid);

    console.log('start checking progress for spider scan');
    let spiderScanDone = false
    while (!spiderScanDone) {
      //http://localhost:8090/JSON/spider/view/status/?scanId=0
      const status = await fetch(`${base}/spider/view/status/?scanId=${scanid}`)
      const { status: progress } = await status.json()
      console.log({progress});
      if (progress >= 100) spiderScanDone = true
      else await sleep(10000)
    }
    //http://localhost:8090/JSON/ascan/action/scan/?apikey=&url=http://host.docker.internal:3000
    const activeScan = await fetch(`${base}/ascan/action/scan/?apikey=&url=${encodeURIComponent(url)}`)
    const { scanId: scanId } = await activeScan.json();

    console.log('start checking progress for active scan');
    let activeScanDone = false;
    while(!activeScanDone){
      const status = await fetch(`${base}/ascan/view/status/?scanId=${scanId}`);
      const { status: progress } = await status.json();
      console.log(progress);
      if(progress >= 100) activeScanDone = true;
      else await sleep(10000);
    }

    const summaryRes = await fetch(`${base}/core/view/alertsSummary/?apikey=&baseurl=${encodeURIComponent(url)}`)
    //const alertsRes = await fetch(`${base}/core/view/alerts/?apikey=&baseurl=${encodeURIComponent(url)}`)

    const summary = await summaryRes.json()
    //const alerts = await alertsRes.json()

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  catch(err){
    console.error(err)
    return new Response(JSON.stringify({ error: 'Failed to run full scan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}