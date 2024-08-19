import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/user/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);

         history.replace("/home")
      })
      .catch((e) => {
        console.log(e);
        // setError("something went wrong");
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2
          className="text-2xl font-bold   
 mb-4"
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700   
 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3   
 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter   
 your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>{" "}
             
            <div className="flex items-center">
              <input
                type={show ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full   
 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
              {show ? (
                <FaRegEye size={22} onClick={() => toggle()} />
              ) : (
                <FaRegEyeSlash size={22} onClick={() => toggle()} />
              )}
            </div>
          </div>{" "}
           
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none   
 focus:shadow-outline"
          >
            Login
          </button>
          <p className="text-sm text-center mt-7 text-blue-500">
            Not register yet?
            <Link to="/"> Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
