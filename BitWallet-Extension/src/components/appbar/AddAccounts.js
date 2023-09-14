import React, { useState } from "react"
import { TextField } from "@mui/material"
import { FaTimes } from "react-icons/fa"
import Button from "@mui/material/Button"
import { Alert } from "@mui/material"
import AccountContext from "../../context/accountContext"
// import logo from "../images/BITlogo.png"
// import { useIndexedDB } from "react-indexed-db"
// import { NETWORK_STORE } from "../../utils/dbConfig"
export const AddAccounts = (props) => {
  const [slectedtab, setselectedtab] = useState(1)
  const [color1, setcolor1] = useState("blue")
  const [color2, setcolor2] = useState("")
  // const { add, getAll } = useIndexedDB(NETWORK_STORE) 
  // const [networkname,setnetworkname] = useState("");
  // const [networkname,setnetworkname] = useState("");
  // const [networkname,setnetworkname] = useState("");
  // const [networkname,setnetworkname] = useState("");
  // const [networkname,setnetworkname] = useState(""); 
  const account = React.useContext(AccountContext)
  return (
    <div className={`importtokenpage ${props.value === true ? "" : "hidden"}`}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="head">
        <div
          style={{ color: "white", fontSize: "22px", fontWeight: "800" }}
          className="heading">
          Networks{" "}
        </div>{" "}
        <div
          style={{ display: "flex" }}
          className="">
          <FaTimes
            onClick={() => {
              props.function(false)
            }}
            style={{
              marginTop: "auto",
              fontSize: "22px",
              fontWeight: "600",
              color: "red",
              cursor: "pointer",
            }}
          />{" "}
        </div>{" "}
      </div>{" "}
      <div
        style={{ marginTop: "2.5rem", justifyContent: "space-between", display: "flex" }}
        className="">
        <Button
          sx={{
            color: "white",
            width: "50%",
            background: `${color1}`,
          }}
          onClick={() => {
            setselectedtab(1)
            setcolor2("")
            setcolor1("blue")
          }}
          variant="text">
          {" "}
          Popular{" "}
        </Button>{" "}
        <Button
          sx={{
            color: "white",
            width: "50%",
            background: `${color2}`,
          }}
          onClick={() => {
            setselectedtab(2)
            setcolor1("")
            setcolor2("blue")
          }}
          variant="text">
          {" "}
          Custom Networks{" "}
        </Button>{" "}
      </div>{" "}
      <div className={`${slectedtab === 1 ? "" : "hidden"}`}>
        {
          account.dbData.map((item, idx) => {
            if (item.isAdded === false) {
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "450px",
                    margin: "auto",
                    marginTop: "1.5rem",
                  }}
                  className="">
                  <div
                    style={{ display: "flex" }}
                    className="">
                    <div
                      style={{ display: "flex" }}
                      className="name">
                      {" "}
                      {item.text}{" "}
                    </div>{" "}
                  </div>{" "}
                  <div
                    style={{ display: "flex", color: "blue", cursor: "pointer" }}
                    className="">
                    {" "}
                    ADD +{" "}
                  </div>{" "}
                </div>
              )
            }
          })
        }
      </div>{" "}
      <div
        className={`${slectedtab === 2 ? "" : "hidden"}`}
        style={{ marginTop: "1.5rem" }}>
        <Alert
          sx={{ borderRadius: "20px" }}
          variant="outlined"
          severity="info">
          A malicious network provider can lie about the state of blockchain and record
          your network activity.Only add custom networks you trust.{" "}
        </Alert>{" "}
        <div className="">
          <TextField
            style={{ width: "100%", marginTop: "0.4rem" }}
            id="outlined-basic"
            placeholder="Network Name (optional)"
            label="Network Name"
            variant="outlined"

          />
          <TextField
            style={{ width: "100%", marginTop: "0.3rem" }}
            id="outlined-basic"
            placeholder="New RPC Network"
            label="RPC Network"
            variant="outlined"
          />
          <TextField
            style={{ width: "100%", marginTop: "0.3rem" }}
            id="outlined-basic"
            label="Chain ID"
            variant="outlined"
          />
          <TextField
            style={{ width: "100%", marginTop: "0.3rem" }}
            id="outlined-basic"
            placeholder="Symbol (optional)"
            label="Symbol"
            variant="outlined"
          />
          <TextField
            style={{ width: "100%", marginTop: "0.3rem" }}
            id="outlined-basic"
            placeholder="Block Explorer URL (optional)"
            label="Block Explorer URL"
            variant="outlined"
          />
        </div>{" "}
        <div className="">
          <Button
            sx={{
              color: "white",
              width: "100%",
              marginTop: "1rem",
            }}
            variant="contained">
            {" "}
            Add{" "}
          </Button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  )
}




// props.data.map((item, idx) => {
            //   if (item.isAdded === false) {
            //     return (
            //       <>
            //         <div
            //           style={{ display: "flex" }}
            //           className="">
            //           <div
            //             style={{ display: "flex" }}
            //             className="name">
            //             {" "}
            //             Ethereum{" "}
            //           </div>{" "}
            //         </div>{" "}
            //         <div
            //           style={{ display: "flex", color: "blue", cursor: "pointer" }}
            //           className="">
            //           {" "}
            //           ADD +{" "}
            //         </div>{" "}
            //       </>
            //     )
            //   }
            // })
