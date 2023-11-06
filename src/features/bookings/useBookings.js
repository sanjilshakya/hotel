import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";
  const page = !searchParams?.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const [sortByField, sortDirection] = sortBy.split("-");
  const sort = { sortByField, sortDirection };

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const {
    data: { bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });
  return { bookings, count, error, isLoading };
}
