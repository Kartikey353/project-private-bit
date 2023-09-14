import React from 'react'
import { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
const InvestorRegistration = () => {
    const [partofregistration, setpartofregistration] = useState(1);
    const [styleofpart1, setstyleofpart1] = useState('mt-8 p-4 part 1');
    const [styleofpart2, setstyleofpart2] = useState('mt-8 p-4 part 2 hidden');
    const [styleofpart3, setstyleofpart3] = useState('mt-8 p-4 part 3 hidden');
    const [styleofpart4, setstyleofpart4] = useState('mt-8 p-4 part 4 hidden');
    const [styleofscrollbar1, setstyleofscrollbar1] = useState('flex-auto border-t-2 transition duration-500 ease-in-out');
    const [styleofscrollbar2, setstyleofscrollbar2] = useState('flex-auto border-t-2 transition duration-500 ease-in-out');
    const [styleofscrollbar3, setstyleofscrollbar3] = useState('flex-auto border-t-2 transition duration-500 ease-in-out');
    const [styleoficon1, setstyleoficon1] = useState('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-500  border-gray-600');
    const [styleoficon2, setstyleoficon2] = useState('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-gray-300  border-gray-600');
    const [styleoficon3, setstyleoficon3] = useState('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-gray-300  border-gray-600');
    const [styleoficon4, setstyleoficon4] = useState('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-gray-300  border-gray-600');

    function setcursorprevious() {
        if (partofregistration === 2) {
            setstyleofpart2('mt-8 p-4 part 4 hidden')
            setstyleofscrollbar1('flex-auto border-t-2 transition duration-500 ease-in-out');
            setstyleoficon2('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-gray-300  border-gray-600');
            setstyleofpart1('mt-8 p-4 part 3')

        } else if (partofregistration === 3) {
            setstyleofpart3('mt-8 p-4 part 4 hidden')
            setstyleofscrollbar2('flex-auto border-t-2 transition duration-500 ease-in-out');
            setstyleoficon3('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-gray-300  border-gray-600');
            setstyleofpart2('mt-8 p-4 part 3')

        } else {
            setstyleofpart4('mt-8 p-4 part 4 hidden')
            setstyleofscrollbar3('flex-auto border-t-2 transition duration-500 ease-in-out');
            setstyleoficon4('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-gray-300  border-gray-600');
            setstyleofpart3('mt-8 p-4 part 3')
        }
        setpartofregistration(partofregistration - 1);
    }
    function setcursornext() {
        console.log("next");
        if (partofregistration === 1) {

            setstyleofpart1('mt-8 p-4 part 1 hidden');
            setstyleoficon2('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-500  border-gray-600');
            setstyleofscrollbar1('flex-auto border-t-2 transition duration-500 ease-in-out border-teal-500');
            setstyleofpart2('mt-8 p-4 part 2');

        } else if (partofregistration === 2) {
            setstyleofpart2('mt-8 p-4 part 1 hidden');
            setstyleoficon3('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-500  border-gray-600');
            setstyleofscrollbar2('flex-auto border-t-2 transition duration-500 ease-in-out border-teal-500');
            setstyleofpart3('mt-8 p-4 part 2');

        } else {
            setstyleofpart3('mt-8 p-4 part 1 hidden');
            setstyleoficon4('rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-500  border-gray-600');
            setstyleofscrollbar3('flex-auto border-t-2 transition duration-500 ease-in-out border-teal-500');
            setstyleofpart4('mt-8 p-4 part 2');
        }
        setpartofregistration(partofregistration + 1);
    }
    return (
        <>
            <Navbar />
            <div className="mt-20 md:mt-40 bg-white md:w-[90vw] mx-auto rounded">
                <div className="p-5">
                    <div className="mx-4 p-4">
                        <div className="flex items-center">
                            <div className="flex items-center text-white relative">
                                <div className={styleoficon1}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-bookmark "
                                    >
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                                    Personal
                                </div>
                            </div>
                            <div className={styleofscrollbar1} />
                            <div className="flex items-center text-white relative">
                                <div className={styleoficon2}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-user-plus "
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <line x1={20} y1={8} x2={20} y2={14} />
                                        <line x1={23} y1={11} x2={17} y2={11} />
                                    </svg>
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                                    Account
                                </div>
                            </div>
                            <div className={styleofscrollbar2} />
                            <div className="flex items-center text-white relative">
                                <div className={styleoficon3}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-key"
                                    >
                                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
                                    Password
                                </div>
                            </div>
                            <div className={styleofscrollbar3} />
                            <div className="flex items-center text-white relative">
                                <div className={styleoficon4}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-database "
                                    >
                                        <ellipse cx={12} cy={5} rx={9} ry={3} />
                                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
                                    Confirm
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------ */}



                    <div className={styleofpart1}>
                        <div>
                            <div className="font-bold text-black text-xs leading-8 uppercase h-6 mx-2 mt-3">
                                Full Name
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="First Name"
                                            className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                        />{" "}
                                    </div>
                                </div>
                                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="Last Name"
                                            className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                        />{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Username
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="Just a hint.."
                                            className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                        />{" "}
                                    </div>
                                </div>
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Your Email
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="jhon@doe.com"
                                            className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                        />{" "}
                                    </div>
                                </div>
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Mobile No
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="mobile number"
                                            className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                        />{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Country
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="Eg-India"
                                            className="p-1 px-2 appearance-none outline-none w-full text-black"
                                            type="number"
                                        />{" "}
                                    </div>
                                </div>
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Pincode
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="Eg- 201204"
                                            className="p-1 px-2 appearance-none outline-none w-full text-black"
                                            type="text"
                                        />{" "}
                                    </div>
                                </div>
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        State
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder="Eg- UTTARPARDESH"
                                            className="p-1 px-2 appearance-none outline-none w-full text-black"
                                            type="text"
                                        />{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Full Address
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <textarea
                                            placeholder=" "
                                            className="p-1 px-2 appearance-none outline-none w-full text-black"
                                            type="text"
                                        />{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex p-2 mt-4">
                            <div className="flex-auto flex flex-row-reverse">
                                <button
                                    onClick={setcursornext}
                                    className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                             hover:bg-teal-600  
                                             bg-teal-600 
                                             text-teal-100 
                                               border duration-200 ease-in-out 
                                             border-teal-600 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ----------------------------------------------------------- */}


                    <div className={styleofpart2}>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                    {" "}
                                    Wallet
                                </div>
                                <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                    <select
                                        placeholder="Just a hint.."
                                        className="p-1 px-2  outline-none w-full text-black"
                                    >
                                        <option> Metamask</option>
                                        <option> Polygon</option>
                                        <option> Rainbow</option>
                                        <option> opera crypto</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                    {" "}
                                    Your wallet address (public)
                                </div>
                                <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                    <input
                                        placeholder="jhon@doe.com"
                                        className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                    />{" "}
                                </div>
                            </div>
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                    {" "}
                                    Email-Id associated with wallet
                                </div>
                                <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                    <input
                                        placeholder="mobile number"
                                        className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                    />{" "}
                                </div>
                                <div className="text-black">If not have? <a href="/" className="text-blue-400 underline">click here</a></div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                    {" "}
                                    Have assets more than worth 2Lacs(INR)
                                </div>
                                <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                    <select
                                        placeholder="Just a hint.."
                                        className="p-1 px-2  outline-none w-full text-black"
                                    >
                                        <option> YES</option>
                                        <option> NO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                    {" "}
                                    Already a investor
                                </div>
                                <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                    <select
                                        placeholder="Just a hint.."
                                        className="p-1 px-2  outline-none w-full text-black"
                                    >
                                        <option> YES</option>
                                        <option> NO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Enter indentification card number
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input
                                            placeholder=""
                                            className="p-1 px-2 appearance-none  outline-none w-full text-black"
                                        />{" "}
                                    </div>
                                </div>
                                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                    <div className="font-bold h-6 mt-3 text-black text-xs leading-8 uppercase">
                                        {" "}
                                        Upload file
                                    </div>
                                    <div className="bg-white my-2 p-1 flex border border-gray-400 rounded svelte-1l8159u">
                                        <input type="file" aria-describedby="user_avatar_help"
                                            className='w-full text-sm  border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none   dark:placeholder-gray-400' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-auto flex flex-row-reverse">
                            <button
                                className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                             hover:bg-teal-600  
                                             bg-teal-600 
                                             text-teal-100 
                                               border duration-200 ease-in-out 
                                             border-teal-600 transition"
                                onClick={setcursorprevious}
                            >
                                Previous
                            </button>
                            <button
                                onClick={setcursornext}
                                className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                             hover:bg-teal-600  
                                             bg-teal-600 
                                             text-teal-100 
                                               border duration-200 ease-in-out 
                                             border-teal-600 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* ----------------------------------------------- */}
                    <div className={styleofpart3}>
                        <div className="w-full mx-auto max-w-sm p-4 bg-white border mt-8 shadow-xl border-gray-200 rounded-lg sm:p-6 md:p-8 ">
                            <form className="space-y-6" action="#">
                                <h5 className="text-xl font-medium text-black">Create Password</h5>
                                <div>
                                    <label for="email" className="block mb-2 text-sm  text-gray-900 font-semibold">Password</label>
                                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm  text-gray-900 font-semibold">Confirm password</label>
                                    <input type="password" name="password" id="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Save password</button>
                                <button type="submit" className="w-full text-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={setcursorprevious}>Previous</button>
                                <button onClick={setcursornext} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Next</button>
                            </form>
                        </div>
                    </div>

                    {/* ------------------------------------------------------ */}

                    <div className={styleofpart4}>
                        <div className="md:flex md:justify-between  mt-8">
                            <div class="w-full max-w-xs mx-auto mt-5 md:mt-0 mb-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-gradient-to-br from-teal-500 to-green-500">
                                <h5 class="mb-4 text-xl font-medium text-black">Free plan</h5>
                                <div class="flex items-baseline text-black">
                                    <span class="text-3xl font-semibold">$</span>
                                    <span class="text-5xl font-extrabold tracking-tight">0</span>
                                    <span class="ml-1 text-xl font-normal text-black">/month</span>
                                </div>

                                <ul role="list" class="space-y-5 my-7">
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">2 team members</span>
                                    </li>
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">upto 7Lac(INR) investment</span>
                                    </li>
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">Integration help</span>
                                    </li>
                                    <li class="flex space-x-3  decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">Daily Update</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">sketch files</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">Complete documentation</span>
                                    </li>
                                    <li class="flex space-x-3  decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-bold leading-tight text-black">24×7 phone & email support</span>
                                    </li>
                                </ul>
                                <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                            </div>

                            <div class="w-full max-w-xs mx-auto mb-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-gradient-to-br from-teal-500 to-green-500">
                                <h5 class="mb-4 text-xl font-medium text-black">Standard plan</h5>
                                <div class="flex items-baseline text-black">
                                    <span class="text-3xl font-semibold">$</span>
                                    <span class="text-5xl font-extrabold tracking-tight">49</span>
                                    <span class="ml-1 text-xl font-normal text-black">/month</span>
                                </div>

                                <ul role="list" class="space-y-5 my-7">
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">unlimit team members</span>
                                    </li>
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">20GB Cloud storage</span>
                                    </li>
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">Integration help</span>
                                    </li>
                                    <li class="flex space-x-3  decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-black">Sketch Files</span>
                                    </li>
                                    <li class="flex space-x-3  decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-black">Daily Updates</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">Complete documentation</span>
                                    </li>
                                    <li class="flex space-x-3  decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-black">24×7 phone & email support</span>
                                    </li>
                                </ul>
                                <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                            </div>



                            <div class="w-full max-w-xs mx-auto mb-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 bg-gradient-to-br from-teal-500 to-green-500">
                                <h5 class="mb-4 text-xl font-medium text-black">Standard plan</h5>
                                <div class="flex items-baseline text-black">
                                    <span class="text-3xl font-semibold">$</span>
                                    <span class="text-5xl font-extrabold tracking-tight">49</span>
                                    <span class="ml-1 text-xl font-normal text-black">/month</span>
                                </div>

                                <ul role="list" class="space-y-5 my-7">
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">2 team members</span>
                                    </li>
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">20GB Cloud storage</span>
                                    </li>
                                    <li class="flex space-x-3">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base  leading-tight text-black font-bold">Integration help</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">Sketch Files</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">API Access</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">Complete documentation</span>
                                    </li>
                                    <li class="flex space-x-3 line-through decoration-gray-500">

                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                        <span class="text-base font-normal leading-tight text-gray-500">24×7 phone & email support</span>
                                    </li>
                                </ul>
                                <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                            </div>

                        </div>
                        <button onClick={setcursorprevious} type="submit" className="w-full text-teal-500 font-bold rounded-lg text-lg px-5 py-2.5 text-center border border-teal-500 hover:bg-teal-500 hover:text-white ">Previous</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default InvestorRegistration;