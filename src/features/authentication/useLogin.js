import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as userLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => userLogin({ email, password }),
    onSuccess: (data) => {
      toast.success("Login successful.");
      // just optional so that when user is redirect to dashboard, no need to fetch current user from useUser()
      queryClient.setQueryData(["user"], () => data.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return {
    login,
    isLoggingIn,
  };
}
