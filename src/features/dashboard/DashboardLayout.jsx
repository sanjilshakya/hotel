/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useTodayActivity } from "./useTodayAcivity";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoading: isLoading1, days } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();
  const { activities, isLoading: isLoading3 } = useTodayActivity();
  const { cabins, isLoading: isLoading4 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Spinner />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats
          bookings={recentBookings}
          confirmedStays={confirmedStays}
          days={days}
          cabinsCount={cabins.length}
        />
        <TodayActivity activities={activities} />
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart bookings={recentBookings} days={days} />
      </StyledDashboardLayout>
    </>
  );
}

export default DashboardLayout;
