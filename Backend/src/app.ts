import express from "express";
import cors from "cors";
import dataRoutes from "./6-routes/data-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoute from "./6-routes/auth-routes";
import expressFileUpload from "express-fileupload";
import preventXss from "./3-middleware/prevent-xss";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import http from "http";
import socketIoService from "./5-services/socket.io-service"

const expressServer = express();

expressServer.use(
  expressRateLimit({
    windowMs: 1000,
    max: 25,
  })
);

// server.use(helmet());

expressServer.use(
  cors({
    origin: "*",
  })
);
expressServer.use(express.json());
expressServer.use(preventXss);
expressServer.use(expressFileUpload());
expressServer.use("/api", dataRoutes);
expressServer.use("/api", authRoute);
expressServer.use(routeNotFound);
expressServer.use(catchAll);

const httpServer = expressServer.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);

socketIoService.init(httpServer)