// // import SockJS from 'sockjs-client';
// // import { Client } from '@stomp/stompjs';

// // let stompClient: Client | null = null;

// // export const connectBattleSocket = (
// //   roomCode: string,
// //   onMessage: (data: any) => void
// // ) => {
// //   stompClient = new Client({
// //     webSocketFactory: () => new SockJS('http://localhost:8080/quiz-battle'),
// //     reconnectDelay: 5000,
// //     onConnect: () => {
// //       console.log('✅ Connected to Battle WebSocket');

// //       stompClient?.subscribe(`/topic/${roomCode}`, (message) => {
// //         const payload = JSON.parse(message.body);
// //         onMessage(payload);
// //       });
// //     },
// //   });

// //   stompClient.activate();
// // };

// // export const sendJoinBattle = (roomCode: string, studentId: number) => {
// //   stompClient?.publish({
// //     destination: '/app/join',
// //     body: JSON.stringify({ code: roomCode, studentId }),
// //   });
// // };

// // export const sendAnswer = (
// //   roomCode: string,
// //   studentId: number,
// //   answer: string
// // ) => {
// //   stompClient?.publish({
// //     destination: '/app/answer',
// //     body: JSON.stringify({ code: roomCode, studentId, answer }),
// //   });
// // };

// // export const disconnectBattleSocket = () => {
// //   stompClient?.deactivate();

// // };




// import SockJS from 'sockjs-client/dist/sockjs';
// import { Client } from '@stomp/stompjs';

// let stompClient: Client | null = null;

// const SOCKET_URL = 'http://localhost:8080/quiz-battle';

// export const connectBattleSocket = (
//   battleCode: string,
//   onMessage: (msg: any) => void
// ) => {
//   const socket = new SockJS(SOCKET_URL);

//   stompClient = new Client({
//     webSocketFactory: () => socket as any,
//     reconnectDelay: 5000,
//     debug: () => {},
//     onConnect: () => {
//       console.log('✅ Battle socket connected');

//       stompClient?.subscribe(`/topic/${battleCode}`, (message) => {
//         const payload = JSON.parse(message.body);
//         onMessage(payload);
//       });
//     },
//     onStompError: (frame) => {
//       console.error('❌ STOMP error', frame);
//     },
//   });

//   stompClient.activate();
// };

// export const sendJoinBattle = (code: string, studentId: number) => {
//   stompClient?.publish({
//     destination: '/app/join',
//     body: JSON.stringify({ code, studentId }),
//   });
// };

// export const sendAnswer = (
//   code: string,
//   studentId: number,
//   answer: string
// ) => {
//   stompClient?.publish({
//     destination: '/app/answer',
//     body: JSON.stringify({ code, studentId, answer }),
//   });
// };

// export const disconnectBattleSocket = () => {
//   stompClient?.deactivate();
//   stompClient = null;
// };



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

      // stompClient?.subscribe(`/topic/battle/${battleCode}`, (message) => {
      //   onMessage(JSON.parse(message.body));
      // });
      /* --- Update this in battleSocket.ts --- */

    stompClient?.subscribe(`/topic/battle/${battleCode}`, (message) => {
        // 🔥 Check if it's a plain string first
        if (message.body === "START") {
            onMessage("START");
        } else {
            try {
                // Only parse if it's actually JSON (like the Room object)
                onMessage(JSON.parse(message.body));
            } catch (e) {
                console.error("📩 WS Parsing error:", e, "Body:", message.body);
                // Fallback: send the raw body if parsing fails
                onMessage(message.body);
            }
        }
    });
      // 🔥 SEND JOIN IF IT WAS CALLED EARLY
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
    // queue join safely
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
