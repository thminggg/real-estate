import { useQuery } from "@apollo/client";
import { Property } from "@thminggg/db";
import { useSearchParams } from "react-router-dom";
import DetailSearch from "../../components/DetailSearch/DetailSearch";
import Error from "../../components/Error/Error";
import ListingCard from "../../components/ListingCard/ListingCard";
import Loader from "../../components/Loader/Loader";
import PageBar from "../../components/PageBar/PageBar";
import { GET_PROPERTIES } from "../../graphql/queries/getProperties";
import { clamp } from "../../utils/utils";

type QueryResult = {
  properties: {
    data: Property[];
    count: number;
  };
};

const PAGE_SIZE = 20;
const PAGE_SIZE_MAX = 50;
const PAGE = 1;
const pageSizeClamp = clamp(PAGE_SIZE, PAGE_SIZE_MAX);

export default function Listing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = pageSizeClamp(
    parseInt(searchParams.get("size") || `${PAGE_SIZE}`, 10)
  );
  const page = parseInt(searchParams.get("page") || `${PAGE}`, 10);

  const {
    loading,
    error,
    data: queryResult,
  } = useQuery(GET_PROPERTIES, {
    variables: {
      pageSize: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  const {
    properties: { data, count },
  }: QueryResult = queryResult;

  // {offset} exceeds the records by absurd page query
  // Set the page back to "1"
  if (count !== 0 && data.length === 0) {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="px-6 md:px-36 lg:px-72">
      <DetailSearch />
      <div className="mt-6 text-xs text-center">{count} Results</div>
      <PageBar currentPage={page} totalPages={totalPages} />
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {data.map((property, index) => (
          <ListingCard
            key={index}
            property={property}
            image={`condos/${
              (index % Number(process.env.REACT_APP_CONDOS_IMG)) + 1
            }.jpg`}
          />
        ))}
      </div>
      <PageBar className="mt-3" currentPage={page} totalPages={totalPages} />
    </div>
  );
}
