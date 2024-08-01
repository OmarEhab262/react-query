import React, { Fragment } from "react";
import axiosUser from "../config/axiosUser";
import { useInfiniteQuery } from "react-query";

const LoadMore = () => {
  const fetchUsers = ({ pageParam = 1 }) => {
    return axiosUser.get(`/users?_page=${pageParam}&_limit=2`);
  };

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("LoadMore", fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      // Check if there are more pages available
      if (lastPage.data.length > 0) {
        return pages.length + 1; // Fetch next page if there are users
      }
      return undefined; // No more pages
    },
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        {data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data.map((user) => (
              <div key={user.id}>
                <h1>{user.name}</h1>
                <h1>{user.username}</h1>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
      {isFetching && !isFetchingNextPage ? <div>Fetching...</div> : null}
    </>
  );
};

export default LoadMore;
