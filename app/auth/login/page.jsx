'use client'
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/app/utils/axios";
import { useData } from "@/app/Contexts/DataStore";
import LoadingPage from "@/app/Components/LoadingPage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Loading, setLoading] = useState(false)

  const [PageLoading, setPageLoading] = useState(false)

  const {setLoggedIn} = useData()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(Loading){
      return
    }

    // Basic validation
    if (!email) {
      toast.error("Email is required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    setLoading(true)
    api.post('auth/login', {
      Email: email, Password: password
    }).then((res) => {
      const data = res.data
      console.log(data)

      localStorage.setItem('token',data.token)
      setLoggedIn(true)
      toast.success("Login successful! ");
      setPageLoading(true)
    }).catch((err) => {
      toast.error(err?.response?.data?.message ||"Login Error");
    })
    .finally(()=>{
      setLoading(false)
    })


    


  };

  if(PageLoading) return <LoadingPage/>

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[#ffffff10] shadow-lg rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 cursor-pointer"
        >
         {
          Loading?'Loggingin...':'Login'
         }
        </button>

        {/* Register link */}
        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
