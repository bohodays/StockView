// lib/api/ws-client.ts
type Listener = (msg: any) => void;

type Outgoing =
  | { type: "subscribe"; symbol: string }
  | { type: "unsubscribe"; symbol: string };

export class FinnhubWS {
  private ws?: WebSocket;
  private url: string;
  private listeners = new Set<Listener>();

  private destroyed = false;
  private reconnectTimer?: number;
  private backoffMs = 1500; // 1.5s -> 3s -> 6s ... 최대 15s

  private outbox: Outgoing[] = []; // OPEN 전 보내야 할 메시지
  private subs = new Set<string>(); // 현재 구독(재연결시 복원)

  constructor(token: string) {
    this.url = `wss://ws.finnhub.io?token=${token}`;
  }

  private safeSend(msg: Outgoing) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      this.outbox.push(msg);
    }
  }

  private flush() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    for (const m of this.outbox) this.ws.send(JSON.stringify(m));
    this.outbox = [];
  }

  connect() {
    if (this.destroyed) return;
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.ws = new WebSocket(this.url);

    this.ws.addEventListener("open", () => {
      // 재연결 시 기존 구독 복원
      for (const s of this.subs) {
        this.ws!.send(JSON.stringify({ type: "subscribe", symbol: s }));
      }
      this.flush();
      this.backoffMs = 1500; // 성공 시 백오프 초기화
    });

    this.ws.addEventListener("message", (e) => {
      try {
        const data = JSON.parse(e.data);
        this.listeners.forEach((cb) => cb(data));
      } catch {
        /* ignore */
      }
    });

    this.ws.addEventListener("close", (ev) => {
      if (this.destroyed) return;
      // 재연결
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = window.setTimeout(
        () => this.connect(),
        this.backoffMs
      );
      this.backoffMs = Math.min(this.backoffMs * 2, 15000);
    });

    this.ws.addEventListener("error", () => {
      try {
        this.ws?.close();
      } catch {}
    });
  }

  subscribe(symbol: string) {
    if (!this.ws) this.connect();
    if (this.subs.has(symbol)) return; // 중복 구독 방지
    this.subs.add(symbol);
    this.safeSend({ type: "subscribe", symbol });
  }

  unsubscribe(symbol: string) {
    if (!this.subs.has(symbol)) return;
    this.subs.delete(symbol);
    this.safeSend({ type: "unsubscribe", symbol });
  }

  onMessage(cb: Listener) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  destroy() {
    this.destroyed = true;
    clearTimeout(this.reconnectTimer);
    try {
      // 선택: 해제 이벤트 보내고 닫기 (OPEN일 때만)
      if (this.ws?.readyState === WebSocket.OPEN) {
        for (const s of this.subs) {
          this.ws.send(JSON.stringify({ type: "unsubscribe", symbol: s }));
        }
      }
      this.ws?.close();
    } catch {}
    this.ws = undefined;
    this.outbox = [];
    this.subs.clear();
    this.listeners.clear();
  }
}
