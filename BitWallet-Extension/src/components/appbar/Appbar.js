import * as React from "react"
import { useEffect, useState } from "react"
import { useIndexedDB } from "react-indexed-db"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import logo from "../images/BITlogo.png"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Sidebar from "../sidebar/sidebar"
import AccountContext from "../../context/accountContext"
import { networkList } from "../../utils/chain"
import { AddAccounts } from "./AddAccounts"
export default function ButtonAppBar() {
  const account = React.useContext(AccountContext)
  const [sidebar, setSidebar] = React.useState(false)
  const [network, setNetwork] = React.useState()
  const [addnetworks, setaddnetworks] = React.useState(false)
  const [idx, setidx] = useState(0);
  function handelChange() {  
    console.log(account.dbdata);
    console.log(account.dbData[idx].text)
    setNetwork(account.dbData[idx].text)
    account.setWeb3RPC(account.dbData[idx])
  }
  // useEffect(() => {
  //   handelChange();
  // }, [idx])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ paddingTop: "20px" }}>
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            ariaLabel="menu"
            sx={{ mr: 2 }}
            onClick={() => setSidebar(true)}>
            <MenuIcon />
          </IconButton>{" "}
          <Sidebar
            state={sidebar}
            setState={setSidebar}
          />{" "}
          <FormControl fullWidth={false}>
            <InputLabel id="demo-simple-select-label"> Network </InputLabel>{" "}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={network}
              label="Network"
              onChange={handelChange}
            >
              {
                account.dbData.map((item, idx) => {
                  if (item.isAdded === true) {
                    return (
                      <MenuItem
                        onClick={() => {
                          setidx(idx); 
                          console.log(account.dbData[0].text); 
                          setNetwork(account.dbData[idx].text);
                          account.setWeb3RPC(account.dbData[idx])
                        }}
                        key={idx} value={item.key}>{item.text}</MenuItem>
                    )
                  }
                })
              }
              <div
                style={{ background: "blue", margin: "0.7rem", borderRadius: "50px" }}
                className="">
                <MenuItem
                  onClick={() => {
                    setaddnetworks(true)
                  }}
                  sx={{ borderRadius: "50px" }}
                  value={"Add Networks"}>
                  {" "}
                  Add Networks{" "}
                </MenuItem>{" "}
              </div>{" "}
            </Select>{" "}
          </FormControl>{" "}
          <Button
            color="inherit"
            onClick={() => {
              window.open("https://beimagine.tech")
              // window.open('/');
            }}>
            {" "}
            <img
              src={logo}
              className="h-20"
            />{" "}
          </Button>{" "}
        </Toolbar>{" "}
      </AppBar>{" "}
      <AddAccounts
        value={addnetworks}
        function={setaddnetworks}
      />{" "}
    </Box >
  )
}
