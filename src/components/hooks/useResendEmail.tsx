import { useResendConfirmationMutation } from "../../setup/query/apiSlice";

export const useResendEmail = () => {
  const [resendConfirmation, isLoading] = useResendConfirmationMutation();
  const loading = isLoading;
  return {
    loading,
    resendConfirmation,
  };
};
