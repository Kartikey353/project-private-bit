import React, { useState } from 'react'
import { FaTimes } from "react-icons/fa";
import ethereum from "../assets/ethereum.svg"
export const Addnetworks = (props) => {
    const [selectedteb, setselectedtab] = useState(1);
    return (
        <div className={`absolute top-[-100%] z-30 w-full h-[101vh] bg-[#141414] ${props.value === true ? "" : "hidden"}`}>
            <div className="flex justify-between mt-6">
                <div className="head text-2xl font-semibold flex">
                    Networks
                </div>
                <div className="flex my-auto text-2xl">
                    <FaTimes
                        onClick={() => {
                            props.function(false);
                        }} />
                </div>
            </div>
            <div className="choose flex mt-4 text-sm uppercase justify-between">
                <div
                    onClick={() => {
                        setselectedtab(1);
                    }}
                    className={`w-[50%] flex justify-center hover:cursor-pointer ${selectedteb === 1 ? "border-b-blue-500 border-b-2" : ""}`}>
                    popular
                </div>
                <div
                    onClick={() => {
                        setselectedtab(2);
                    }}
                    className={`w-[50%] flex hover:cursor-pointer ${selectedteb === 2 ? "border-b-blue-500 border-b-2" : ""} justify-center`}>
                    custom network
                </div>
            </div>
            <div className="mt-6">
                {
                    selectedteb === 1 ?
                        <div className="flex justify-between p-5">
                            <div className="flex space-x-4">
                                <div className="img">
                                    <img src={ethereum} className="w-5" alt="" />
                                </div>
                                <div className="name my-auto">
                                    Ethereum
                                </div>
                            </div>
                            <div className="my-auto text-blue-400 hover:cursor-pointer">
                                <div className="add">Add +</div>
                            </div>
                        </div>
                        :
                        <div className="w-full max-w-sm mx-auto rounded-lg shadow">
                            <div
                                className="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                                role="alert"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Info alert!</span> Change a few things up and
                                    try submitting again.
                                </div>
                            </div>

                            <form className="space-y-4 mx-auto" action="#">
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Network Name
                                    </label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required=""
                                        placeholder='Network name (optional)'
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        RPC Url
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="New RPC Network"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Chain Id
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Chain Id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Symbol
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Symbol (optional)"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Block Explorer URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Block Explorer URL (optional)"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <div className="pt-[10px]">
                                    <button
                                        type="submit"
                                        className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}
