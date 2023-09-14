import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        type="button"
        class="inline-block rounded my-6 bg-gradient-to-br from-purple-600 to-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-700 active:shadow-inner"
        onClick={props.action}
      >
        {props.value}
      </button>{" "}
    </>
  );
};

export default Button;
