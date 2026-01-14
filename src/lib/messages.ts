// REVIEWED - 39

export const messages = {
  http: {
    skip: "The requested operation was skipped.",
    bad: "We couldn't process your request. Please check your input and try again.",
    unAuthorized: "You don't have permission to access this resource.",
    unAuthenticated: "Please sign in to continue.",
    notFound:
      "We couldn't find what you're looking for. Please check your request and try again.",
    serverError:
      "Something went wrong on our end. Please try again in a moment.",
    typeError:
      "We encountered an issue processing your data. Please try again.",
  },
  actions: {
    blob: {
      serverError:
        "We couldn't retrieve the requested files. Please try again.",
    },
    notification: {
      successRead: "Notification marked as read.",
      successEveryRead: "All notifications marked as read.",
      notFound:
        "We couldn't find this notification. Please refresh and try again.",
      serverError: "We couldn't retrieve your notification. Please try again.",
      serverErrorRead:
        "We couldn't mark this notification as read. Please try again.",
    },
    notificationSubscription: {
      success:
        "You're now subscribed to notifications. We'll keep you updated!",
      successDelete: "You've been unsubscribed from notifications.",
      successNotify: "All subscribers have been notified successfully.",
      duplication: "You're already subscribed to notifications.",
      notFound: "We couldn't find your subscription. Please try again.",
      serverError:
        "We couldn't set up your notification subscription. Please try again.",
      serverErrorGet:
        "We couldn't retrieve your notification subscription. Please try again.",
      serverErrorDelete:
        "We couldn't remove your notification subscription. Please try again.",
      serverErrorNotify:
        "We couldn't send notifications to subscribers. Please try again.",
    },
    user: {
      update: {
        success: "Your account has been updated successfully.",
        successPassword: "Your password has been updated successfully.",
        inCorrectCurrentPassword:
          "The current password you entered is in-correct. Please try again.",
      },
      unAuthorized: "You don't have permission to perform this action.",
      unAuthenticated: "Please sign in to perform this action.",
      notFound: "We couldn't find this user account. Please try again.",
      serverError:
        "We couldn't retrieve your account information. Please try again.",
      serverErrorUpdate: "We couldn't update your account. Please try again.",
      delete: {
        success:
          "Your account has been deleted successfully. We're sorry to see you go.",
        serverError: "We couldn't delete your account. Please try again.",
      },
      roles: {
        serverError:
          "We couldn't retrieve your account roles. Please try again.",
      },
    },
    auth: {
      signIn: {
        pending: "Signing you in...",
        success: "Welcome back! You've been signed in successfully.",
        unAuthenticated: (email: string) =>
          `The password for ${email} is in-correct. Please try again.`,
        notFound: (email: string) =>
          `We couldn't find an account with ${email}. Would you like to sign up instead?`,
        serverError: "We couldn't sign you in right now. Please try again.",
      },
      signUp: {
        pending: "Creating your account...",
        success:
          "Welcome to the family! Your account has been created successfully.",
        duplication: (email: string) =>
          `An account with ${email} already exists. Would you like to sign in instead?`,
        validation: "Please check that all fields are filled correctly.",
        password: "Your password must be as resilient as Gaza's people.",
        signIn:
          "Your account was created, but we couldn't sign you in automatically. Please sign in manually.",
        serverError:
          "We couldn't create your account right now. Please try again.",
      },
      signOut: {
        pending: "Signing you out...",
        success: "You've been signed out successfully. See you soon!",
        serverError: "We couldn't sign you out right now. Please try again.",
      },
      tokenRefresh: {
        pending: "Refreshing your session...",
        success: "Your session has been refreshed.",
        expired: "Your session has expired. Please sign in again to continue.",
        notFound: "We couldn't find your session. Please sign in again.",
        serverError: "We couldn't refresh your session. Please sign in again.",
        decodeError: "We couldn't verify your session. Please sign in again.",
        expirationTypeError:
          "We couldn't verify your session expiration. Please sign in again.",
      },
      forgotPassword: {
        pending: "Sending password reset instructions...",
        success:
          "If an account with this email exists, we've sent password reset instructions. Please check your inbox and spam folder.",
        notVerified:
          "Please verify your email address before resetting your password.",
        serverError:
          "We couldn't send the password reset email right now. Please try again.",
      },
      resetPassword: {
        pending: "Resetting your password...",
        success:
          "Your password has been reset successfully. You can now sign in with your new password.",
        tokenNotFound:
          "This password reset link is invalid. Please request a new one.",
        tokenExpired:
          "This password reset link has expired. Please request a new one.",
        serverError:
          "We couldn't reset your password right now. Please try again.",
      },
      verificationEmail: {
        success: "Your email has been verified successfully!",
        successSent:
          "We've sent a verification email. Please check your inbox.",
        tokenNotFound:
          "This verification link is invalid. Please request a new one.",
        tokenExpired:
          "This verification link has expired. Please request a new one.",
        tokenUsed:
          "This verification link has already been used. Please request a new one.",
        accountVerified: "Your account is already verified.",
        serverError:
          "We couldn't verify your email right now. Please try again.",
        serverErrorCreate:
          "We couldn't create a verification link. Please try again.",
        serverErrorPreviousTokenFind:
          "We couldn't retrieve your previous verification link. Please try again.",
        serverErrorPreviousTokenDelete:
          "We couldn't remove your previous verification link. Please try again.",
        serverErrorSend:
          "We couldn't send the verification email. Please try again.",
        serverErrorDelete:
          "We couldn't process your verification request. Please try again.",
      },
      changeEmail: {
        success:
          "We've sent a verification email to your new address. Please check your inbox and spam folder.",
        successCancelingPendingEmail:
          "Your pending email change has been cancelled successfully.",
        inUseEmail:
          "This email address is already in use. Please try a different email address.",
        serverError:
          "We couldn't process your email change request. Please try again.",
        serverErrorCancelingPendingEmail:
          "We couldn't cancel your pending email change. Please try again.",
        noPendingEmail:
          "We couldn't find a pending email change. Please try again.",
      },
    },
    media: {
      upload: {
        success: "Your file has been uploaded successfully.",
        successRemove: "Your file has been removed successfully.",
        noFile: "No file was provided. Please select a file and try again.",
        serverError:
          "We couldn't upload your file right now. Please try again.",
        serverErrorDelete: "We couldn't delete your file. Please try again.",
        collectionError: "Invalid collection specified. Please try again.",
      },
      canNotDeleteReferenced:
        "This media file can not be deleted because it is being used by other content. Please remove it from all references first.",
    },
    serviceCategory: {
      canNotDeleteReferenced:
        "This service category can not be deleted because it is being used by one or more services. Please re-assign or delete those services first.",
      serverErrorDelete:
        "We couldn't delete this service category. Please try again.",
    },
    role: {
      canNotDeleteReferenced:
        "This role can not be deleted because it is being used by one or more users. Please remove it from all users first.",
      serverError: "We couldn't retrieve your account roles. Please try again.",
    },
    product: {
      file: {
        unAuthenticated: "Please sign in to access product files.",
        notFound: "We couldn't find the product files. Please try again.",
      },
      external: {
        unAuthenticated: "Please sign in to access product links.",
        notFound: "We couldn't find the product links. Please try again.",
        serverError:
          "We couldn't retrieve the product links. Please try again.",
      },
      notFound: "We couldn't find this product. Please try again.",
      notAvailableForPurchasing:
        "This product is currently unavailable for purchase. Please try a different product.",
      serverError: "We couldn't retrieve this product. Please try again.",
    },
    order: {
      pending: "Creating your order...",
      successServiceOrPackage:
        "Your order has been created successfully! The room owner will contact you soon.",
      successDelete: "Your order has been deleted successfully.",
      successCancel: "Your order has been cancelled successfully.",
      notFound: "We couldn't find this order. Please try again.",
      serverError: "We couldn't create your order right now. Please try again.",
      serverErrorGet: "We couldn't retrieve your order. Please try again.",
      serverErrorUpdate: "We couldn't update your order. Please try again.",
      serverErrorDelete: "We couldn't delete your order. Please try again.",
      serverErrorCancel: "We couldn't cancel your order. Please try again.",
      serverErrorCreateCheckoutSession:
        "We couldn't set up your checkout session. Please try again.",
      serverErrorGetCheckoutSession:
        "We couldn't retrieve your checkout session. Please try again.",
      orderNotFound: "We couldn't find this order. Please try again.",
      paymentNotCompleted:
        "Your payment hasn't been completed yet. Please try again.",
      inCorrectOrderTypeError: "This order type is invalid. Please try again.",
      noOrderItemsError:
        "We couldn't find items for this order. Please try again.",
      orderNotAvailableForCheckout: "This order is not available for checkout.",
      checkoutSessionNotAvailable: "Your checkout session is not available.",
    },
    collection: {
      serverError: "We couldn't retrieve this collection. Please try again.",
    },
    comment: {
      pendingCreate: "Posting your comment...",
      successCreate: "Your comment has been posted successfully.",
      successDelete: "Your comment has been deleted successfully.",
      createUnAuthenticated: "Please sign in to post a comment.",
      deleteUnAuthorized: "You don't have permission to delete this comment.",
      deleteUnAuthenticated: "Please sign in to delete a comment.",
      notFound: "We couldn't find this comment. Please try again.",
      serverErrorCreate:
        "We couldn't post your comment right now. Please try again.",
      serverErrorGet: "We couldn't retrieve this comment. Please try again.",
      serverErrorDelete: "We couldn't delete this comment. Please try again.",
      replies: {
        successDelete: "Replies have been deleted successfully.",
        serverErrorCount:
          "We couldn't retrieve the replies count. Please try again.",
      },
      votes: {
        success: "Your vote has been recorded successfully.",
        unAuthenticated: "Please sign in to vote on comments.",
        serverError: "We couldn't record your vote. Please try again.",
      },
    },
    diaryEntry: {
      pending: "Sharing your diary entry...",
      success:
        'Thank you for sharing your authentic testimony with PalestinianCauses. Your diary entry has been received and is deeply valued. We will review it carefully before adding it to "The Truth Museum"—please check back soon!',
      successPCAuthor: "Your diary entry has been shared successfully.",
      unique: (title: string) =>
        `"${title}" is a powerful title! Another resilient author has already used this exact title for "The Truth Museum." To ensure your unique testimony stands out, please provide an alternative title. Thank you!`,
      unAuthorized: "You don't have permission to share a diary entry.",
      unAuthenticated: "Please sign in to share a diary entry.",
      notFound: "We couldn't find this diary entry. Please try again.",
      serverErrorShare:
        "We couldn't share your diary entry right now. Please try again.",
      serverErrorGet:
        "We couldn't retrieve this diary entry. Please try again.",
      author: {
        serverError:
          "We couldn't retrieve the author information. Please try again.",
      },
      delete: {
        success: "Your diary entry has been deleted successfully.",
        serverError: "We couldn't delete your diary entry. Please try again.",
      },
    },
    blogRoom: {
      notFound: "We couldn't find this blog room. Please try again.",
      serverErrorGet: "We couldn't retrieve this blog room. Please try again.",
    },
    blogCategory: {
      notFound: "We couldn't find this blog category. Please try again.",
      serverErrorGet:
        "We couldn't retrieve this blog category. Please try again.",
      canNotDeleteReferenced:
        "This category can not be deleted because it is being used by one or more blog posts. Please remove it from all posts first.",
      serverErrorDelete:
        "We couldn't delete this blog category. Please try again.",
    },
    blogPost: {
      notFound: "We couldn't find this blog post. Please try again.",
      serverErrorGet: "We couldn't retrieve this blog post. Please try again.",
    },
    room: {
      serverError: "We couldn't retrieve this room. Please try again.",
      links: {
        serverError: "We couldn't retrieve the room links. Please try again.",
      },
    },
    roomService: {
      canNotDeleteReferenced:
        "This room service can not be deleted because it is being used by one or more packages. Please remove it from all packages first.",
    },
    stripe: {
      webhook: {
        missingStripeSignature:
          "Payment verification failed. Please try again.",
        verifyStripeSignature:
          "We couldn't verify the payment signature. Please try again.",
        missingIDsData: "Payment information is in-complete. Please try again.",
      },
    },
  },
  forms: {
    required: (field: string) => `Please enter your ${field}.`,
    valid: (field: string) => `Please enter a valid ${field}.`,
    minLength: (field: string, length: number) =>
      `Please enter a ${field} with at least ${length} characters.`,
    maxLength: (field: string, length: number) =>
      `Please enter a ${field} with less than ${length} characters.`,
    date: (min: string, max: string) =>
      `Please enter a valid date between ${min} and ${max}.`,
    diaryEntry: {
      content:
        "Please write a diary entry that meets our museum's requirements (minimum 1500 characters).",
    },
    rooms: {
      valid: {
        year: (when: "before" | "after", year: number) =>
          `Please enter a valid year ${when} ${year}.`,
      },
    },
  },
  crypto: {
    copy: {
      pending: "Copying address to clipboard...",
      success: "Address copied to clipboard successfully.",
      error: "We couldn't copy the address to clipboard. Please try again.",
    },
  },
  code: {
    copy: {
      success: "Code copied to clipboard successfully!",
    },
  },
};

export const httpStatusesMessages = {
  http: {
    400: messages.http.bad,
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
