import express from "express";

const app = express();

import userRouter from "./routes/user.routes.js";

app.use(express.json());
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("grpc gateway running at port", 3000);
});
