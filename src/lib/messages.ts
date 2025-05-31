// REVIEWED - 19

export const messages = {
  http: {
    skip: "Requested request was skipped.",
    unAuthorized: "Could not authorize request.",
    unAuthenticated: "Could not authenticate request. Please sign in first.",
    notFound:
      "Could not find requested resource. Please try a different resource.",
    serverError:
      "An error occurred while sending request. Please try again later.",
    typeError:
      "An error occurred while parsing request's response to its correct type. Please try again later.",
  },
  actions: {
    notificationSubscription: {
      success: "Successfully subscribed to receive notifications.",
      successDelete: "Successfully unsubscribed from receiving notifications.",
      successNotify: "Successfully notified subscribers.",
      duplication: "You are already subscribed to receive notifications.",
      notFound:
        "Could not find notification subscription. Please try again later.",
      serverError:
        "An error occurred while creating notification subscription. Please try again later.",
      serverErrorGet:
        "An error occurred while getting notification subscription. Please try again later.",
      serverErrorDelete:
        "An error occurred while deleting notification subscription. Please try again later.",
      serverErrorNotify:
        "An error occurred while notifying subscribers. Please try again later.",
    },
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
        validation: "Fields entered are not valid.",
        password: "Password entered is not as resilient as Gaza's people.",
        signIn:
          "Signed up successfully, but could not sign you in automatically. Please try signing in.",
        serverError:
          "An error occurred while signing up. Please try again later.",
      },
      signOut: {
        pending: "Signing out...",
        success: "Signed out successfully.",
        serverError:
          "An error occurred while signing out. Please try again later.",
      },
      tokenRefresh: {
        pending: "Refreshing your session...",
        success: "Session refreshed successfully.",
        expired: "Your session has ended. Please sign in to continue.",
        notFound: "Could not find your session's token. Please sign in again.",
        serverError:
          "An error occurred while refreshing your session. Please sign in again.",
        decodeError:
          "An error occurred while decoding your session's token. Please sign in again.",
        expirationTypeError:
          "An error occurred while checking your session's expiration time. Please sign in again.",
      },
    },
    product: {
      file: {
        unAuthenticated:
          "You are not authenticated to access product's files. Please sign in first.",
        notFound: "Could not find product's files. Please try again later.",
      },
      external: {
        unAuthenticated:
          "You are not authenticated to access product's external links. Please sign in first.",
        notFound:
          "Could not find product's external links. Please try again later.",
        serverError:
          "An error occurred while getting product's external links. Please try again later.",
      },
      notFound: "Could not find product. Please try again later.",
      serverError:
        "An error occurred while getting product. Please try again later.",
    },
    order: {
      serverError:
        "An error occurred while creating order. Please try again later.",
    },
    collection: {
      serverError:
        "An error occurred while getting collection. Please try again later.",
    },
    diaryEntry: {
      pending: "Sharing your diary...",
      success:
        'Thank you for sharing your authentic testimony with PalestinianCauses. Your diary is received and valued. We\'ll review it carefully before adding it to "The Truth Museum"—check back soon!',
      successPCAuthor: "Diary entry shared successfully.",
      unique: (title: string) =>
        `"${title}" - A powerful title! Another resilient author used this exact one for "The Truth Museum." To ensure your unique testimony stands out, could you please provide an alternative title? Thank you!`,
      unAuthorized: "You are not authorized to share a diary.",
      unAuthenticated:
        "You are not authenticated to share a diary. Please sign in first.",
      notFound: "Could not find diary entry. Please try again later.",
      serverErrorShare:
        "An error occurred while sharing your diary. Please try again later.",
      serverErrorGet:
        "An error occurred while getting diary entry. Please try again later.",
      author: {
        serverError:
          "An error occurred while getting author. Please try again later.",
      },
    },
  },
  forms: {
    required: (field: string) => `Please enter your ${field}.`,
    valid: (field: string) => `Please enter a valid ${field}.`,
    maxLength: (field: string, length: number) =>
      `Please enter a ${field} with less than ${length} characters.`,
    date: (min: string, max: string) =>
      `Please enter a valid date between ${min} and ${max}.`,
    diaryEntry: {
      content:
        "Please write a diary that is long enough to be in our museum (1500 characters minimum).",
    },
    rooms: {
      valid: {
        year: (when: "before" | "after", year: number) =>
          `Please enter a valid year ${when} ${year}.`,
      },
    },
  },
};

export const httpStatusesMessages = {
  http: {
    401: messages.http.unAuthorized,
    403: messages.http.unAuthenticated,
    404: messages.http.notFound,
    500: messages.http.serverError,
  },
  signIn: {
    401: (email: string) => messages.actions.auth.signIn.unAuthenticated(email),
    404: (email: string) => messages.actions.auth.signIn.notFound(email),
    500: messages.actions.auth.signIn.serverError,
  },
  signUp: {
    409: (email: string) => messages.actions.auth.signUp.duplication(email),
    417: messages.actions.auth.signUp.validation,
    500: messages.actions.auth.signUp.serverError,
  },
  signOut: {
    500: messages.actions.auth.signOut.serverError,
  },
  user: {
    403: messages.actions.user.unAuthenticated,
  },
  diaryEntry: {
    401: messages.actions.diaryEntry.unAuthorized,
    403: messages.actions.diaryEntry.unAuthenticated,
    404: messages.actions.diaryEntry.notFound,
    500: messages.actions.diaryEntry.serverErrorShare,
  },
};
