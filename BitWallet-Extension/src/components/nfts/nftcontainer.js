import * as React from "react"
import { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { getAccountNFTs } from "../scripts/accounts"
import NFTs from "./nfts"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import DownloadIcon from "@mui/icons-material/Download"
import NftContract from "./nftContract"
import AccountContext from "../../context/accountContext"
import { erc721Abi } from "../../utils/essentials"
import { ethers } from "ethers"
import { fileDownload } from "../scripts/tools"
import { NFTSTORE_EXT } from "../../utils/dbConfig"
import { useIndexedDB } from "react-indexed-db"
import ImportNft from "./ImportTransfer"
import { Toast, toast } from "react-hot-toast"

const Accordion = styled((props) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export default function NFTContainer() {
  const account = React.useContext(AccountContext)
  const [expanded, setExpanded] = React.useState("panel1")
  const [alchemyNftLength, setAlchemyNftLength] = useState(false)
  const [nftData, setNftData] = React.useState({})
  const [isImportNFT, setIsImportNFT] = useState(false)
  const [nftAnkr, setNftAnkr] = useState([])
  const [nftParams, setNftParams] = useState({
    nftAddr: "",
    nftId: "",
  })
  const [nftImage, setNftImage] = useState([])
  const [isSendNFT, setIsSendNFT] = useState(false)
  const [nftContract, setNftContract] = useState()
  const [sendNFTId, setSendNFTId] = useState()
  const [delDbId, setDelDbId] = useState()
  const [nftRecpAddr, setNftRecpAddr] = useState()
  const [sendNFTImage, setSendNFTImage] = useState()

  React.useEffect(() => {
    poppulatenfts()
  }, [account.web3RPC])
  const { getById, update, getAll, add, openCursor, clear, deleteRecord } =
    useIndexedDB(NFTSTORE_EXT)

  const poppulatenfts = () => {
    if (!account.web3RPC.isAnkr) {
      account.getAccountNFTs().then((res) => {
        res.ownedNfts.length > 0 && setAlchemyNftLength(true)
        if (res !== "Server error") {
          let mynftdata = {}
          res.ownedNfts.map((nft) => {
            mynftdata[nft.contract.address] = []
          })
          res.ownedNfts.map((nft) => {
            mynftdata[nft.contract.address].push({
              title: nft.title,
              description: nft.description,
              image: nft.media[0].raw,
              tokenId: nft.id.tokenId,
              contract: nft.contract.address,
              key: nft.contract.address + nft.id.tokenId,
            })
          })
          setNftData({ ...mynftdata })
        }
      })
    } else if (account.web3RPC.isAnkr) {
      if (account.web3RPC.isAPI) {
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: 1,
              jsonrpc: "2.0",
              method: "ankr_getNFTsByOwner",
              params: {
                blockchain: [account.web3RPC.ankrKeyWord],
                walletAddress: account.signerAddr,
              },
              pageSize: 20,
            }),
          }
          fetch("https://rpc.ankr.com/multichain/?ankr_getNFTsByOwner", requestOptions)
            .then((res) => res.json())
            .then((data) => {
              // console.log(data)
              const {
                result: { assets },
              } = data
              setNftAnkr(assets)
            })
        } catch (error) {
          toast.error("Try Again")
        }
      }
    }
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  /************************************** Custom NFTs Import LOGIC *********************************************/
  useEffect(() => {
    getAll().then((res) => {
      setNftImage([])
      res.map((item) => {
        if (item.nftNetworkId === account.web3RPC.chain) {
          setNftImage((prev) => {
            return [
              ...prev,
              {
                dbId: item.id,
                address: item.nftAddress,
                URI: item.nftURI,
                id: item.nftId,
                chainId: item.nftNetworkId,
                isSent: item.nftIsSent,
              },
            ]
          })
        }
      })
    })
  }, [isImportNFT, account.web3RPC])
  const handleParams = (e) => {
    const { value, name } = e.target
    setNftParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const importNFT = async () => {
    account.setIsLoader(true)
    const contract = new ethers.Contract(nftParams.nftAddr, erc721Abi, account.signer)
    // console.log(user.currentSigner);
    try {
      const res = await getAll()
      try {
        let nftExist = false
        for (let item of res) {
          if (
            nftParams.nftId === item.nftId &&
            account.web3RPC.chain === item.nftNetworkId
          ) {
            account.setIsLoader(false)
            toast.error("NFT already exists")
            nftExist = true
            break
          }
        }
        if (!nftExist) {
          const isOwner = await contract.ownerOf(nftParams.nftId)
          if (isOwner === account.signerAddr) {
            const imageURI = await contract.tokenURI(nftParams.nftId)
            console.log(imageURI)
            try {
              fetch(imageURI)
                .then((res) => res.json())
                .then((data) => {
                  console.log(data)
                  try {
                    add({
                      nftAddress: nftParams.nftAddr,
                      nftURI: data.image,
                      nftId: nftParams.nftId,
                      nftNetworkId: account.web3RPC.chain,
                    })
                    toast.success("Successfully Added")
                    account.setIsLoader(false)
                    setIsImportNFT(false)
                  } catch (error) {
                    console.log(`Error during storing in DB:${error}`)
                    account.setIsLoader(false)
                    toast.error("Try Again")
                  }
                })
            } catch (error) {
              account.setIsLoader(false)
              toast.error("Try Again")
            }
          } else {
            account.setIsLoader(false)
            toast.error("Invalid Owner")
          }
        }
      } catch (error) {
        account.setIsLoader(false)
        toast.error("Try Again")
      }
    } catch (error) {
      account.setIsLoader(false)
      toast.error("Try Again")
    }
    setNftParams({
      nftAddr: "",
      nftId: "",
    })
  }
  const sendNFT = async () => {
    account.setIsLoader(true)
    const contract = new ethers.Contract(nftContract, erc721Abi, account.signer)
    try {
      const send = await contract.transferFrom(account.signerAddr, nftRecpAddr, sendNFTId)
      console.log(send)
      console.log("NFT sent successfullyy...")

      try {
        const delData = await deleteRecord(delDbId)
        console.log(delData)
        toast.success("Successfully Sent")
        account.setValue(1)
      } catch (error) {
        console.log(`Error while deleting form DB:${error}`)
        toast.error("Try Again")
        account.setIsLoader(false)
      }
    } catch (error) {
      console.log(`Error occured while sending NFT ${error}`)
      toast.error("Try Again")
      account.setIsLoader(false)
    }
    account.setIsLoader(false)
  }

  return account.web3RPC.isAPI ? (
    !account.web3RPC.isAnkr ? (
      alchemyNftLength ? (
        <div>
          {" "}
          {Object.keys(nftData).map((contract) => {
            return (
              <Accordion
                expanded={expanded === contract}
                onChange={handleChange(contract)}
                key={contract}>
                <AccordionSummary
                  ariaControls="panel1d-content"
                  id="panel1d-header">
                  <NftContract contract={contract} />{" "}
                </AccordionSummary>{" "}
                <AccordionDetails>
                  <NFTs nfts={nftData[contract]} />{" "}
                </AccordionDetails>{" "}
              </Accordion>
            )
          })}{" "}
        </div>
      ) : (
        <div className="flex justify-center ">
          <p className="text-4xl font-bold mt-4 flex self-center text-gray-800 mb-4 animate-pulse">
            {" "}
            No NFTs Found{" "}
          </p>{" "}
        </div>
      )
    ) : isSendNFT ? (
      <div className="parent flex">
        <div className="inp-cont m-auto my-7 flex-col justify-center">
          <input
            name="recpAddr"
            type="text"
            value={nftRecpAddr}
            onChange={(e) => setNftRecpAddr(e.target.value)}
            placeholder="0x... (Recipient Address)"
            className="bg-gray-50 border border-gray-300 h-10 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 caret-blue-500 text-lg mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-lg placeholder:font-bold"
          />{" "}
          {account.isLoader ? (
            <>
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
              </button>{" "}
            </>
          ) : (
            <button
              onClick={() => {
                account.transferNft(nftContract, sendNFTId, nftRecpAddr)
              }}
              className={
                "text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              }>
              Send NFT{" "}
            </button>
          )}{" "}
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            onClick={() => {
              fileDownload(sendNFTImage)
              console.log(sendNFTImage)
            }}>
            <DownloadIcon />
          </IconButton>{" "}
        </div>{" "}
        <button
          type="button"
          onClick={() => {
            setIsSendNFT(false)
            setNftRecpAddr("")
            account.setIsLoader(false)
          }}
          className="text-white h-fit bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 mt-5 mr-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          X{" "}
        </button>{" "}
      </div>
    ) : nftAnkr.length > 0 ? (
      <div>
        <div className="flex flex-wrap mx-2 max-h-[500px] h-50 overflow-y-auto ">
          {" "}
          {nftAnkr.map((item, index) => {
            return (
              <div
                className="bg-gradient-to-br from-purple-800 to-blue-600 p-2 ml-2 my-2 rounded-md h-[100px] w-[100px] hover:cursor-pointer"
                onClick={() => {
                  setIsSendNFT(true)
                  setSendNFTId(item.tokenId)
                  setNftContract(item.contractAddress)
                  setSendNFTImage(item.imageUrl)
                  // console.log(item.contractAddress, item.tokenId)
                }}
                id={index}>
                <img
                  className="h-full w-full"
                  src={item.imageUrl}
                  alt=""
                />
              </div>
            )
          })}{" "}
        </div>{" "}
      </div>
    ) : (
      <>
        <div className="flex justify-center ">
          <p className="text-4xl font-bold mt-4 flex self-center text-gray-800 mb-4 animate-pulse">
            {" "}
            No NFTs Found{" "}
          </p>{" "}
        </div>{" "}
      </>
    )
  ) : (
    <>
      {" "}
      {isImportNFT ? (
        <>
          <div className="flex flex-col  items-center my-3">
            <button
              type="button"
              onClick={() => {
                setIsImportNFT(false)
                setNftParams({
                  nftAddr: "",
                  nftId: "",
                })
                account.setIsLoader(false)
              }}
              className="text-white bg-red-700 self-end hover:bg-red-800 focus:outline-none focus:ring-4 w-fit focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              X{" "}
            </button>{" "}
            <input
              id="ContractAddress"
              name="nftAddr"
              type="text"
              onChange={handleParams}
              maxLength={42}
              minLength={42}
              required
              value={nftParams.nftAddr}
              placeholder="Contract Address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 my-4  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              id="token Id"
              name="nftId"
              type="text"
              onChange={handleParams}
              value={nftParams.nftId}
              placeholder="Token Id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />{" "}
            {account.isLoader ? (
              <button
                type="button"
                class="flex items-center my-3 self-center rounded-lg bg-gradient-to-br disabled: from-purple-600 to-blue-500 px-4 py-2 text-white"
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
              <button
                type="submit"
                onClick={importNFT}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none my-3 self-center focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Import NFT{" "}
              </button>
            )}{" "}
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          {nftImage.length > 0 ? (
            <>
              {" "}
              {isSendNFT ? (
                <>
                  <div className="parent flex">
                    <div className="inp-cont m-auto my-7 flex-col justify-center">
                      <input
                        name="recpAddr"
                        type="text"
                        value={nftRecpAddr}
                        onChange={(e) => setNftRecpAddr(e.target.value)}
                        placeholder="0x... (Recipient Address)"
                        className="bg-gray-50 border border-gray-300 h-10 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 caret-blue-500 text-lg mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-lg placeholder:font-bold"
                      />{" "}
                      {account.isLoader ? (
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
                        <button
                          type="submit"
                          onClick={sendNFT}
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none my-3 self-center focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                          Send NFT{" "}
                        </button>
                      )}{" "}
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        onClick={() => fileDownload(sendNFTImage)}>
                        <DownloadIcon />
                      </IconButton>{" "}
                    </div>{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSendNFT(false)
                        setNftRecpAddr("")
                        account.setIsLoader(false)
                      }}
                      className="text-white h-fit bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 mt-5 mr-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      X{" "}
                    </button>{" "}
                  </div>{" "}
                </>
              ) : (
                <div className="flex flex-col py-3">
                  <div className="flex mx-2 max-h-[500px] h-28 overflow-y-auto ">
                    {" "}
                    {nftImage.map((asset, index) => {
                      return (
                        <ImportNft
                          id={index}
                          dbId={asset.dbId}
                          nftImage={asset.URI}
                          nftAddress={asset.address}
                          nftId={asset.id}
                          nftChain={asset.chainId}
                          setSendNFT={setIsSendNFT}
                          setNFTId={setSendNFTId}
                          setNFTContract={setNftContract}
                          setDelDbId={setDelDbId}
                          setSendNFTImage={setSendNFTImage}
                        />
                      )
                    })}{" "}
                  </div>{" "}
                </div>
              )}{" "}
            </>
          ) : (
            <>
              <div className="flex justify-center ">
                <p className="text-4xl font-bold mt-4 flex self-center text-gray-800 mb-4 animate-pulse">
                  {" "}
                  No NFTs Found{" "}
                </p>{" "}
              </div>{" "}
            </>
          )}{" "}
          <div className="flex flex-col items-center pb-4 pt-5">
            <p className="text-white"> Don 't see your NFTs</p>{" "}
            <button
              onClick={() => {
                setIsImportNFT(true)
              }}
              className="text-sky-500">
              Import NFTs{" "}
            </button>{" "}
          </div>{" "}
        </>
      )}{" "}
    </>
  )
}
