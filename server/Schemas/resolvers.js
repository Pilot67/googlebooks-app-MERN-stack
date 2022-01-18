const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth.old");

const resolvers = {
  Query: {
    me: (root, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
        //might need to add .populate(Books) here
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: (root, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: (root, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    removeBook: (root, { bookId }, context) => {
      if (context.user) {
        const updatedUser = Book.findOneAndUpdate(
          { id_: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //
    //Add resolver for adding a new book here
    //
  },
};

module.exports = resolvers;
