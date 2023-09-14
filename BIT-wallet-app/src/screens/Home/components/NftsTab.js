import React, { useEffect, useState } from "react";
import Nfts from "./Nfts";
import { useSelector } from "react-redux";
const { Network, Alchemy } = require("alchemy-sdk");

const NftsTab = () => {
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [nfts, setNfts] = useState([]);
  // const [network, setNetwork] = useState();
  let network;
  if (currentNetwork.chain === 5) {
    network = Network.ETH_GOERLI;
  }
  if (currentNetwork.chain === 137) {
    network = Network.MATIC_MAINNET;
  }
  if (currentNetwork.chain === 80001) {
    network = Network.MATIC_MUMBAI;
  }
  if (currentNetwork.chain === 1) {
    network = Network.ETH_MAINNET;
  }
  if (currentNetwork.chain === 10) {
    network = Network.OPT_MAINNET;
  }
  if (currentNetwork.chain === 420) {
    network = Network.OPT_GOERLI;
  }
  if (currentNetwork.chain === 42161) {
    network = Network.ARB_MAINNET;
  }
  if (currentNetwork.chain === 421613) {
    network = Network.ARB_GOERLI;
  }
  // if (currentNetwork.chain === 8586) {
  //   network = Network.ARBITRUM_BUILDBEAR;
  // }
  // if (currentNetwork.chain === 8576) {
  //   network = Network.OPT_BUILDBEAR;
  // }

  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMYKEY, // Replace with your Alchemy API Key.
    network: network, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  useEffect(() => {
    const getData = async () => {
      try {
        const nfts = await alchemy.nft.getNftsForOwner(account.address);
        // console.log("NFTS", nfts);
        setNfts(nfts.ownedNfts);
      } catch (error) {
        console.log(error);
      }
    };
    if (account.address) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address, currentNetwork.chain]);

  return (
    <>
      <div className="">
        {" "}
        {nfts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
            {" "}
            {nfts.map((asset, i) => {
              return (
                <React.Fragment key={i}>
                  <Nfts token={asset} />{" "}
                </React.Fragment>
              );
              // console.log(asset);
            })}{" "}
          </div>
        ) : (
          // <div className="flex justify-center items-center">
          //   <p>Not Found</p>
          // </div>

          <div class="flex flex-col items-center justify-center">
            <p class="text-4xl font-bold text-gray-800 mb-4 animate-pulse">
              {" "}
              No NFTs Found{" "}
            </p>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </>
  );
};

export default NftsTab;
