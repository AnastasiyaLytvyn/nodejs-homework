const logger = require("morgan");
const cors = require("cors");

const express = require("express");

const { rootRouter } = require("./routes");
const { notFound, serverError } = require("./utils/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", rootRouter);

app.use(notFound);
app.use(serverError);

module.exports = app;
