import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Navbar = () => {


    const [navbardownstate, setnavbardownstate] = useState(false);
    const [stylenavbarlistitemdiv, setstylenavbarlistitemdiv] = useState('hidden items-center justify-between  w-full md:flex md:w-auto md:order-1');
    const [stylenavbarlistbutton, setstylenavbarlistbutton] = useState('hidden');
    const [stylenavbarlistitems, setstylenavbarlistitems] = useState('flex flex-col p-4 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0');
    const [stylenavbarlistitem, setstylenavbarlistitem] = useState('block py-2 pl-3 pr-4 text-xl  rounded md:bg-transparent md:p-0 link-underline link-underline-black')

    function setstyle(state) {

        if (state === true) {
            setstylenavbarlistbutton('text-white md:hidden justify-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2');
            setstylenavbarlistitemdiv('text-center w-full font-bold  bg-black');
            setstylenavbarlistitem('block py-2 pl-3 pr-4 text-xl shadow-sm  rounded  md:p-0 link-underline link-underline-black');
            setstylenavbarlistitems('space-y-3 flex flex-col p-4 mt-4 shadow-xl  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0');
        }

        else {
            setstylenavbarlistitemdiv('hidden');
        }


    }

    const navbarclicked = () => {
        if (navbardownstate === false)
            setnavbardownstate(true);
        else
            setnavbardownstate(false);
        setstyle(navbardownstate);

    }
    return (
        <>
            <nav className="px-2 sm:px-4 py-2.5 fixed w-full top-0 z-10 left-0 bg-black">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <logo className="flex items-center">
                        <span className="self-center text-3xl font-bold whitespace-nowrap">
                            Fundsing
                        </span>
                    </logo>
                    <div className="flex md:order-2">
                        <Link to="/"><button type="button" className="text-white md:hidden justify-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-500 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">Explore</button></Link>
                        <Link to="/signin"><motion.button
                            whileHover={{
                                scale: 1.05
                            }}
                            type="button" className="text-white hidden md:flex bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">Sign In</motion.button></Link>
                        <Link to="/join"><motion.button
                            whileHover={{
                                scale: 1.05
                            }}
                            type="button" className="text-white hidden md:flex font-medium bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2">Sign Up</motion.button></Link>
                        <button
                            type="button"
                            onClick={navbarclicked}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                        >
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={stylenavbarlistitemdiv}
                        id="navbar-sticky"
                    >
                        <ul className={stylenavbarlistitems}>
                            <li>
                                <Link to="/"
                                    className={stylenavbarlistitem}
                                >
                                    Investor
                                </Link>
                            </li>
                            <li>
                                <Link to="/"
                                    className={stylenavbarlistitem}
                                >
                                    Founder
                                </Link>
                            </li>
                            <li>
                                <Link to="/"
                                    className={stylenavbarlistitem}
                                >
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className={stylenavbarlistitem}
                                >
                                    Explore
                                </Link>
                            </li>
                            <Link to="/signin"><button
                                type="button" className={stylenavbarlistbutton}>Sign In</button></Link>
                            <Link to="/join"><button type="button" className={stylenavbarlistbutton}>Sign Up</button></Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;