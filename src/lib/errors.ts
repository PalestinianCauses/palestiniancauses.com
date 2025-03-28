// REVIEWED - 01

export const messages = {
  actions: {
    auth: {
      signIn: {
        notFound(email: string) {
          return ["User with", email, "email does not exist."].join(" ");
        },
        unAuthorized(email: string) {
          return [
            "Password entered for user with",
            email,
            "email is not correct.",
          ].join(" ");
        },
        serverError() {
          return ["An error occurred while signing in."].join(" ");
        },
      },
    },
  },
  forms: {
    required(field: string) {
      return ["Please enter your", field].join(" ");
    },
    valid(field: string) {
      return ["Please enter a valid", field].join(" ");
    },
  },
};

export const httpStatusesMessages = {
  401: {
    signIn(email: string) {
      return messages.actions.auth.signIn.unAuthorized(email);
    },
  },
  404: {
    signIn(email: string) {
      return messages.actions.auth.signIn.notFound(email);
    },
  },
  500: {
    signIn: messages.actions.auth.signIn.serverError(),
  },
};
