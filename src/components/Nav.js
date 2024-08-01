import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <ul className="flex bg-white gap-5 text-[20px] p-3">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/name">Name</NavLink>
          <NavLink to="/username">UserName</NavLink>
          <NavLink to="/adduser">AddUser</NavLink>
          <NavLink to="/paginationPage">PaginationPage</NavLink>
          <NavLink to="/loadMore">LoadMore</NavLink>
          <NavLink to="/addusertwo">Add User Two</NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
