import toast from "react-hot-toast";
export const PROVIDER = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const copyToClipBoard = async (copyMe) => {
  if (!copyMe) {
    return;
  }
  try {
    await navigator.clipboard.writeText(copyMe);
    toast.success("Copied to Clipboard !");
  } catch (err) {
    toast.error("copy failed");
  }
};

export const BASECOVALENT = "https://api.covalenthq.com/v1";
export const NETWORKS = [
  {
    id: 1,
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Polygon Mainnet",
    chain: 137,
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
  },
  {
    id: 2,
    rpc: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Polygon Testnet",
    chain: 80001,
    symbol: "MATIC",
    explorer: "https://mumbai.polygonscan.com",
  },
  {
    id: 3,
    rpc: `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Goerli Testnet",
    chain: 5,
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io/",
  },
  {
    id: 3,
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Polygon Mainnet",
    chain: 137, 
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
  },
  {
    id: 4,
    rpc: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Ethereum Mainnet",
    chain: 1,
    symbol: "ETH",
    explorer: "https://etherscan.io/",
  },
  {
    id: 5,
    rpc: ` https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Optimism Mainnet",
    chain: 10,
    symbol: "ETH",
    explorer: "https://optimistic.etherscan.io/",
  },
  // {
  //   id: 6,
  //   rpc: `https://opt-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
  //   text: "Optimism Goerli",
  //   chain: 420,
  //   explorer: "https://goerli-optimism.etherscan.io",
  // },
  {
    id: 6,
    rpc: `https://rpc.buildbear.io/Unlikely_Saesee_Tiin_1d3c2093`,
    text: "Optimism BuildBear",
    chain: 8576, 
    symbol: "ETH",
    explorer: "https://explorer.buildbear.io/",
  },
  {
    id: 7,
    rpc: `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Arbitrum Mainnet",
    chain: 42161,
    symbol: "ETH",
    explorer: "https://arbiscan.io/",
  },
  {
    id: 7,
    rpc: `https://arb-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`,
    text: "Arbitrum Testnet",
    chain: 421613,
    symbol: "ETH",
    explorer: "https://testnet.arbiscan.io/",
  },
  {
    id: 8,
    rpc: `https://rpc.buildbear.io/Unlikely_Saesee_Tiin_1d3c2093`,
    text: "Optimism Testnet",
    chain: 8576,
    symbol: "ETH",
    explorer: "https://explorer.buildbear.io/Unlikely_Saesee_Tiin_1d3c2093",
  },
  {
    id: 9,
    rpc: `https://rpc.buildbear.io/Exact_Yarael_Poof_cc043bb5`,
    text: "Arbitrum BuildBear",
    chain: 8586,
    symbol: "ETH",
    explorer: "https://explorer.buildbear.io/Exact_Yarael_Poof_cc043bb5",
  },
];
