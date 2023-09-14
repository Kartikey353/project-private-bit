import React, { useState, useEffect, useContext } from "react";
import TokenContext from "./TokenContext";
import accountContext from "./../accountContext";
import { ercABI } from "../../utils/essentials";
import { ethers } from "ethers";
import { TOKENSTORE_EXT } from "../../utils/dbConfig";
import { useIndexedDB } from "react-indexed-db";
import toast from "react-hot-toast";

const TokenData = (props) => {
  const [contractAddress, setContractAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimal, setDecimal] = useState("");
  const [userBal, setUserBal] = useState();
  const [initialRenderDet, setInitialRenderDet] = useState(false);
  const [initialRenderBal, setInitialRenderBal] = useState(false);
  const [initialRenderUpdate, setInitialRenderUpdate] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [isContractAdress, setIsContractAddress] = useState(false);

  //context called here
  const user = useContext(accountContext);
  const { getAll, getById, update } = useIndexedDB(TOKENSTORE_EXT);
  //Balance will called here......
  useEffect(() => {
    if (initialRenderBal && isContractAdress && contractAddress.length === 42) {
      try {
        setIsLoader(true);
        const getData = async () => {
          const contract = new ethers.Contract(
            contractAddress,
            ercABI,
            user.signer
          );
          try {
            const balData = await contract.balanceOf(user.signerAddr);
            // console.log(balData);
            const bal = Number(balData) / 10 ** 18;
            console.log(bal);
            setUserBal(bal);
            setIsLoader(false);
          } catch (error) {
            console.log(`Error occured ${error}`);
            toast.error("Error! Try Again");
            setIsLoader(false);
          }
        };
        getData();
      } catch (error) {
        console.log(`Wrong contract Address:${error}`);
        // toast.error("Error! Try Again");
      }
    } else {
      setInitialRenderBal(true);
    }
  }, [contractAddress]);
  //Token Metadata
  useEffect(() => {
    if (initialRenderDet && isContractAdress && contractAddress.length === 42) {
      setIsLoader(true);
      const getMetaData = async () => {
        const contract = new ethers.Contract(
          contractAddress,
          ercABI,
          user.signer
        );
        try {
          const getSymbol = await contract.symbol();
          const getDecimal = await contract.decimals();
          // console.log(getSymbol, getDecimal);
          setSymbol(getSymbol);
          setDecimal(getDecimal);
          setIsLoader(false);
        } catch (error) {
          // toast.error("Error! Try Again");
        }
      };
      getMetaData();
    } else {
      if (contractAddress !== "") {
        setInitialRenderDet(true);
      }
    }
  }, [contractAddress, userBal]);

  return (
    <TokenContext.Provider
      value={{
        contractAddress,
        setContractAddress,
        symbol,
        decimal,
        setSymbol,
        setDecimal,
        userBal,
        balance,
        isLoader,
        setIsLoader,
        setIsContractAddress,
      }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
