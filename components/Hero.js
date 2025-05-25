import { Poppins } from "next/font/google";
import React from "react";
import Button from "./Button";
import Taskboard from "./Taskboard";
import Link from "next/link";
import CallToAction from "./CallToAction";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + poppins.className
        }
      >
        <span className="textGradient">Soundboard</span> helps you manage your
        <span className="textGradient"> podcast</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[700px]">
        Manage taskflow for your projects,
        <span className="font-semibold"> one episode at a time</span>.
      </p>
      <CallToAction />
      <Taskboard />
    </div>
  );
}
