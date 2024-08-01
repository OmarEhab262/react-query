import React from "react";
import { useParams } from "react-router-dom";
import { useNameData } from "../hooks/useNameData";
import Spinner from "./ui/Spinner";

const Details = () => {
  const { nameId } = useParams();
  const { data, isLoading, error, isError } = useNameData(nameId);
  return (
    <>
      <h1>Details</h1>
      <div>{isLoading && <Spinner />}</div>
      <div>{isError && <div>{error.message}</div>}</div>
      <div>
        {data && (
          <div className="text-white text-[30px]">
            <h2>
              Name is: <span className="text-red-500">{data.name}</span>{" "}
            </h2>
            <h2>
              User Name is:{" "}
              <span className="text-red-500">{data.username}</span>{" "}
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
