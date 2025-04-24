import grpc from "@grpc/grpc-js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "hdgfjdfhgfhkgh";

export const authInterceptor = (method) => {
  return (call, callback) => {
    const metadata = call.metadata;

    if (!metadata || !metadata.get) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        details: "Missing metadata",
      });
    }

    const authHeader = metadata.get("authorization")[0];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        details: "Invalid or missing token",
      });
    }

    const token = authHeader.slice(7);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return callback({
          code: grpc.status.UNAUTHENTICATED,
          details: "Invalid or expired token",
        });
      }

      call.user = decoded;
      method(call, callback);
    });
  };
};
