/*global chrome*/
import ButtonAppBar from "./components/appbar/Appbar"
import "./App.css"
import config from "./config.json"
import AccountInfo from "./components/accountInfo/accountinfo"
import AccountBalance from "./components/accountbalance/accountbalance"
import SendReceive from "./components/sendrecieve/sendrecieve"
import Assetbar from "./components/assetbar/assetbar"
import CreateAccount from "./createAccount/createAccount"
import { getAccount } from "./components/scripts/accounts"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import AccountState from "./context/accountState"
import Assets from "./components/assets/assets"
import TokenData from "./context/Token/TokenData"
import Layout from "./components/layout/layout"
import { useEffect, useState } from "react"
import { DBConfig } from "./utils/dbConfig"
import { initDB } from "react-indexed-db"
import { Toaster } from "react-hot-toast"
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})
initDB(DBConfig)

function App() {
  return (
    <div className="appContainer">
      <div>
        {" "}
        <Toaster />{" "}
      </div>{" "}
      <ThemeProvider theme={darkTheme}>
        <AccountState>
          <TokenData>
            <Layout />
          </TokenData>{" "}
        </AccountState>{" "}
      </ThemeProvider>{" "}
    </div>
  )
}

export default App
