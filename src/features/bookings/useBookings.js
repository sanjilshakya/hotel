import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";
  const [sortByField, sortDirection] = sortBy.split("-");
  const sort = { sortByField, sortDirection };

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });
  return { bookings, error, isLoading };
}
