import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import investor from "../../Assets/investor.png"
import startup from "../../Assets/startup.png"
import { motion } from 'framer-motion'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'
const Join = () => {
    const textAnimation = {
        offscreen: { y: 100, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 3
            }
        }
    }
    return (
        <>
            <Navbar />
            <>
                <div className="investingcrd md:flex md:justify-between md:w-[90vw] mx-auto md:mt-[15vw] mb-[8vw] mt-[10vh] space-y-10 md:space-y-0">
                    <div className="investor w-[90vw] mx-auto md:w-auto">
                        <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-gray-700">
                            <img src={investor} alt="" className="w-[80px] h-[80px] mb-2 text-gray-500 dark:text-gray-400" />
                            <motion.h5 variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mt-12">I am an Investor !</motion.h5>
                            <motion.p variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-3 font-normal text-white text-left mt-10">Get access to thousands of verified startups to invest in & expand your investment portfolio.</motion.p>
                            <Link to="/join/investor"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold mt-12">Sign In</button></Link>
                        </div>
                    </div>
                    <div className="startup w-[90vw] mx-auto md:w-auto">
                        <div className="max-w-lg  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img src={startup} alt="" className="w-[80px] h-[80px] mb-2 text-gray-500 dark:text-gray-400" />
                            <motion.h5 variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mt-12">I am a Startup !</motion.h5>
                            <motion.p variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-3 font-normal text-gray-500 dark:text-white text-left mt-16">Get access to thousands of accredited investors & bring value added capital to your cap table.</motion.p>
                            <Link to="/join/startup"><button type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold mt-6">Sign In</button></Link>
                        </div>
                    </div>
                </div>
            </>
            <Footer />
        </>

    )
}

export default Join