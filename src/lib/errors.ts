// REVIEWED - 03

export const messages = {
  actions: {
    auth: {
      signIn: {
        pending: "Signing in...",
        success: "Signed in successfully.",
        unAuthorized(email: string) {
          return [
            "Password entered for user with",
            email,
            "email is not correct.",
          ].join(" ");
        },
        notFound(email: string) {
          return [
            "User with",
            email,
            "is not yet a family member.",
            "May be sign up first?",
          ].join(" ");
        },
        serverError() {
          return [
            "An error occurred while signing in.",
            "Please try again later.",
          ].join(" ");
        },
      },
      signUp: {
        pending: "Signing up...",
        success: "Signed up successfully.",
        duplication(email: string) {
          return [
            "User with",
            email,
            "email is already a family member.",
            "May be sign in instead?",
          ].join(" ");
        },
        validationError() {
          return [
            "Password entered is not as resilient as Gaza's people.",
          ].join(" ");
        },
        serverError() {
          return [
            "An error occurred while signing up.",
            "Please try again later.",
          ].join(" ");
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
  409: {
    signUp(email: string) {
      return messages.actions.auth.signUp.duplication(email);
    },
  },
  417: {
    signUp: messages.actions.auth.signUp.validationError(),
  },
  500: {
    signIn: messages.actions.auth.signIn.serverError(),
    signUp: messages.actions.auth.signUp.serverError(),
  },
};
