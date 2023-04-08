import http from "http";
import SocketIo from "socket.io";

function init(httpServer: http.Server): void {
  const options = { cors: { origin: "*" } };
  const socketServer = new SocketIo.Server(httpServer, options);
  socketServer.sockets.on("connection", (socket: SocketIo.Socket) => {
    console.log("Client has been connected...");

    socket.on("msg-from-client", (msg: "MessageModel") => {
      console.log("Client sent message: " , msg);
      socketServer.sockets.emit("msg-from-server", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client has been disconnected");
    });
  });
}

export default {
  init,
};