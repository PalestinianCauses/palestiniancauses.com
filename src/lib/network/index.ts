// REVIEWED

import { httpStatusesMessages, messages } from "../messages";

// Actions
export const actionSafeExecute = async function actionSafeExecute<
  D,
  E = string,
>(
  action: Promise<D>,
  errorDefault: string,
  isErrorFromTypeE?: (error: unknown) => error is E,
) {
  try {
    const data = await action;
    return { data, error: null };
  } catch (error) {
    if (isErrorFromTypeE && isErrorFromTypeE(error))
      return { data: null, error };

    // Add Sentry Log Here
    return { data: null, error: errorDefault };
  }
};

// HTTPs
export const httpSafeExecute = async function httpSafeExecute<D, E = string>(
  http: Promise<Response>,
  errorDefault: string,
  isDataFromTypeD?: (data: unknown) => data is D,
  isErrorFromTypeE?: (error: unknown) => error is E,
) {
  try {
    const response = await http;

    if (!response.ok) {
      const result = { data: null, error: errorDefault };

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      )
        result.error = httpStatusesMessages[response.status].http;

      return result;
    }

    const data = await response.json();

    if (!isDataFromTypeD || !isDataFromTypeD(data))
      return { data: null, error: messages.http.typeError };

    return { data, error: null };
  } catch (error) {
    if (isErrorFromTypeE && isErrorFromTypeE(error))
      return { data: null, error };
    return { data: null, error: errorDefault };
  }
};
