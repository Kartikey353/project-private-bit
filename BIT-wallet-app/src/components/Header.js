import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import { BiMenu } from "react-icons/bi";
import { AiOutlineCaretDown } from "react-icons/ai";
import { NETWORKS } from "../utils";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "../store/wallet/wallet-slice";
import { Addnetworks } from "./Addnetworks";
const Header = () => {
  const dispatch = useDispatch();
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [active, setActive] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [showmodal, setShowmodal] = useState(false);
  const [opennetworkpage, setopennetworkpage] = useState(false);
  const [symbol, setsymbol] = useState("MATIC");
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        if (!headerRef.current.contains(e.target)) {
          setActive(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const setLocalNetwork = async (val) => {
    localStorage.setItem("bit-current-network", JSON.stringify(val));
    dispatch(walletActions.setCurrentNetwork(val));
    setShowmodal(false);
  };

  return (
    <>
      <div className="w-full relative">
        <div className="w-full flex items-center justify-between">
          <button
            ref={headerRef}
            className="text-primary text-3xl"
            onClick={() => setActive((prev) => !prev)}
          >
            <BiMenu />
          </button>
          <button
            className="bg-[#1F1F20] border-2 border-[#7D7B7B] border-opacity-30 rounded-full px-8 py-2 grid grid-flow-col gap-2 justify-center items-center"
            onClick={() => setShowmodal((prev) => !prev)}
          >
            <p>{currentNetwork.text}</p>
            <div className="w-5 h-5 text-black text-sm rounded-full flex justify-center items-center bg-primary">
              <AiOutlineCaretDown />
            </div>
          </button>
          <Link to="/home">
            <img src={Logo} className="w-[50px]" alt="" />
          </Link>
        </div>
        <div
          className={`${showmodal ? "block" : "hidden"
            }  absolute top-[60px] shadow-2xl left-1/2 min-w-[300px] -translate-x-1/2  rounded-md bg-dark-400 z-50`}
        >
          {NETWORKS.map((val, i) => (
            <button
              key={i}
              className={`text-center block w-full px-2 py-3   uppercase ${i !== NETWORKS.length - 1 && "border-b border-gray-400"
                }`}
              onClick={() => {
                setLocalNetwork(val);
                // console.log("val = ",val.symbol); 
                setsymbol(val.symbol);
              }}
            >
              {val.text}
            </button>
          ))}
          <div className="p-4">
            <button
              onClick={() => {
                setopennetworkpage(true);
                setShowmodal((prev) => !prev)
              }}
              type="button"
              className="text-white bg-gradient-to-r w-full  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Add Network
            </button>
          </div>
        </div>

        <Sidebar
          className="z-10"
          active={active}
          setActive={setActive}
          menuRef={menuRef}
          account={account}
          symbol={symbol}
        />
        <Addnetworks
          value={opennetworkpage}
          function={setopennetworkpage}
        />
      </div>
    </>

  );
};

export default Header;
