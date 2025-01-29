const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    
    const url = new URL(req.url);
    const pathname = url.pathname;

    if (pathname === "/") {
      return new Response(Bun.file("app/index.html"));
    }
    return new Response(Bun.file(`app${pathname}`));
  },
  websocket: {
    open(ws) {
      console.log("WebSocket connection opened");
    },
    message(ws, message) {
      console.log("WebSocket message received:", message);
      ws.send("Hello from server");
    },
    close(ws) {
      console.log("WebSocket connection closed");
    },
  },
});

console.log(`Server is running on http://localhost:${server.port}`);
