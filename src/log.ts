import * as winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined-log.log" }),
  ],
});

export const logger_canonical = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((props) => {
      const { data, timestamp } = props;

      const data_str = Object.entries(data).reduce(
        (prev, [key, val], index) => {
          return prev + `${index === 0 ? "" : " "}${key}=${val}`;
        },
        ""
      );

      return `[${timestamp.replace("T", " ")}] canonical-log-line ${data_str}`;
    })
  ),
  transports: [new winston.transports.File({ filename: "logs/canonical.log" })],
});
