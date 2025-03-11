import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/PageTitle";
import useClasses from "../../hooks/useClasses";
import ClassTrainers from "./ClassTrainers";
import Loading from "../Others/Loading";

const Classes = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6; // 6 classes per page

  const {
    data: classes,
    total,
    isLoading,
  } = useClasses(search, page, limit);

  const totalPages = Math.ceil(total / limit); // Calculate total pages

  return (
    <div className="container mx-auto py-5">
        {isLoading && <Loading/>}
      {!isLoading && (
        <>
          <Helmet>
            <title>FitStat | Classes</title>
          </Helmet>
          <PageTitle title="Classes" subTitle="Checkout all our classes now!" />

          {/* Search Bar */}
          <div className="mb-6 text-center">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to first page when searching
              }}
              placeholder="Search classes..."
              className="p-2 border rounded-md w-1/2"
            />
          </div>

          {/* Classes List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classes?.map((each) => (
              <div
                key={each._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
              >
                <div className="aspect-[4/3] w-full">
                  <img
                    src={each.image}
                    alt={each.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    {each.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {each.details}
                  </p>
                </div>
                <div className="border-b-2 mt-3 mb-2"></div>
                <p className="px-3">Avaialble Trainers</p>
                <div className="px-3 py-1 gap-2 flex items-center">
                  <ClassTrainers name={each.name} classId={each._id} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center space-x-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;
