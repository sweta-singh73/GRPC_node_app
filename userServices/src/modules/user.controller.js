// // src/modules/user.controller.js
// import userService from "./user.controller.js";

// export default {
//   async SignUp(call, callback) {
//     try {
//       const user = await userService.createUser(call.request);
//       callback(null, {
//         id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//       });
//     } catch (error) {
//       callback(null, { message: error.message });
//     }
//   },

//   async Login(call, callback) {
//     try {
//       const user = await userService.authenticateUser(call.request);
//       callback(null, {
//         id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//       });
//     } catch (error) {
//       callback(null, { message: error.message });
//     }
//   },

//   async GetUser(call, callback) {
//     try {
//       const user = await userService.getUserById(call.request.userId);
//       callback(null, {
//         id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//       });
//     } catch (error) {
//       callback(null, { message: error.message });
//     }
//   },
// };
import grpc from "@grpc/grpc-js";

import { createUser, getUser, loginUser } from "./user.service.js";

export const CreateUser = async (call, callback) => {
  try {
    const user = await createUser(call.request);
    console.log("user", user);
    callback(null, user);
  } catch (err) {
    callback(err);
  }
};

export const AuthenticateUser = async (call, callback) => {
  try {
    const token = await loginUser(call.request);
    callback(null, { token });
  } catch (err) {
    callback(err);
  }
};

export const GetUserById = async (call, callback) => {
  try {
    // Ensure the request contains the necessary user ID
    const userId = call.request.userId;

    if (!userId) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "User ID is required",
      });
    }

    // Call your service to fetch the user by ID
    const user = await getUser(userId);

    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    // Respond with user details
    callback(null, {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Error fetching user: ${error.message}`,
    });
  }
};
