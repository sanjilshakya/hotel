import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUp({ email, password, fullName }),
    onSuccess: (user) => {
      toast.success(
        "Account successfully created. Please verify the new account form the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createUser, isCreating };
}
