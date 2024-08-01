import React, { useState } from "react";
import Pagination from "./ui/Pagination";
import { useUserData } from "../hooks/userData";
import toast from "react-hot-toast";

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState(5);
  const [page, setPage] = useState(1);

  const onSuccess = () => {
    toast.success("Successfully fetched users!");
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  // Call useUserData with onError, onSuccess, and handleSuccess
  const { data = [] } = useUserData(onError, onSuccess);

  const NextPage = () => {
    setCurrentPage((prev) => prev + 5);
    setNextPage((prev) => prev + 5);
    setPage((prev) => prev + 1);
  };

  const PreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 5, 0));
    setNextPage((prev) => Math.max(prev - 5, 5));
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <h1>PaginationPage</h1>

      {data &&
        data.slice(currentPage, nextPage).map((user, ind) => (
          <div
            key={ind}
            className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
            role="alert"
          >
            <span className="font-medium mr-2">{ind + currentPage + 1} - </span>

            <div className="flex gap-5">
              <div>
                <span className="font-medium">Name: {user.name}</span>
              </div>
              <div>
                <span className="font-medium">User Name: {user.username}</span>
              </div>
            </div>
          </div>
        ))}
      <Pagination
        page={page}
        NextPage={NextPage}
        PreviousPage={PreviousPage}
        entries={data}
      />
    </>
  );
};

export default PaginationPage;
