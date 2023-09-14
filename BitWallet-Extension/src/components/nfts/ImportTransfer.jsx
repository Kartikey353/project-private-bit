import React, { useState } from "react"

const ImportTransfer = (props) => {
  const getData = (e) => {
    props.setSendNFT(true)
    props.setNFTId(props.nftId)
    props.setNFTContract(props.nftAddress)
    props.setDelDbId(props.dbId)
    props.setSendNFTImage(props.nftImage)
    console.log(props.dbId)
  }
  return (
    <>
      <div
        className="bg-gradient-to-br from-purple-800 to-blue-600 p-2 ml-2 my-2 rounded-md h-[100px] w-[100px] hover:cursor-pointer"
        onClick={getData}>
        <img
          className="h-full w-full"
          src={props.nftImage}
          alt=""
        />
      </div>
    </>
  )
}

export default ImportTransfer
