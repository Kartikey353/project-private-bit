import React, { useState, useEffect } from "react"
import { useIndexedDB } from "react-indexed-db"
import AccountContext from "./accountContext"
import useAccount from "../components/scripts/accounts"
import { getAccount } from "../components/scripts/accounts"
import { networkList } from "../utils/chain"
import { ethers } from "ethers"
import { NETWORK_STORE } from "../utils/dbConfig"
const AccountState = (props) => {
  const [view, setView] = useState("home")
  const [privateKey, setPrivateKey] = useState(
    "1ff779889908779bec0ff3936b6151a4232e451724bbc2a3e6ac50ea771b5501"
  )
  //default : 0000000000000000000000000000000000000000000000000000000000000001
  // change here
  // const [networkRPC, setNetworkRPC] = useState("polygonMainnet");
  const [dbData, setDbData] = useState([
    {
      id: 1,
      rpc: `https://polygon-mainnet.g.alchemy.com/v2/qgntfG4-Q_3_4C7v6i0wg709xT8_-Fcc`,
      text: "Polygon Mainnet",
      chain: 137,
      symbol: "MATIC",
      explorer: "https://polygonscan.com",
      isAPI: true,
      isAnkr: false,
      isAdded: true,
    },
  ])
  const [addTriggered, setAddTriggered] = useState(false)
  const [balanceunit, setbalanceunit] = useState("Matic")
  const [signer, setSigner] = useState()
  const [signerAddr, setSignerAddr] = useState()
  const [netIndex, setNetIndex] = useState(0)
  const [web3RPC, setWeb3RPC] = useState({
    id: 1,
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/qgntfG4-Q_3_4C7v6i0wg709xT8_-Fcc`,
    text: "Polygon Mainnet",
    chain: 137,
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
    isAPI: true,
    isAnkr: false,
    isAdded: true,
  })
  const [value, setValue] = useState(0) //for navigation b/w assetsbar and nftBar.....
  const [isLoader, setIsLoader] = useState(false)
  // setWeb3RPC(networkList[networkRPC]);
  const { getAll, add } = useIndexedDB(NETWORK_STORE)
  useEffect(() => {
    console.log("first one");
    const getNetwork = async () => {
      const res = await getAll()
      console.log(res)
      if (res.length === 0) {
        console.log("adding started....")
        for (let i = 0; i <= networkList.length; i++) {
          await add({
            rpc: networkList[i].rpc,
            text: networkList[i].text,
            chain: networkList[i].chain,
            symbol: networkList[i].symbol,
            isAPI: networkList[i].isAPI,
            isAnkr: networkList[i].isAnkr,
            isAdded: networkList[i].isAdded,
          }).then((data) => {
            return data
          })
        }
      }
      setAddTriggered((prev) => {
        return !prev
      })
    }
    getNetwork()
  }, [])
  useEffect(() => {
    console.log("second one");
    setDbData([])
    const getData = async () => {
      const res = await getAll();
      res.map((item) => {
        setDbData((prev) => {
          return [...prev, item]
        })
      })
    }
    getData()
  }, [])
  const {
    getAccountAddress,
    getAccountBalance,
    getNetworkDetails,
    getAccountNFTs,
    getContractInfo,
    transferNftGasEstimate,
    transferNft,
    transferMatic,
    provider,
    wallet,
  } = useAccount(web3RPC.rpc, privateKey, setIsLoader)
  const account = getAccountAddress()
  useEffect(() => {
    getAccount().then((res) => {
      if (res.privateKey === "") {
        setView("createAccount")
      } else {
        setPrivateKey(res.privateKey)
      }
    })
  }, [])
  //useEffect for fetching provider details, signer and signer Address
  useEffect(() => {
    const getCreds = async () => {
      const provider = new ethers.providers.JsonRpcProvider(web3RPC.rpc)
      const wallet = new ethers.Wallet(privateKey, provider) 
      console.log(wallet)
      setSignerAddr(wallet.address)
      setSigner(wallet)
    }
    getCreds()
  }, [web3RPC])
  return (
    <AccountContext.Provider
      value={{
        account,
        privateKey,
        setPrivateKey,
        view,
        setView,
        getAccountBalance,
        getNetworkDetails,
        getAccountNFTs,
        getContractInfo,
        transferNftGasEstimate,
        transferNft,
        transferMatic,
        // networkRPC,
        // setNetworkRPC,
        provider,
        wallet,
        web3RPC,
        balanceunit,
        setbalanceunit,
        signer,
        signerAddr,
        web3RPC,
        setWeb3RPC,
        value,
        setValue,
        isLoader,
        setIsLoader,
        dbData,
        setDbData,
      }}>
      {" "}
      {props.children}{" "}
    </AccountContext.Provider>
  )
}
export default AccountState