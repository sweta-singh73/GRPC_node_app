import Book from "../../models//book.model.js";

const addBook = async (data) => {
  const book = new Book(data);
  await book.save();
  return { message: "Book added successfully" };
};

const getBooks = async () => {
  const books = await Book.find();
  return { books };
};

export default { addBook, getBooks };
