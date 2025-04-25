import grpc from "@grpc/grpc-js";

import { createUser, getUser, loginUser } from "./user.service.js";

export const CreateUser = async (call, callback) => {
  try {
    const user = await createUser(call.request);
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
    const userId = call.request.userId;

    if (!userId) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "User ID is required",
      });
    }

    const user = await getUser(userId);

    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

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

