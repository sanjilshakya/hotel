/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { isChekingOut, mutate: checkout } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isChekingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
