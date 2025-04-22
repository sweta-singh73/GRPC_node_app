import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoPath = path.resolve(__dirname, "../bookServices/proto/book.proto");
const packageDefinition = protoLoader.loadSync(protoPath);
const grpcObj = grpc.loadPackageDefinition(packageDefinition);
const bookPackage = grpcObj.book;
const client = new bookPackage.BookService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.AddBook({ title: "Deno in Action", author: "John Doe" }, (err, res) => {
  if (err) return console.error("Error adding book:", err);
  console.log("AddBook:", res.message);
});

client.GetBooks({}, (err, res) => {
  if (err) return console.error("Error fetching books:", err);
  console.log("Book List:", res.books);
});



