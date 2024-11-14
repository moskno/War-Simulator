import { useState } from "react";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export const useErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      setErrorMessage(
        error.response.data.message || "An unexpected error occurred"
      );
    } else if (error.request) {
      setErrorMessage("Network error. Please try again later.");
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const clearError = () => setErrorMessage(null);

  return { errorMessage, handleError, clearError };
};
