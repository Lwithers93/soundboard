"use client";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModalBtn, setShowModalBtn] = useState(false);
  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password) {
      setErrorMessage("Please enter a valid email and password to login");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be a minimum of 6 characters");
      return;
    }

    setAuthenticating(true);

    setErrorMessage("");

    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signup(email, password);
      } else {
        console.log("login existing user");
        await login(email, password);
      }
    } catch (err) {
      // Handle various error messages
      console.log("the error message is: ", err.message);
      console.log("the error code is: ", err.code);
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage(
          "This email is already registered. Please click 'Sign In' to log in, or use a different email."
        );
        setShowModalBtn(true); // Show additional Sign in button
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage(
          "The email address is invalid. Please enter a valid email."
        );
      } else if (err.code === "auth/invalid-credential") {
        console.log("invalid credential error has been caught");
        setErrorMessage(
          "The email or password was not recognised. Please enter a valid email/password or click 'Sign Up' to register."
        );
        setShowModalBtn(true); // Shows addition Sign in button
      } else if (err.code === "auth/wrong-password") {
        setErrorMessage("The password is incorrect. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setErrorMessage(
          "No account found with this email. Please sign up first."
        );
      } else {
        setErrorMessage(err.message);
      }
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div>
      <div
        className={
          "flex flex-col flex-1 justify-center items-center gap-4 " +
          (errorMessage ? "pointer-events-none" : "pointer-events-auto")
        }
      >
        <h3 className={"text-4xl sm:text-5xl md:text-6xl " + poppins.className}>
          {isRegister ? "Register" : "Login"}
        </h3>
        <p>You&#39;re one step away!</p>
        <input
          className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid rounded-full outline-none border-orange-500 duration-200 hover:border-orange-700 focus:border-orange-700 "
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid rounded-full outline-none border-orange-500 duration-200 hover:border-orange-700 focus:border-orange-700 "
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="max-w-[400px] w-full mx-auto ">
          <Button
            clickHandler={handleSubmit}
            text={authenticating ? "Submitting" : "Submit"}
            full
          />

          <p className="text-center py-3">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-orange-600"
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
      {errorMessage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex w-full justify-center items-center z-50 pointer-events-auto">
          <div className="flex flex-col justify-center items-center py-4 gap-4 bg-white max-auto rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <p>{errorMessage}</p>
            <div
              className={
                "grid gap-4 w-fit mx-auto " + (showModalBtn && "grid-cols-2")
              }
            >
              {/* show addition button for certain error message */}
              {showModalBtn && isRegister && (
                <Button
                  clickHandler={() => {
                    setIsRegister(!isRegister);
                    setErrorMessage("");
                  }}
                  text="Sign In"
                />
              )}
              {showModalBtn && !isRegister && (
                <Button
                  clickHandler={() => {
                    setIsRegister(!isRegister);
                    setErrorMessage("");
                  }}
                  text="Sign Up"
                />
              )}
              <Button
                clickHandler={() => setErrorMessage("")}
                text="Exit"
                dark
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
