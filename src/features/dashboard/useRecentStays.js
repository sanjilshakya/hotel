import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("last") ? Number(searchParams.get("last")) : 7;
  // current day subtract days selected
  const date = subDays(new Date(), days).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last-${days}`],
    queryFn: () => getStaysAfterDate(date),
  });

  const confirmedStays = stays?.filter(
    (x) => x.status === "checked-in" || x.status === "checked-out"
  );

  return { stays, confirmedStays, isLoading };
}
