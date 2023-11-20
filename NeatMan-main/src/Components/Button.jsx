import React from "react";

export default function Button(props) {
  return (
    <div>
      <button
        type="submit"
        className=" text-white border-2 bg-green-700 px-4 py-2 mt-4 block"
      >
        {props.text}
      </button>
    </div>
  );
}
