
import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;
let isConnected = false;
let pendingJoin: { code: string; studentEmail: string } | null = null;

const SOCKET_URL = 'http://localhost:8080/quiz-battle';

export const connectBattleSocket = (
  battleCode: string,
  onMessage: (msg: any) => void
) => {
  const socket = new SockJS(SOCKET_URL);

  stompClient = new Client({
    webSocketFactory: () => socket as any,
    reconnectDelay: 5000,
    debug: () => {},
    onConnect: () => {
      console.log('✅ Battle socket connected');
      isConnected = true;
    stompClient?.subscribe(`/topic/battle/${battleCode}`, (message) => {
        if (message.body === "START") {
            onMessage("START");
        } else {
            try {
                onMessage(JSON.parse(message.body));
            } catch (e) {
                console.error("📩 WS Parsing error:", e, "Body:", message.body);
                onMessage(message.body);
            }
        }
    });
      if (pendingJoin) {
        stompClient.publish({
          destination: '/app/join',
          body: JSON.stringify(pendingJoin),
        });
        pendingJoin = null;
      }
    },
  });

  stompClient.activate();
};

export const sendJoinBattle = (code: string, studentEmail: string) => {
  if (!stompClient || !isConnected) {
    pendingJoin = { code, studentEmail };
    return;
  }

  stompClient.publish({
    destination: '/app/join',
    body: JSON.stringify({ code, studentEmail }),
  });
};

export const sendAnswer = (
  code: string,
  studentEmail: string,
  answer: string
) => {
  if (!stompClient || !isConnected) return;

  stompClient.publish({
    destination: '/app/answer',
    body: JSON.stringify({ code, studentEmail, answer }),
  });
};

export const disconnectBattleSocket = () => {
  stompClient?.deactivate();
  stompClient = null;
  isConnected = false;
};
