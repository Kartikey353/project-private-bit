import React, { useState, useEffect } from "react"
import { getAccountBalance } from "../scripts/accounts"
import { ethers } from "ethers"
import "./assets.css"
import { useContext } from "react"
import { ercABI } from "./../../utils/essentials"
import AccountContext from "../../context/accountContext"
import TokenContext from "../../context/Token/TokenContext"
import { Toast, toast } from "react-hot-toast"
import { TOKENSTORE_EXT } from "../../utils/dbConfig"
import { useIndexedDB } from "react-indexed-db"
import TokenTable from "./components/TokenTable"
import Button from "./components/Button"

//new code
const Assets = () => {
  const account = useContext(AccountContext)
  const token = useContext(TokenContext)
  const { getById, update, getAll, add, openCursor, clear } = useIndexedDB(TOKENSTORE_EXT)
  const [isImportClick, setIsImportClick] = useState(false)
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false)
  const [tokenArray, setTokenArray] = useState([])
  const [updateChange, setUpdateChange] = useState(false)
  const [isSend, setIsSend] = useState({
    is: false,
    tokSymbol: "",
    address: "",
    tokDecimal: "",
  })
  const [sendParams, setSendParams] = useState({
    recpAddr: "",
    amount: "",
  })
  // const [isUpdateOn, setIsUpdateOn] = useState(false);

  //Logics
  useEffect(() => {
    const getTokens = () => {
      getAll().then((res) => {
        setTokenArray([])
        res.map((item) => {
          if (item.tokenNetwork === account.web3RPC.chain) {
            setTokenArray((prev) => {
              return [
                ...prev,
                {
                  symbol: item.tokenSymbol,
                  balance: item.tokenBal,
                  decimal: item.tokenDecimal,
                  tokenAddress: item.tokenAddress,
                },
              ]
            })
          }
        })
      })
    }
    getTokens()
  }, [isImportClick, account.web3RPC, updateChange])
  //useEffect for update
  useEffect(() => {
    handleUpdate()
  }, [])
  //

  //Basic operations
  const handleImportClick = () => {
    setIsImportClick((prev) => {
      {
        token.setContractAddress("")
        token.setSymbol("")
        token.setDecimal("")
        token.setIsLoader(false)
        return !prev
      }
    })
    // console.log("clicked....");
  }

  //Token properties get filled
  const handleChange = async ({ target: { value } }) => {
    const res = await getAll()
    if (res.length === 0) {
      if (value.length === 42) {
        // token.setIsLoader(true);
        token.setIsContractAddress(true)
        console.log("Setting started...")
        await token.setContractAddress(value)
      } else {
        token.setIsContractAddress(false)
        token.setIsLoader(false)
        toast.error("Error occured!")
      }
    } else if (res.length > 0) {
      let addressExists = false
      for (let item of res) {
        if (value === item.tokenAddress) {
          setIsAlreadyAdded(true)
          addressExists = true
          break
        }
      }
      if (!addressExists) {
        if (value.length === 42) {
          token.setIsContractAddress(true)
          token.setIsLoader(true)
          await token.setContractAddress(value)
        } else {
          token.setIsContractAddress(false)
        }
      }
    }
  }

  //Add token
  const handleSubmit = async (e) => {
    if (token.contractAddress.length === 42) {
      add({
        tokenAddress: token.contractAddress,
        tokenSymbol: token.symbol,
        tokenDecimal: token.decimal,
        tokenBal: token.userBal,
        tokenNetwork: account.web3RPC.chain,
      })
      token.setSymbol("")
      token.setDecimal("")
      token.setContractAddress("")
      setIsImportClick(false)
    } else {
      console.log("Invalid Contract Address")
      toast.error("Invalid Contract Address")
    }
  }
  //Update the erc20 triggered here...
  const handleUpdate = async () => {
    const res = await getAll()
    res.map(async (item) => {
      if (item.tokenNetwork === account.web3RPC.chain) {
        const contract = new ethers.Contract(item.tokenAddress, ercABI, account.signer)
        try {
          const tokenBalHex = await contract.balanceOf(account.signerAddr)
          const balNum = Number(tokenBalHex) / 10 ** item.tokenDecimal

          try {
            // if (item.tokenBal !== balNum) {
            update({
              id: item.id,
              tokenAddress: item.tokenAddress,
              tokenSymbol: item.tokenSymbol,
              tokenDecimal: item.tokenDecimal,
              tokenBal: balNum,
              tokenNetwork: item.tokenNetwork,
            }).then((event) => console.log("updated...."))
            // }
            setUpdateChange((prev) => {
              return !prev
            })
          } catch (error) {
            toast.error("Try Again !")
          }
        } catch (error) {
          console.log(`Error while initiating the contract:${error}`)
          toast.error("Try Again !")
        }
      }
    })
  }
  //sending functionality
  //Asset sending functionality started from here....
  const handleSend = async (tokenAddress, symbol, decimal) => {
    setIsSend({
      is: true,
      tokSymbol: symbol,
      address: tokenAddress,
      tokDecimal: decimal,
    })
    token.setIsLoader(false)
  }
  //for input vals
  const handleSendParams = (e) => {
    const { name, value } = e.target
    setSendParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  //for main sending functionality
  const sendToken = async () => {
    try {
      token.setIsLoader(true)
      const contract = new ethers.Contract(isSend.address, ercABI, account.signer)
      try {
        const send = await contract.transfer(
          sendParams.recpAddr,
          (sendParams.amount * 10 ** isSend.tokDecimal).toString()
        )
        console.log(`Txn Hash:${send.hash}`)
        toast.success(`Hash: ${send.hash.slice(0, 8)}.....${send.hash.slice(-5)}`)
        toast.success("Transaction Success")
        account.setValue(0)

        setSendParams({
          amount: "",
          recpAddr: "",
        })
        token.setIsLoader(false)
        // setIsUpdateOn((prev) => {
        //   return !prev;
        // });

        // console.log(sendParams.amount * 10 ** isSend.tokDecimal);
      } catch (error) {
        console.log(`Error in sending tokens: ${error}`)
        toast.error("Error! Try Again")
        token.setIsLoader(false)
      }
    } catch (error) {
      console.log(`Error occured in main:${error}`)
      token.setIsLoader(false)
      toast.error("Error! Try Again")
    }
  }

  const testChain = (tokenAddr, symbol, decimal) => {
    // console.log(account.web3RPC.chain)
    console.log(tokenAddr, symbol, decimal)
  }

  return isSend.is ? (
    <>
      <div className="parent flex">
        <div className="inp-cont m-auto my-7 flex-col justify-center">
          <input
            name="recpAddr"
            type="text"
            value={sendParams.recpAddr}
            onChange={handleSendParams}
            placeholder="0x... (Recipient Address)"
            className="bg-gray-50 border border-gray-300 h-10 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 caret-blue-500 text-lg mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-lg placeholder:font-bold"
          />
          <input
            name="amount"
            type="text"
            value={sendParams.amount}
            onChange={handleSendParams}
            placeholder={isSend.tokSymbol}
            className="bg-gray-50 border mb-3 border-gray-300 h-10 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-lg placeholder:font-bold"
          />{" "}
          {token.isLoader ? (
            <button
              type="button"
              class="flex items-center rounded-lg bg-gradient-to-br from-green-300 to-green-800-500 px-4 py-2 text-white"
              disabled>
              <svg
                class="mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4">
                  {" "}
                </circle>{" "}
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  {" "}
                </path>{" "}
              </svg>{" "}
              <span class="font-medium"> Sending... </span>{" "}
            </button>
          ) : (
            <Button
              action={sendToken}
              value="Send"
            />
          )}{" "}
        </div>{" "}
        <button
          type="button"
          onClick={() => {
            setIsSend({
              is: false,
              tokSymbol: "",
              address: "",
              tokDecimal: "",
            })
            setSendParams({
              amount: "",
              recpAddr: "",
            })
            token.setIsLoader(false)
          }}
          className="text-white h-fit bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 mt-5 mr-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          X{" "}
        </button>{" "}
      </div>{" "}
    </>
  ) : isImportClick ? (
    <>
      <div className="import-parent p-5 ">
        {" "}
        <div className="flex justify-between ">
          <div className="head text-2xl font-bold text-white"> Import Tokens </div>{" "}
          <button
            type="button"
            onClick={handleImportClick}
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            X{" "}
          </button>{" "}
        </div>{" "}
        <div className="form mt-10">
          <div className="mb-6">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          {token.isLoader ? (
            <button
              type="button"
              class="flex items-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-white"
              disabled>
              <svg
                class="mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4">
                  {" "}
                </circle>{" "}
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  {" "}
                </path>{" "}
              </svg>{" "}
              <span class="font-medium"> Processing... </span>{" "}
            </button>
          ) : (
            // <p>Processing....</p>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                isAlreadyAdded
                  ? "bg-red-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              }`}
              disabled={isAlreadyAdded}>
              {" "}
              {isAlreadyAdded ? "Already Added !" : "Add"}{" "}
            </button>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </>
  ) : (
    <>
      <div className="container p-4">
        <>
          <div className="flex flex-col">
            {" "}
            {tokenArray.map((item, index) => {
              return (
                <tr
                  onClick={() => {
                    handleSend(item.tokenAddress, item.symbol, item.decimal)
                  }}
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <TokenTable
                    symb={item.symbol}
                    decimals={item.decimal}
                    value={item.balance}
                    id={index}
                    // sendAction={handleSend}
                  />{" "}
                </tr>
              )
            })}{" "}
          </div>{" "}
          <div className="flex items-center flex-col ">
            <p className="text-white"> Don 't see your tokens?</p>{" "}
            <button
              className="text-sky-500"
              onClick={handleImportClick}>
              Import Token{" "}
            </button>{" "}
          </div>{" "}
        </>{" "}
      </div>{" "}
    </>
  )
}

export default Assets
