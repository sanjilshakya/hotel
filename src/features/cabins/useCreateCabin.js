import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createMutate } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    // mutationFn: createCabin, /*its the same thing /*
    onSuccess: () => {
      toast.success("New Cabin successfully added.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createMutate };
}
