type Listener = (msg: any) => void;

export class FinnhubWS {
  private ws?: WebSocket;
  private url: string;
  private listeners = new Set<Listener>();
  private connected = false;
  private queue: string[] = [];
  private retry?: number;

  constructor(token: string) {
    this.url = `wss://ws.finnhub.io?token=${token}`;
  }

  connect() {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    )
      return;

    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.connected = true;
      this.queue.forEach((s) =>
        this.ws?.send(JSON.stringify({ type: "subscribe", symbol: s }))
      );
      this.queue = [];
    };

    this.ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        this.listeners.forEach((cb) => cb(data));
      } catch {}
    };

    this.ws.onclose = () => {
      this.connected = false;
      this.retry = window.setTimeout(() => this.connect(), 1500);
    };

    this.ws.onerror = () => {
      try {
        this.ws?.close();
      } catch {}
    };
  }

  subscribe(symbol: string) {
    if (!this.ws) this.connect();
    if (this.connected)
      this.ws?.send(JSON.stringify({ type: "subscribe", symbol }));
    else this.queue.push(symbol);
  }

  unsubscribe(symbol: string) {
    try {
      this.ws?.send(JSON.stringify({ type: "unsubscribe", symbol }));
    } catch {}
  }

  onMessage(cb: Listener) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  destroy() {
    if (this.retry) window.clearTimeout(this.retry);
    try {
      this.ws?.close();
    } catch {}
    this.ws = undefined;
    this.connected = false;
    this.queue = [];
    this.listeners.clear();
  }
}
