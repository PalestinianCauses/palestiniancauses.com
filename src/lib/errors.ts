// REVIEWED - 07

export const messages = {
  http: {
    unAuthorized: "Could not authorize request.",
    unAuthenticated: "Could not authenticate request. Please sign in first.",
    notFound: "Could not find requested resource. Please try another resource.",
    serverError:
      "An error occurred while sending request. Please try again later.",
  },
  actions: {
    user: {
      unAuthorized: "You are not authorized to perform this action.",
      unAuthenticated:
        "You are not authenticated to perform this action. Please sign in first.",
      notFound: "Could not find user. Please try again later.",
      serverError:
        "An error occurred while getting authenticated user. Please try again later.",
      delete: {
        success: "User deleted successfully.",
        serverError:
          "An error occurred while deleting user. Please try again later.",
      },
    },
    auth: {
      signIn: {
        pending: "Signing in...",
        success: "Signed in successfully.",
        unAuthenticated: (email: string) =>
          `Password entered for user with ${email}, email is not correct.`,
        notFound: (email: string) =>
          `User with ${email} is not yet a family member. May be sign up first?`,
        serverError:
          "An error occurred while signing in. Please try again later.",
      },
      signUp: {
        pending: "Signing up...",
        success: "Signed up successfully.",
        duplication: (email: string) =>
          `User with ${email}, email is already a family member. May be sign in instead?`,
        validation: "Password entered is not as resilient as Gaza's people.",
        signIn:
          "Signed up successfully, but could not sign you in automatically. Please try signing in.",
        serverError:
          "An error occurred while signing up. Please try again later.",
      },
      signOut: {
        pending: "Signing out...",
        success: "Signed out successfully.",
        timer: (time: string) =>
          `Your session will expire at ${time}. Make the most of your time!`,
        expired: "Your session has ended. Please sign in to continue.",
        serverError:
          "An error occurred while signing out. Please try again later.",
      },
    },
    diaryEntry: {
      pending: "Sharing your diary...",
      success:
        "Thank you for sharing your side of the truth! Your diary has been received and is now part of a growing testimony. While we are reviewing it with care keep an eye on our Instagram updates on when the museum doors swing open!",
      unAuthorized: "You are not authorized to share a diary.",
      unAuthenticated: "You are not authenticated to share a diary.",
      serverError:
        "An error occurred while sharing your diary. Please try again later.",
      unique: (title: string) =>
        `"${title}" - what a poignant title! It appears another resilient author has already used this exact title for their story. To ensure your unique testimony shines brightly, could you please choose a different title?`,
    },
  },
  forms: {
    required: (field: string) => `Please enter your ${field}`,
    valid: (field: string) => `Please enter a valid ${field}`,
    date: (min: string, max: string) =>
      `Please enter a valid date between ${min} and ${max}.`,
    content: "Please write a diary that is long enough to be in our museum.",
  },
};

export const httpStatusesMessages = {
  401: {
    http: messages.http.unAuthorized,
    signIn: (email: string) =>
      messages.actions.auth.signIn.unAuthenticated(email),
    diaryEntry: messages.actions.diaryEntry.unAuthorized,
  },
  403: {
    http: messages.http.unAuthenticated,
    user: messages.actions.user.unAuthenticated,
    diaryEntry: messages.actions.diaryEntry.unAuthenticated,
  },
  404: {
    http: messages.http.notFound,
    signIn: (email: string) => messages.actions.auth.signIn.notFound(email),
  },
  409: {
    signUp: (email: string) => messages.actions.auth.signUp.duplication(email),
  },
  417: {
    signUp: messages.actions.auth.signUp.validation,
  },
  500: {
    http: messages.http.serverError,
    signIn: messages.actions.auth.signIn.serverError,
    signUp: messages.actions.auth.signUp.serverError,
    signOut: messages.actions.auth.signOut.serverError,
    diaryEntry: messages.actions.diaryEntry.serverError,
  },
};
