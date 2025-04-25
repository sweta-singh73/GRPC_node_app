import Book from "../../models/book.model.js";

export const addBook = async ({ title, author, description }) => {
  const book = await Book.create({ title, author, description });
  return {
    id: book._id.toString(),
    title: book.title,
    author: book.author,
    description: book.description,
  };
};

export const getBookById = async ({ id }) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Book not found");
  return {
    id: book._id.toString(),
    title: book.title,
    author: book.author,
    description: book.description,
  };
};

export const listBooks = async () => {
  const books = await Book.find();
  return {
    books: books.map((book) => ({
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      description: book.description,
    })),
  };
};

export const deleteBookById = async ({id}) => {
  const book = await Book.findByIdAndDelete({ _id: id });
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};
