import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {registerNewUser} from '../actions/adminActions'

const RegisterNew = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/Login");
  };

  const dispatch=useDispatch()


  const register=()=>{
    if(name==="" || email==="" || password==="" || cpassword===""){
        alert("Please fill in all fields.")
    }
    if(password!=cpassword){
        alert("password not matched")
    }
    else{
        const newUser={
            name,
            email,
            password
        }
        console.log(newUser)
        dispatch(registerNewUser(newUser))
    }
  }

  


  return (
    <div className="pt-28 sm:pt-24 md:pt-0 lg:pt-8 xl:pt-0 mt-4">
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center p-6 ">
          <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl max-lg:max-w-lg w-full  ">
            <form className="lg:max-w-md w-full shadow-2xl p-6 bg-white rounded-lg">
              <h3 className="text-gray-800 text-2xl font-bold mb-8">
                Create an account
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <input
                    name="email"
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Confirm Password
                  </label>
                  <input
                    name="cpassword"
                    type="password"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                    placeholder="Enter password"
                    value={cpassword}
                    required
                    onChange={(e) => setCpassword(e.target.value)}
                    

                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="py-3 px-6 text-sm text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={register}
                >
                  Register
                </button>
              </div>
              <p className="text-sm text-gray-800 mt-6">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                  onClick={handleLogInClick}
                >
                  Login here
                </a>
              </p>
            </form>

            <div className="h-full">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full h-full object-contain aspect-[628/516]"
                alt="login img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterNew;
