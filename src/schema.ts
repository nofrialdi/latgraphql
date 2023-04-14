import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefinitions = `
  type Query {
    books: [Book]!
    book(id: Int!): Book
  }

  type Mutation {
    createBook(book: InputBook!): Book
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    publisher: String!
    category: String!
    realeseDate: Int!
  }
 
  input InputBook {
    title: String!
    author: String!
    publisher: String!
    category: String!
    realeseDate: Int!
  }
`;

type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  category: string;
  realeseDate: number;
};

type InputBook = {
  title: string;
  author: string;
  publisher: string;
  category: string;
  realeseDate: number;
};

const books: Book[] = [
  {
    id: 1,
    title: "JavaScript: The Definitive Guide, 4th Edition",
    author: "David Flanagan",
    publisher: "O'Reilly Media",
    category: "Computer & Technology",
    realeseDate: 2001,
  },
  {
    id: 2,
    title: "Head First HTML with CSS & XHTML",
    author: "Eric Freeman",
    publisher: "O'Reilly Media",
    category: "Computer & Technology",
    realeseDate: 2005,
  },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (_parent: unknown, args: { id: number }) => books.find((book) => book.id === args.id),
  },
  Mutation: {
    createBook: (_parent: unknown, args: { book: InputBook }) => {
      const lastId = books[books.length - 1].id;

      const newBook: Book = {
        id: lastId + 1,
        title: args.book.title,
        author: args.book.author,
        publisher: args.book.publisher,
        category: args.book.category,
        realeseDate: args.book.realeseDate,
      };

      books.push(newBook);

      return newBook;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
