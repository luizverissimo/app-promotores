import * as Yup from "yup";
import {
  serverConnetionError,
  unhandedErrorAlert,
  serverConnetionMessage,
} from "../utils/SystemMessages";

const validationFunctions = {
  errorsResponseDefault(error) {
    console.log(error);
    const validationErrors = {};

    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
    } else if (!!error.response?.data?.errorMessage) {
      const { errorMessage } = error.response.data;
      validationErrors[errorMessage.validation.keys[0]] = errorMessage.message;
    } else {
      if (error.message === "Network Error") {
        serverConnetionError();
      } else if (error?.response?.status === 405) {
        serverConnetionMessage(error.response.data.error);
      } else {
        unhandedErrorAlert();
      }
    }
    return validationErrors;
  },
};

export default validationFunctions;
