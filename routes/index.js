const express = require("express");

const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const contactsRouter = require("./contactsRoutes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/contacts", contactsRouter);

module.exports = { rootRouter: router };
