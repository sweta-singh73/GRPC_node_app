import {
  addBook,
  deleteBookById,
  getBookById,
  listBooks,
} from "./book.service.js";

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

export const DeleteBookById = async (call, callback) => {
  try {
    await deleteBookById(call.request);

    callback(null, { message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);

    callback(err);
  }
};
