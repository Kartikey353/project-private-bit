import React, { useState, useEffect, useContext } from "react";
import TokenContext from "./TokenContext";
import UserContext from "../User/UserContext";
import { Network, Alchemy } from "alchemy-sdk";
import { useSelector } from "react-redux";
import ercABI from "../../utils/common";
import { ethers } from "ethers";
import { TOKENSTORE } from "../../utils/dbConfig";
import { useIndexedDB } from "react-indexed-db";
import toast from "react-hot-toast";

const TokenData = (props) => {
  const [contractAddress, setContractAddress] = useState();
  const [symbol, setSymbol] = useState();
  const [decimal, setDecimal] = useState();
  const [userBal, setUserBal] = useState();
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [initialRenderDet, setInitialRenderDet] = useState(false);
  const [initialRenderBal, setInitialRenderBal] = useState(false);
  const [initialRenderUpdate, setInitialRenderUpdate] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  //context called here
  const user = useContext(UserContext);
  const { getAll, getById, update } = useIndexedDB(TOKENSTORE);
  //Balance will called here......
  useEffect(() => {
    if (initialRenderBal && contractAddress && contractAddress.length === 42) {
      try {
        const getData = async () => {
          const contract = new ethers.Contract(
            contractAddress,
            ercABI,
            user.currentSigner
          );

          try {
            const balData = await contract.balanceOf(user.signerAddr);
            const bal = balData.toString() / 10 ** 18;
            setUserBal(bal);
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
    if (initialRenderDet) {
      const getMetaData = async () => {
        const contract = new ethers.Contract(
          contractAddress,
          ercABI,
          user.currentSigner
        );
        try {
          const getSymbol = await contract.symbol();
          const getDecimal = await contract.decimals();
          console.log(getSymbol, getDecimal);
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
  }, [contractAddress]);

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
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
