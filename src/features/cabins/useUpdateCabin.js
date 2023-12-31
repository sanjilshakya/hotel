import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateMutate } = useMutation({
    mutationFn: ({ updatedCabin, editId }) =>
      createOrUpdateCabin(editId, updatedCabin),
    onSuccess: () => {
      toast.success("Cabin successfully updated.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateMutate };
}
