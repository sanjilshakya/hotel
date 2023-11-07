import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isChekingIn, mutate } = useMutation({
    mutationFn: ({ bookingId, updatedBooking }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...updatedBooking,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: [`booking-${data.id}`] });
      navigate("/");
    },
    onError: (err) => {
      toast.error("There was a problem checking in the guest.");
    },
  });

  return { isChekingIn, mutate };
}
