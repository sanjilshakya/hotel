import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (!cabins?.length) return <Empty resourceName="Cabins" />;

  const filterValue = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy") || "createdAt-desc";

  const filteredCabins =
    filterValue === "all" || !filterValue
      ? cabins
      : filterValue === "no-discount"
      ? cabins?.filter((cabin) => cabin.discount === 0)
      : cabins?.filter((cabin) => cabin.discount > 0);

  const [sortByField, sortDirection] = sortBy.split("-");

  const sortedCabin = filteredCabins?.sort((a, b) =>
    sortDirection === "asc"
      ? a[sortByField] - b[sortByField]
      : b[sortByField] - a[sortByField]
  );

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
