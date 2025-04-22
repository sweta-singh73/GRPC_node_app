import bookService from "./book.service.js";

const bookController = {
  AddBook: async (call, callback) => {
    const response = await bookService.addBook(call.request);
    callback(null, response);
  },  
  GetBooks: async (call, callback) => {
    const { books } = await bookService.getBooks();
    callback(null, { books });
  },
};



export default bookController;
