import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import bookController from "./src/modules/book/book.controller.js";

// Emulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/book.proto")
);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const bookPackage = grpcObj.book;

const server = new grpc.Server();
server.addService(bookPackage.BookService.service, bookController);

const start = async () => {
  await connectDB();
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("gRPC server running at 0.0.0.0:50051");
    }
  );
};

start();
