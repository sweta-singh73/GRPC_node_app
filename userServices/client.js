import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userProtoPath = path.join(__dirname, './proto/user.proto');
const bookProtoPath = path.join(__dirname, './proto/book.proto');

const userDef = protoLoader.loadSync(userProtoPath);
const bookDef = protoLoader.loadSync(bookProtoPath);

const userPackage = grpc.loadPackageDefinition(userDef).user;
const bookPackage = grpc.loadPackageDefinition(bookDef).book;

const userClient = new userPackage.UserService('localhost:50051', grpc.credentials.createInsecure());
const bookClient = new bookPackage.BookService('localhost:50052', grpc.credentials.createInsecure());

// Create User → Then Add Book
userClient.CreateUser(
  { name: 'Alice', email: 'test3@example.com', password: '123456' },
  (err, userRes) => {
    if (err) return console.error('Signup error:', err.message);
    console.log(' User Created:', userRes);

    bookClient.AddBook(
      {
        title: 'gRPC for Beginners',
        author: userRes.name,
        description: 'A book about gRPC basics',
      },
      (bookErr, bookRes) => {
        if (bookErr) return console.error('AddBook error:', bookErr.message);
        console.log(' Book Added:', bookRes);
      }
    );
  }
);

