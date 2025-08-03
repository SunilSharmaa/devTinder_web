import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { DEVTINDER_BASE_URL } from "../utils/constants";

const Signin = () => {
  const [emailId, setEmailId] = useState("sunil@gmail.com");
  const [password, setPassword] = useState("Sunil@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinUser = async () => {
    try {
      const response = await axios.post(
        DEVTINDER_BASE_URL + "/signin",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response?.data?.data));
      navigate("/")
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center">
        <div className="w-1/2 min-h-120  shadow-lg shadow-gray-600 py-4 flex justify-center rounded-lg">
          <div className="w-[80%]">
            <h1 className="text-2xl text-center mb-8">Signin User</h1>
            <div className=" border border-gray-600 rounded-lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signinUser();
                }}
                className="flex flex-col items-center  py-10 space-y-10"
                action=""
              >
                <div className="space-y-6 flex flex-col">
                  <input
                    className="border rounded-lg border-gray-600 p-2 w-70"
                    type="text"
                    placeholder="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <input
                    className="border rounded-lg border-gray-600 p-2 w-70"
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <button className="btn btn-accent rounded-lg">submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
