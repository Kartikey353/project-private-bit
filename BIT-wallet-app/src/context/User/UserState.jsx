import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import ercABI from "../../utils/common";
const UserState = (props) => {
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [signerAddr, setSignerAddr] = useState();
  const [currentSigner, setCurrentSigner] = useState();

  useEffect(() => {
    let provider;
    const getCall = async () => {
      if (currentNetwork.chain === 5) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 1) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 80001) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 137) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 10) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 42161) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 421613) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://arb-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 8576) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://rpc.buildbear.io/Unlikely_Saesee_Tiin_1d3c2093`
        );
      } else if (currentNetwork.chain === 8606) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://rpc.buildbear.io/Warm_Ratts_Tyerel_d6994e59`
        );
      }

      const pvtKey = props.data;
      const wallet = new ethers.Wallet(pvtKey, provider);
      // console.log(pvtKey);
      setCurrentSigner(wallet);
      setSignerAddr(wallet.address);
    };
    getCall();
  }, [props.data, currentNetwork]);
  const currNetwork = () => {
    console.log(currentNetwork);
  };

  return (
    <>
      <UserContext.Provider
        value={{
          signerAddr,
          currentSigner,
          currNetwork,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
