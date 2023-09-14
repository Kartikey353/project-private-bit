export const TOKENSTORE_EXT = "token"
export const NFTSTORE_EXT = "nft"
export const NETWORK_STORE = "network"
export const DBConfig = {
  name: "BitwalletToken",
  version: 1,
  objectStoresMeta: [
    {
      store: TOKENSTORE_EXT,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "tokenAddress",
          keypath: "tokenAddress",
          options: { unique: false },
        },
        {
          name: "tokenSymbol",
          keypath: "tokenSymbol",
          options: { unique: false },
        },
        {
          name: "tokenDecimal",
          keypath: "tokenDecimal",
          options: { unique: false },
        },
        {
          name: "tokenBal",
          keypath: "tokenBal",
          options: { unique: false },
        },
        {
          name: "tokenNetwork",
          keypath: "tokenNetwork",
          options: { unique: false },
        },
      ],
    },
    {
      store: NFTSTORE_EXT,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "nftAddress",
          keypath: "nftAddress",
          options: { unique: false },
        },
        {
          name: "nftURI",
          keypath: "nftURI",
          options: { unique: false },
        },
        {
          name: "nftId",
          keypath: "nftId",
          options: { unique: false },
        },
        {
          name: "nftNetworkId",
          keypath: "nftNetworkId",
          options: { unique: false },
        },
        {
          name: "nftIsSent",
          keypath: "nftIsSent",
          options: { unique: false },
        },
      ],
    },
    {
      store: NETWORK_STORE,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "key",
          keypath: "key",
          options: { unique: false },
        },
        {
          name: "rpc",
          keypath: "rpc",
          options: { unique: false },
        },
        {
          name: "text",
          keypath: "text",
          options: { unique: false },
        },
        {
          name: "chain",
          keypath: "chain",
          options: { unique: false },
        },
        {
          name: "symbol",
          keypath: "symbol",
          options: { unique: false },
        },
        {
          name: "isAPI",
          keypath: "isAPI",
          options: { unique: false },
        },
        {
          name: "isAnkr",
          keypath: "isAnkr",
          options: { unique: false },
        },
        {
          name: "isAdded",
          keypath: "isAdded",
          options: { unique: false },
        },
      ],
    },
  ],
}
