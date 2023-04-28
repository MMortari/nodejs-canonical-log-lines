import express from "express";

import { logger, logger_canonical } from "./log";

const app = express();

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    logger_canonical.info("", {
      data: {
        http_path: req.originalUrl,
        http_method: req.method,
        duration: ((Date.now() - start) / 1000).toFixed(3),
        http_status: res.statusCode,
        service: "mobile-bff",
      },
    });
  });

  next();
});

app.get("/user", async (req, res) => {
  logger.info("User data fetched successfully");

  await new Promise((res) => {
    setTimeout(() => res(null), Math.random() * 500);
  });

  res.send([]);
});

app.listen(3333, () => console.log("Listening on port 3333"));
