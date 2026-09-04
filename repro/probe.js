// Tight push-reconnect probe: connect, close immediately, retry every 20ms.
const PORT = 8080, DEADLINE = Date.now() + 120000;
const url = `ws://localhost:${PORT}/VAADIN/push?v-r=push&v-uiId=0`
  + `&v-pushId=00000000-0000-0000-0000-000000000000`
  + `&X-Atmosphere-tracking-id=0&X-Atmosphere-Framework=3.0.5`
  + `&X-Atmosphere-Transport=websocket&X-Atmosphere-TrackMessageSize=true&X-atmo-protocol=true`;
let n = 0, firstOpen = null;
const ts = () => new Date().toISOString().substring(11, 23);
function go() {
  if (Date.now() > DEADLINE) process.exit(0);
  n++;
  let ws; try { ws = new WebSocket(url); } catch { return setTimeout(go, 20); }
  const t = setTimeout(() => { try { ws.close(); } catch {} }, 500);
  ws.onopen = () => {
    if (!firstOpen) { firstOpen = Date.now(); console.log(`${ts()} FIRST-WS-OPEN attempt=${n}`); }
  };
  ws.onmessage = (m) => console.log(`${ts()} MSG ${String(m.data).substring(0,100)}`);
  ws.onerror = () => {};
  ws.onclose = () => { clearTimeout(t); setTimeout(go, 20); };
}
go();
