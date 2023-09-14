import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import NFTContainer from "../nfts/nftcontainer"
import Assets from "../assets/assets"
import AccountContext from "../../context/accountContext"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      className="px-4 py-2">
      {" "}
      {value === index && (
        <div>
          <p className="text-lg font-medium"> {children} </p>{" "}
        </div>
      )}{" "}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function Assetbar() {
  const account = useContext(AccountContext)
  const handleChange = (event, newValue, bool) => {
    console.log(newValue)
    account.setValue(newValue)
  }

  return (
    <>
      <div className="w-full bg-white">
        <div className="border-b border-gray-300">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center">
              <button
                className={`${
                  account.value === 0
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-500"
                } py-2 px-4 border-b-2 border-blue-500 font-semibold`}
                onClick={(e) => handleChange(e, 0)}>
                NFTs{" "}
              </button>{" "}
              <button
                className={`${
                  account.value === 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-500"
                } py-2 px-4 border-b-2 border-blue-500 font-semibold`}
                onClick={(e) => {
                  {
                    handleChange(e, 1)
                  }
                }}>
                Assets{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {parseInt(account.value) === 0 && <NFTContainer />}{" "}
      {parseInt(account.value) === 1 && <Assets />}{" "}
    </>
  )
}
