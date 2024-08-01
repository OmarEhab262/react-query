import { useMutation, useQuery } from "react-query";
import axiosUser from "../config/axiosUser";

const fetchUsers = async () => {
  const response = await axiosUser.get(`/users`);
  return response.data;
};
const addUser = async (user) => {
  return axiosUser.post(`/users`, user);
};
export const useUserData = (onError) => {
  return useQuery(
    // refetch work to get data from server used like function
    "users",
    fetchUsers,
    {
      // staleTime: 10000, // 10 seconds for fetching data from cache and then this 10 seconds  u can go any way without refetching after that refetching will happen
      // cacheTime: 5000, // 5 seconds for saving data in cache and after 5 seconds it will be refetch
      // refetchOnMount: "always", // u can go any way without refetching after that refetching will happen
      // refetchOnWindowFocus: false, // if is false when data updated then it will not refetch
      // refetchInterval: 5000, // 5 seconds to refetch data
      //   enabled: false, // when open first time it will not refetch
      //   onSuccess,
      onError,
    }
  );
};

export const useAddUserData = () => {
  return useMutation(addUser);
};
