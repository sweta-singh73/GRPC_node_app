import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "../proto/book.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const bookPackage = grpcObject.book;

const client = new bookPackage.BookService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

export default client;
