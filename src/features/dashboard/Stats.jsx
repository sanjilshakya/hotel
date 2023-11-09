/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, days, cabinsCount }) {
  const noOfBookings = bookings?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays?.length;
  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (days * cabinsCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={noOfBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
