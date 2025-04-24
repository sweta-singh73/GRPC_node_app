import { addBook, getBookById, listBooks } from "./book.service.js";


export const AddBook = async (call, callback) => {
  try {
    const book = await addBook(call.request);
    callback(null, book);
  } catch (err) {
    callback(err);
  }
};

export const GetBookById = async (call, callback) => {
  try {
    const book = await getBookById(call.request);
    callback(null, book);
  } catch (err) {
    callback(err);
  }
};

export const ListBooks = async (call, callback) => {
  try {
    const books = await listBooks();
    callback(null, books);
  } catch (err) {
    callback(err);
  }
};
