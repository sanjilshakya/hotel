import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoggingOut}>
      <HiArrowRightOnRectangle /> Logout
    </ButtonIcon>
  );
}

export default Logout;
