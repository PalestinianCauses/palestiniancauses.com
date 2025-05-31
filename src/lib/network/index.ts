// REVIEWED - 02

import { httpStatusesMessages, messages } from "../messages";
import { ResponseSafeExecute, SafeExecuteConfig } from "../types";
import { SafeExecuteError } from "../types/guards";

// Actions
export const actionSafeExecute = async function actionSafeExecute<
  D,
  E = string,
>(
  action: Promise<D>,
  errorDefault: string,
  isErrorFromTypeE?: (error: unknown) => error is E,
): Promise<ResponseSafeExecute<D, E | string>> {
  try {
    const data = await action;
    return { data, error: null };
  } catch (error) {
    console.error(error);

    if (isErrorFromTypeE && isErrorFromTypeE(error))
      return { data: null, error };

    if (error instanceof SafeExecuteError)
      return { data: null, error: error.message };

    // Add Sentry Log Here
    return { data: null, error: errorDefault };
  }
};

type HTTPSafeExecute<D, E> = {
  http: Promise<Response>;
  errorDefault: string;
  isData?: (data: unknown) => data is D;
  isError?: (error: unknown) => error is E;
  config?: SafeExecuteConfig;
};

// HTTPs
export const httpSafeExecute = async function httpSafeExecute<D, E = string>({
  http,
  errorDefault,
  isData,
  isError,
  config,
}: HTTPSafeExecute<D, E>): Promise<
  ResponseSafeExecute<D, E | string | number>
> {
  try {
    let response: Response | null = null;

    response = await http;

    if (!response.ok) {
      const result: ResponseSafeExecute<D, E | string | number> = {
        data: null,
        error: errorDefault,
      };

      // Skip HTTP response error and return it as a status code number to use it some where else
      if (
        config &&
        config.skip &&
        config.skip.errors &&
        config.skip.errors.includes(response.status)
      ) {
        result.error = response.status;
        return result;
      }

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      )
        result.error = httpStatusesMessages.http[response.status];

      return result;
    }

    const data = await response.json();

    if (!isData || !isData(data))
      return { data: null, error: messages.http.typeError };

    return { data, error: null };
  } catch (error) {
    if (isError && isError(error)) return { data: null, error };
    return { data: null, error: errorDefault };
  }
};
