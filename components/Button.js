import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Button({
  text,
  dark,
  full,
  flexBtn,
  clickHandler,
  ...props
}) {
  return (
    <button
      {...props} // spread all remaining props to the button
      onClick={clickHandler}
      className={
        "rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-orange-600 " +
        (dark ? " text-white bg-orange-600 " : " text-orange-600 ") +
        (full ? " grid place-items-center w-full " : " ") +
        (flexBtn
          ? " w-full grid place-items-center md:ml-auto md:max-w-[400px] "
          : " ")
      }
    >
      <p
        className={
          "px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " + poppins.className
        }
      >
        {text}
      </p>
    </button>
  );
}
