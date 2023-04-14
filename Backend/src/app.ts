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

const server = express();

server.use(
  expressRateLimit({
    windowMs: 1000,
    max: 25,
  })
);

server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());
server.use(preventXss);
server.use(expressFileUpload());
server.use("/api", dataRoutes);
server.use("/api", authRoute);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);
