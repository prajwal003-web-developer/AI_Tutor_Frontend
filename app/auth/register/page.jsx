'use client'
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/app/utils/axios";
import { useData } from "@/app/Contexts/DataStore";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [PageLoading, setPageLoading] = useState(false)

   const {setLoggedIn} = useData()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    // Basic validation
    if (!name) {
      toast.error("Name is required!");
      return;
    }

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

    setLoading(true);
    api
      .post("auth/register", {
        Name: name,
        Email: email,
        Password: password,
      })
      .then((res) => {
        toast.success("Registration successful! 🎉");
        const data = res.data
       

        localStorage.setItem('token', data.token)
        setLoggedIn(true)
        setPageLoading(true)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Registration failed!");
      })
      .finally(() => setLoading(false));
  };

   if(PageLoading) return <LoadingPage/>

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[#ffffff10] shadow-lg rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

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
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
