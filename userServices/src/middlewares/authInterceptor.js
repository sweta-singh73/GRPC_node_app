import jwt from "jsonwebtoken";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = "hdgfjdfhgfhkgh";

const USER_PROTO_PATH = path.join(__dirname, "../../proto/user.proto");

const userDef = protoLoader.loadSync(USER_PROTO_PATH);
const userPackage = grpc.loadPackageDefinition(userDef).user;

const userClient = new userPackage.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export const authInterceptor = (originalMethod) => {
  return (call, callback) => {
    const token = call.metadata.get("authorization")[0]?.split(" ")[1];
    if (!token) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: "Missing token",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: "Invalid or expired token",
      });
    }

    userClient.GetUserById({ userId: decoded.id }, (err, res) => {
      if (err || !res) {
        return callback({
          code: grpc.status.UNAUTHENTICATED,
          message: "User not found or unauthorized",
        });
      }

      call.user = res;

      return originalMethod(call, callback);
    });
  };
};
