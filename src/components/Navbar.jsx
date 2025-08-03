import axios from "axios";
import React from "react";
import { DEVTINDER_BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = async()=> {
        await axios.post(DEVTINDER_BASE_URL + "/logout");
        navigate("/signin");
    }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm fixed top-0">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/editProfile" className="justify-between">
                 Edit Profile
                  
                </a>
              </li>
              <li>
                <a href="/connections">Connections</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
