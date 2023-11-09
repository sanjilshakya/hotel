import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("last") ? Number(searchParams.get("last")) : 7;
  // current day subtract days selected
  const date = subDays(new Date(), days).toISOString();

  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["recentBookings", `last-${days}`],
    queryFn: () => getBookingsAfterDate(date),
  });

  return { recentBookings, isLoading, days };
}
