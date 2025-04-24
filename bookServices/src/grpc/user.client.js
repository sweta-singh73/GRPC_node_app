import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const protoPath = path.resolve(__dirname, "../../proto/user.proto");

const packageDef = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.user;

const userClient = new userPackage.UserService(
  `localhost:${process.env.USER_SERVICE_PORT}`,
  grpc.credentials.createInsecure()
);

export default userClient;
