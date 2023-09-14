import React from "react";
import { WiDirectionUpRight } from "react-icons/wi";
const TokenTable = (props) => {
  const handleSendClick = () => {
    console.log(props.tokenAddress);
  };
  return (
    <>
      {" "}
      <th
        scope="row"
        onClick={props.action}
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.symb}{" "}
      </th>{" "}
      <td onClick={props.action} className="px-6 py-4 flex justify-between">
        {" "}
        {props.value}{" "}
        <WiDirectionUpRight className="text-3xl font-bold text-blue-400 hover:cursor-pointer" />{" "}
      </td>{" "}
    </>
  );
};
export default TokenTable;
