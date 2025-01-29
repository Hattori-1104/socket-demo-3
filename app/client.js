

const ws = new WebSocket("ws://127.0.0.1:3000");

function main() {
  const sendButton = document.getElementById("send");
  const messageInput = document.getElementById("message");

  sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    ws.send(message);
  });
}

ws.onopen = () => {
  console.log("WebSocket connection opened");
  main();
};

ws.onmessage = (event) => {
  console.log("サーバーからのメッセージ:", event.data);
};

ws.onclose = () => {
  console.log("WebSocket connection closed");
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker登録成功:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker登録失敗:', error);
      });
  });
}