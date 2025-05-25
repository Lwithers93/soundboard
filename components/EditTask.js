import React from "react";
import Button from "./Button";

export default function EditTask(props) {
  const { episodeNum, taskNum, onClose } = props;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex w-full justify-center items-center z-50 pointer-events-auto">
      <div className="flex flex-col justify-center items-center py-4 gap-4 bg-white max-auto rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <p>nothing</p>
        <div className={"grid gap-4 w-fit mx-auto "}>
          {/* show addition button for certain error message */}

          <Button text="Sign In" />
          <Button text="Sign Up" />
          <Button text="Exit" dark clickHandler={onClose} />
        </div>
      </div>
    </div>
  );
}
