import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("shivam");
  const [lastName, setLastName] = useState("giri");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(24);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("Shivam@123");

  const signupUser = async () => {
    try {
      const response = await axios.post("http://localhost:7000/signup", {
        firstName,
        lastName,
        gender,
        age,
        emailId,
        password,
      });

      console.log(response);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center">
        <div className="w-1/2 min-h-120  shadow-lg shadow-gray-600 py-4 flex justify-center rounded-lg">
          <div className="w-[80%]">
            <h1 className="text-2xl text-center mb-8">Signup User</h1>
            <div className=" border border-gray-600 rounded-lg">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signupUser();
                }}
                className="flex flex-col items-center  py-10 space-y-10"
                action=""
              >
                <div className="space-x-6">
                  <input
                    className="border rounded-lg border-gray-600 p-2"
                    type="text"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="border rounded-lg border-gray-600 p-2"
                    type="text"
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="space-x-6">
                  <input
                    className="border rounded-lg border-gray-600 p-2"
                    type="text"
                    placeholder="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <input
                    className="border rounded-lg border-gray-600 p-2"
                    type="number"
                    placeholder="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="space-x-6">
                  <input
                    className="border rounded-lg border-gray-600 p-2"
                    type="text"
                    placeholder="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <input
                    className="border rounded-lg border-gray-600 p-2"
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

export default Signup;
