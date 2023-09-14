import React from 'react'
import kartikey from "../../Assets/kartikey.jpeg"
const Dashboard = () => {
    return (
        <>
            <div className="bg-black w-[100vw] h-[100vh]">
                <div className="navbar bg-black">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">Fundsing</a>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered" />
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={kartikey} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow-3xl menu menu-compact dropdown-content bg-base-300  rounded-box w-52 space-y-3">
                                <h1 className="p-3">Name</h1>
                                <hr />
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li><a>Invest History</a></li>
                                <li><a>Account</a></li>
                                <li><a className='justify-between'>Notification  <span className="badge">New</span></a></li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="">
                    <div className="upperhalf">
                        <div className="progress">
                          
                        </div>
                        <div className="accountinfo">

                        </div>
                    </div>
                    <div className="lowerhalf">
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard