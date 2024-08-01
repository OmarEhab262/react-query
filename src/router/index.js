import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import Home from "../components/Home";
import { Name } from "../components/Name";
import UserName from "../components/UserName";
import AddUser from "../components/AddUser";
import Details from "../components/Details";
import PaginationPage from "../components/PaginationPage";
import LoadMore from "../components/LoadMore";
import AddUserTwo from "../components/AddUserTwo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="name" element={<Name />} />
        <Route path="username" element={<UserName />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="paginationPage" element={<PaginationPage />} />
        <Route path="details/:nameId" element={<Details />} />
        <Route path="loadMore" element={<LoadMore />} />
        <Route path="addusertwo" element={<AddUserTwo />} />
      </Route>
    </>
  )
);
export default router;
