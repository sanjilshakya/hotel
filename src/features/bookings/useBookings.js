import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  //Query
  const {
    data: { bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  //PRE-FETCH -- OPTIONAL
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  //PRE-FETCH -- OPTIONAL

  return { bookings, count, error, isLoading };
}
