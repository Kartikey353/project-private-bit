import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { BASECOVALENT } from "../../../utils";
import { formatFromWei } from "../../../web3";
import { useSelector } from "react-redux";
import TokenContext from "../../../context/Token/TokenContext";
import UserContext from "../../../context/User/UserContext";
import TokenTable from "./tokenTable";
import { NETWORKS } from "../../../utils";
import { current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { TOKENSTORE } from "../../../utils/dbConfig";
import { useIndexedDB } from "react-indexed-db";
import ercABI from "../../../utils/common";

const AssetTab = () => {
  const { balance } = useSelector((state) => state.wallet);
  const [isImportClick, setIsImportClick] = useState(false);
  const [updateChange, setUpdateChange] = useState(false);
  const [tokenArray, setTokenArray] = useState([]);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [isTableLoader, setIsTableLoader] = useState(false);
  const [isSend, setIsSend] = useState({
    is: false,
    tokSymbol: "",
    address: "",
    tokDecimal: "",
  });
  const [sendParams, setSendParams] = useState({
    recpAddr: "",
    amount: "",
  });
  //Make another useState for update

  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  const { getById, update, getAll, add, openCursor, clear } =
    useIndexedDB(TOKENSTORE);

  useEffect(() => {
    getAll().then((res) => {
      //put a check that only those tokens should push in array whose chain id matches with currentNetwork
      setTokenArray([]);
      res.map((item) => {
        if (item.tokenNetwork === currentNetwork.chain) {
          setTokenArray((prev) => {
            return [
              ...prev,
              {
                symbol: item.tokenSymbol,
                balance: item.tokenBal,
                decimal: item.tokenDecimal,
                tokenAddress: item.tokenAddress,
              },
            ];
          });
        }
      });
    });
    setIsTableLoader(false);
  }, [isImportClick, updateChange, currentNetwork]);

  const handleImportClick = () => {
    setIsImportClick((prev) => {
      {
        token.setContractAddress("");
        token.setSymbol("");
        token.setDecimal("");
        return !prev;
      }
    });
    setIsAlreadyAdded(false);
    token.setIsLoader(false);
  };

  const handleChange = async ({ target: { value } }) => {
    const res = await getAll();

    if (res.length === 0) {
      if (value.length === 42) {
        token.setIsLoader(true);
        await token.setContractAddress(value);
      } else {
      }
    } else if (res.length > 0) {
      let addressExists = false;
      for (let item of res) {
        if (value === item.tokenAddress) {
          setIsAlreadyAdded(true);
          addressExists = true;
          break;
        }
      }
      if (!addressExists) {
        if (value.length === 42) {
          token.setIsLoader(true);
          await token.setContractAddress(value);
        } else {
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    if (token.contractAddress.length === 42) {
      add({
        tokenAddress: token.contractAddress,
        tokenSymbol: token.symbol,
        tokenDecimal: token.decimal,
        tokenBal: token.userBal,
        tokenNetwork: currentNetwork.chain,
      });
      token.setSymbol("");
      token.setDecimal("");
      token.setContractAddress("");
      setIsImportClick(false);
    } else {
      console.log("Invalid Contract Address");
      toast.error("Invalid Contract Address");
    }
  };

  const handleUpdate = async () => {
    setIsTableLoader(true);
    let networkToken = []; //Array to store current Network tokens
    let otherToken = []; //Array to store all other tokens
    const res = await getAll();
    res.map((item) => {
      if (item.tokenNetwork === currentNetwork.chain) {
        networkToken.push(item);
      } else if (item.tokenNetwork !== currentNetwork.chain) {
        otherToken.push(item);
      }
    });
    try {
      const clearDB = await clear();
      networkToken.map(async (item) => {
        // console.log(item);
        const contract = new ethers.Contract(
          item.tokenAddress,
          ercABI,
          user.currentSigner
        );
        try {
          const tokenBalHex = await contract.balanceOf(user.signerAddr);
          const balNum = Number(tokenBalHex) / 10 ** 18;
          try {
            item.tokenBal = balNum;
            try {
              add({
                tokenAddress: item.tokenAddress,
                tokenSymbol: item.tokenSymbol,
                tokenDecimal: item.tokenDecimal,
                tokenBal: item.tokenBal,
                tokenNetwork: item.tokenNetwork,
              });
              setUpdateChange((prev) => {
                return !prev;
              });
            } catch (error) {
              console.log(`Error occured when storing in DB:${error}`);
              toast.error("Error! Try Again");
            }
          } catch (error) {
            console.log(`Got error in assigning the value:${error}`);
            toast.error("Error! Try Again");
          }
        } catch (error) {
          console.log(`Error occured:${error}`);
          toast.error("Error! Try Again");
        }
      });
    } catch (error) {
      console.log(`Error occured:${error}`);
      toast.error("Error! Try Again");
    }
    //To store all other tokens into DB
    try {
      otherToken.map((item) => {
        try {
          add({
            tokenAddress: item.tokenAddress,
            tokenSymbol: item.tokenSymbol,
            tokenDecimal: item.tokenDecimal,
            tokenBal: item.tokenBal,
            tokenNetwork: item.tokenNetwork,
          });
        } catch (error) {
          console.log(`Error occured on mapping item:${error}`);
          toast.error("Error! Try Again");
        }
      });
    } catch (error) {
      console.log(`Error occured when adding other tokens:${error}`);
      toast.error("Error! Try Again");
    }
  };

  //Asset sending functionality started from here....
  const handleSend = async (tokenAddress, symbol, decimal) => {
    setIsSend({
      is: true,
      tokSymbol: symbol,
      address: tokenAddress,
      tokDecimal: decimal,
    });
  };
  //for input vals
  const handleSendParams = (e) => {
    const { name, value } = e.target;
    setSendParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //for main sending functionality
  const sendToken = async () => {
    try {
      token.setIsLoader(true);
      const contract = new ethers.Contract(
        isSend.address,
        ercABI,
        user.currentSigner
      );
      try {
        const send = await contract.transfer(
          sendParams.recpAddr,
          (sendParams.amount * 10 ** isSend.tokDecimal).toString()
        );
        console.log(`Txn Hash:${send.hash}`);
        toast.success(`${send.hash}`);
        toast.success("Transaction Success");
        token.setIsLoader(false);
        setSendParams({
          amount: "",
          recpAddr: "",
        });
        // console.log(sendParams.amount * 10 ** isSend.tokDecimal);
      } catch (error) {
        console.log(`Error in sending tokens: ${error}`);
        toast.error("Error! Try Again");
        token.setIsLoader(false);
      }
    } catch (error) {
      console.log(`Error occured in main:${error}`);
      token.setIsLoader(false);
      toast.error("Error! Try Again");
    }
  };

  return (
    <>
      {isSend.is ? (
        <>
          <div className="parent flex ">
            <div className="inp-cont py-5 mr-3">
              <input
                name="recpAddr"
                type="text"
                onChange={handleSendParams}
                placeholder="0x... (Recipient Address)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-2xl placeholder:font-bold"
              />
              <input
                name="amount"
                type="text"
                onChange={handleSendParams}
                placeholder={isSend.tokSymbol}
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-2xl placeholder:font-bold"
              />
              {token.isLoader ? (
                <button
                  type="button"
                  class="flex items-center rounded-lg bg-gradient-to-br from-green-300 to-green-800-500 px-4 py-2 text-white"
                  disabled
                >
                  <svg
                    class="mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span class="font-medium"> Sending... </span>
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={sendToken}
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Send
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSend(false);
              }}
              className="text-white h-fit bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              X{" "}
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center flex-col">
          <button
            type="button"
            class="inline-block rounded my-6 bg-gradient-to-br from-purple-600 to-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-700 active:shadow-inner"
            onClick={handleUpdate}
          >
            Refresh Balance
          </button>
          {isTableLoader ? (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                      <div className="col-span-1 h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-[100%] overflow-x-auto rounded-xl mb-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Token Symbol
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      {currentNetwork.chain === 5 ||
                      currentNetwork.chain == 1 ? (
                        <>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            ETH
                          </th>
                          <td className="px-6 py-4">{balance}</td>
                        </>
                      ) : (
                        <>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            MATIC
                          </th>
                          <td className="px-6 py-4">{balance}</td>
                        </>
                      )}
                    </tr>
                    {tokenArray.map((item, index) => {
                      return (
                        <tr
                          onClick={() => {
                            handleSend(
                              item.tokenAddress,
                              item.symbol,
                              item.decimal
                            );
                          }}
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <TokenTable
                            symb={item.symbol}
                            decimals={item.decimal}
                            value={item.balance}
                            id={index}
                            tokenAddress={item.tokenAddress}
                            sendAction={handleSend}
                          />{" "}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p> Don 't see your tokens?</p>{" "}
              {isImportClick ? (
                <div className="inpCont p-3 absolute z-10 top-0 w-full h-[100vh] bg-black">
                  <div className="flex justify-between">
                    <div className="head text-2xl font-bold">
                      {" "}
                      Import Tokens{" "}
                    </div>{" "}
                    <button
                      type="button"
                      onClick={handleImportClick}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      X{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="form mt-10">
                    <div className="mb-6">
                      <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Contract Address{" "}
                      </label>{" "}
                      <input
                        id="ContractAddress"
                        name="address"
                        type="text"
                        onChange={handleChange}
                        maxLength={42}
                        minLength={42}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>{" "}
                    <div className="mb-6">
                      <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Symbol{" "}
                      </label>{" "}
                      <input
                        name="symbol"
                        type="text"
                        value={token.symbol}
                        disabled
                        onChange={(e) => token.setSymbol(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>{" "}
                    <div className="mb-6">
                      <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        decimal{" "}
                      </label>{" "}
                      <input
                        name="decimal"
                        type="text"
                        disabled
                        value={token.decimal}
                        onChange={(e) => token.setDecimal(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>{" "}
                  </div>{" "}
                  {token.isLoader ? (
                    <button
                      type="button"
                      class="flex items-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-white"
                      disabled
                    >
                      <svg
                        class="mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span class="font-medium"> Processing... </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                        isAlreadyAdded
                          ? "bg-red-600 cursor-not-allowed"
                          : "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      }`}
                      disabled={isAlreadyAdded}
                    >
                      {isAlreadyAdded ? "Already Added !" : "Add"}
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={handleImportClick} className="text-sky-500">
                    Import Tokens{" "}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AssetTab;
