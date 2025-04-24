import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import {
  CreateUser,
  AuthenticateUser,
  GetUserById,
} from "./src/modules/user.controller.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userProtoPath = path.join(__dirname, "./proto/user.proto");

const userDef = protoLoader.loadSync(userProtoPath);
const userProto = grpc.loadPackageDefinition(userDef).user;

const server = new grpc.Server();
server.addService(userProto.UserService.service, {
  CreateUser,
  AuthenticateUser,
  GetUserById,
});

const start = async () => {
  await connectDB();
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(" User gRPC running at 0.0.0.0 :50051");
    }
  );
};

start();
