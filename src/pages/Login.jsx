import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", user.uid);
        navigate("/userpage");
      }
    } catch (error) {
      toast.error("unseccesfull" + error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-b from-green-100 to-white px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-green-800">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-800"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-green-900 border border-green-300 placeholder:text-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-400 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-800"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-green-600 hover:text-green-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-green-900 border border-green-300 placeholder:text-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-400 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                onClick={login}
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-green-700">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              SIGN UP
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
