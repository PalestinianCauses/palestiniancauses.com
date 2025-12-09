// REVIEWED - 32

export const messages = {
  http: {
    skip: "The requested operation was skipped.",
    unAuthorized: "Authorization failed for this request.",
    unAuthenticated: "Authentication required. Please sign in to continue.",
    notFound:
      "The requested resource could not be found. Please try a different resource.",
    serverError:
      "A server error occurred while processing your request. Please try again later.",
    typeError:
      "An error occurred while processing response data. Please try again later.",
  },
  actions: {
    blob: {
      serverError: "Failed to retrieve blobs. Please try again later.",
    },
    notification: {
      successRead: "Successfully marked notification as read.",
      successEveryRead: "Successfully marked every notification as read.",
      notFound: "Notification not found. Please try again later.",
      serverError: "Failed to retrieve notification. Please try again later.",
    },
    notificationSubscription: {
      success: "Successfully subscribed to notifications.",
      successDelete: "Successfully unsubscribed from notifications.",
      successNotify: "Successfully notified all subscribers.",
      duplication: "You are already subscribed to notifications.",
      notFound: "Notification subscription not found. Please try again later.",
      serverError:
        "Failed to create notification subscription. Please try again later.",
      serverErrorGet:
        "Failed to retrieve notification subscription. Please try again later.",
      serverErrorDelete:
        "Failed to delete notification subscription. Please try again later.",
      serverErrorNotify:
        "Failed to notify subscribers. Please try again later.",
    },
    user: {
      update: {
        success: "Successfully updated user account.",
        successPassword: "Successfully updated user password.",
        inCorrectCurrentPassword:
          "Incorrect current password has been entered. Please try again.",
      },
      unAuthorized: "You are not authorized to perform this action.",
      unAuthenticated:
        "Authentication required. Please sign in to perform this action.",
      notFound: "User not found. Please try again later.",
      serverError:
        "Failed to retrieve authenticated user. Please try again later.",
      serverErrorUpdate:
        "Failed to update user account. Please try again later.",
      delete: {
        success: "User account deleted successfully.",
        serverError: "Failed to delete user account. Please try again later.",
      },
      roles: {
        serverError: "Failed to retrieve user roles. Please try again later.",
      },
    },
    auth: {
      signIn: {
        pending: "Signing in...",
        success: "Successfully signed in.",
        unAuthenticated: (email: string) =>
          `Incorrect password for user with email ${email}.`,
        notFound: (email: string) =>
          `User with email ${email} is not yet a family member. Would you like to sign up?`,
        serverError: "Failed to sign in. Please try again later.",
      },
      signUp: {
        pending: "Signing up...",
        success: "Successfully signed up.",
        duplication: (email: string) =>
          `User with email ${email} is already a family member. Would you like to sign in instead?`,
        validation: "Please check that all fields are valid.",
        password: "Password must be as resilient as Gaza's people.",
        signIn:
          "Sign up successful, but automatic sign-in failed. Please sign in manually.",
        serverError: "Failed to sign up. Please try again later.",
      },
      signOut: {
        pending: "Signing out...",
        success: "Successfully signed out.",
        serverError: "Failed to sign out. Please try again later.",
      },
      tokenRefresh: {
        pending: "Refreshing your session...",
        success: "Session refreshed successfully.",
        expired: "Your session has expired. Please sign in to continue.",
        notFound: "Session token not found. Please sign in again.",
        serverError: "Failed to refresh session. Please sign in again.",
        decodeError: "Failed to decode session token. Please sign in again.",
        expirationTypeError:
          "Failed to verify session expiration. Please sign in again.",
      },
      forgotPassword: {
        pending: "Sending password reset email...",
        success:
          "In case an account with this email exists, a password reset link has been sent. Please check your inbox or spam/junk folder.",
        serverError:
          "Failed to send password reset email. Please try again later.",
      },
      resetPassword: {
        pending: "Resetting password...",
        success:
          "Password reset successfully. You can now sign in with your new password.",
        tokenNotFound:
          "Password reset token not found. Please request a new one.",
        tokenExpired:
          "Password reset token has expired. Please request a new one.",
        serverError: "Failed to reset password. Please try again later.",
      },
      verificationEmail: {
        success: "Successfully verified email!",
        successSent: "Successfully sent verification email.",
        tokenNotFound:
          "Verification token not found. Please request a new one.",
        tokenExpired:
          "Verification token has expired. Please request a new one.",
        tokenUsed:
          "Verification token has already been used before. Please request a new one.",
        accountVerified: "Account is already verified.",
        serverError: "Failed to verify email. Please try again later.",
        serverErrorCreate:
          "Failed to create verification token. Please try again later.",
        serverErrorPreviousTokenFind:
          "Failed to retrieve previous verification token. Please try again later.",
        serverErrorPreviousTokenDelete:
          "Failed to delete previous verification token. Please try again later.",
        serverErrorSend:
          "Failed to send verification token email. Please try again later.",
        serverErrorDelete:
          "Failed to delete verification token. Please try again later.",
      },
      changeEmail: {
        success:
          "Verification token email has been sent to your new email address. Please check your inbox or spam/junk folder.",
        successCancelingPendingEmail:
          "Successfully cancelled pending email change",
        inUseEmail:
          "Email address is already in use. Please try again with a different email address.",
        serverError:
          "Failed to process email change request. Please try again later.",
        serverErrorCancelingPendingEmail:
          "Failed to cancel pending email change. Please try again later.",
        noPendingEmail: "Failed to find pending email. Please try again later.",
      },
    },
    media: {
      upload: {
        success: "Successfully uploaded media.",
        successRemove: "Successfully removed media.",
        noFile: "No file was provided. Please try again.",
        serverError: "Failed to upload media. Please try again later.",
        serverErrorDelete: "Failed to delete media. Please try again later.",
      },
    },
    role: {
      serverError: "Failed to retrieve roles. Please try again later.",
    },
    product: {
      file: {
        unAuthenticated:
          "Authentication required to access product files. Please sign in.",
        notFound: "Product files not found. Please try again later.",
      },
      external: {
        unAuthenticated:
          "Authentication required to access product links. Please sign in.",
        notFound: "Product links not found. Please try again later.",
        serverError:
          "Failed to retrieve product links. Please try again later.",
      },
      notFound: "Product not found. Please try again later.",
      notAvailableForPurchasing:
        "Product is not available for purchasing. Please try again with a different product.",
      serverError: "Failed to retrieve product. Please try again later.",
    },
    order: {
      pending: "Creating your order...",
      successServiceOrPackage:
        "Successfully created order! Our room owner who owns this room will contact you soon.",
      successDelete: "Successfully deleted order.",
      successCancel: "Successfully cancelled order.",
      notFound: "Order not found. Please try again later.",
      serverError: "Failed to create order. Please try again later.",
      serverErrorGet: "Failed to retrieve order. Please try again later.",
      serverErrorUpdate: "Failed to update order. Please try again later.",
      serverErrorDelete: "Failed to delete order. Please try again later.",
      serverErrorCancel: "Failed to cancel order. Please try again later.",
      serverErrorCreateCheckoutSession:
        "Failed to create order checkout session. Please try again later.",
      serverErrorGetCheckoutSession:
        "Failed to retrieve order checkout session. Please try again later.",
      orderNotFound: "Order not found. Please try again later.",
      paymentNotCompleted: "Payment not completed. Please try again later.",
      inCorrectOrderTypeError: "Order type is incorrect. Please try again.",
      noOrderItemsError: "Order items not found. Please try again later.",
    },
    collection: {
      serverError: "Failed to retrieve collection. Please try again later.",
    },
    comment: {
      pendingCreate: "Posting your comment...",
      successCreate: "Comment posted successfully.",
      successDelete: "Comment deleted successfully.",
      createUnAuthenticated:
        "Authentication required to post a comment. Please sign in.",
      deleteUnAuthorized: "You are not authorized to delete this comment.",
      deleteUnAuthenticated:
        "Authentication required to delete a comment. Please sign in.",
      notFound: "Comment not found. Please try again later.",
      serverErrorCreate: "Failed to post comment. Please try again later.",
      serverErrorGet: "Failed to retrieve comment. Please try again later.",
      serverErrorDelete: "Failed to delete comment. Please try again later.",
      replies: {
        successDelete: "Replies deleted successfully.",
        serverErrorCount:
          "Failed to retrieve replies count. Please try again later.",
      },
      votes: {
        success: "Successfully voted on comment.",
        unAuthenticated:
          "Authentication required to vote on a comment. Please sign in.",
        serverError: "Failed to vote on comment. Please try again later.",
      },
    },
    diaryEntry: {
      pending: "Sharing your diary...",
      success:
        'Thank you for sharing your authentic testimony with PalestinianCauses. Your diary has been received and is valued. We will review it carefully before adding it to "The Truth Museum"—please check back soon!',
      successPCAuthor: "Diary entry shared successfully.",
      unique: (title: string) =>
        `"${title}" - A powerful title! Another resilient author has used this exact title for "The Truth Museum." To ensure your unique testimony stands out, please provide an alternative title. Thank you!`,
      unAuthorized: "You are not authorized to share a diary.",
      unAuthenticated:
        "Authentication required to share a diary. Please sign in.",
      notFound: "Diary entry not found. Please try again later.",
      serverErrorShare: "Failed to share diary. Please try again later.",
      serverErrorGet: "Failed to retrieve diary entry. Please try again later.",
      author: {
        serverError:
          "Failed to retrieve author information. Please try again later.",
      },
      delete: {
        success: "Successfully deleted diary entry.",
        serverError: "Failed to delete diary entry. Please try again later.",
      },
    },
    room: {
      serverError: "Failed to retrieve room. Please try again later.",
      links: {
        serverError: "Failed to retrieve room links. Please try again later.",
      },
    },
    stripe: {
      webhook: {
        missingStripeSignature: "Signature not found. Please try again later.",
        verifyStripeSignature: "Failed to verify signature. Please try again.",
        missingIDsData: "Required IDs data not found. Please try again later.",
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
      success: "Address copied to clipboard.",
      error: "Failed to copy address to clipboard.",
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
