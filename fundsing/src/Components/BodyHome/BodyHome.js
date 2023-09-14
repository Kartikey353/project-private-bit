import React from 'react'
import spinner from "../../Assets/beautifull.gif"
import rocket from "../../Assets/rocket.gif"
import { FaLinkedin } from "react-icons/fa"
import { BsInstagram, BsTwitter } from "react-icons/bs"
import investor from "../../Assets/investor.png"
import startup from "../../Assets/startup.png"
import { motion, variants } from 'framer-motion';
import { Link } from 'react-router-dom'
const BodyHome = () => {

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

    const imageAnimation = {
        offscreen: { x: -1000 },
        onscreen: {
            x: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1
            }

        }
    }

    return (
        <>
            <motion.div className="text-center"
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true, amount: 1 }}
                transition={{ staggerChildren: 0.5 }}
            >
                <div className="text-center upperpart">
                    <div className="">
                        <img src={spinner} className="mx-auto" />
                    </div>
                    <motion.div variants={textAnimation}
                        initial={"offscreen"}
                        whileInView={"onscreen"}
                        viewport={{ once: true, amount: 1 }}
                        transition={{ staggerChildren: 0.5 }}
                        className='my-auto text-4xl font-bold md:-mt-[5vw]'>Let's <span className='text-gray-500 text-3xl'>Fundsing...</span></motion.div>
                    <div className="md:mt-[4vw] mt-[6vh]">
                        <motion.p variants={textAnimation}
                            initial={"offscreen"}
                            whileInView={"onscreen"}
                            viewport={{ once: true, amount: 1 }}
                            transition={{ staggerChildren: 0.5 }}
                            className="md:text-3xl font-bold text-2xl">Raise funding. Invest in startups. <br />
                            Secure & Transparent Technology platform <br /> <span className='text-lg text-gray-500'>With power of Blockchain Technology</span></motion.p>
                    </div>
                    <div className="buttons mt-5">
                        <Link to="/join/startup"><motion.button
                            whileHover={{
                                scale: 1.05
                            }}
                            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold">Join <span className='text-gray-400 text-lg'>to raise funds</span></motion.button></Link>
                        <Link to="/join/investor"> <motion.button
                            whileHover={{
                                scale: 1.05
                            }}
                            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold">Join <span className='text-gray-400 text-lg'>to invest</span></motion.button></Link>
                    </div>
                </div>
                <div className="w-[100vw] md:flex md:w-[90vw] mx-auto mt-14 bg-[#3f3355] rounded-lg">
                    <div className="lefthalf w-[100vw] md:w-[90vw] md:pr-10 md:pt-8 md:pl-6 md:pb-6 pr-4 pl-2 pt-3 pb-2">
                        <div className="uppertext md:text-5xl text-3xl">
                            <motion.h1 variants={textAnimation} initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="text-left md:leading-[1.2]">We are a technology first <br /> platform that make investing <br /> in startups <span className='font-bold'> secure, private, <br /> personalized & easy to use. </span> <br />
                                <span className='text-lg'>Your platform for building and investing in private markets.</span> <br />
                                <span>Connect. Disrupt. Grow.</span></motion.h1>
                        </div>
                        <div className="links mt-6 flex space-x-4">
                            <FaLinkedin className='text-2xl rounded' />
                            <BsInstagram className='text-2xl rounded' />
                            <BsTwitter className='text-2xl rounded' />
                        </div>
                    </div>
                    <div className="righthalf rounded-lg">
                        <img src={rocket} alt="" className="" />
                    </div>
                </div>

                <div className="investingcrd md:flex md:justify-between md:w-[90vw] mx-auto mt-14 space-y-10 md:space-y-0">
                    <motion.div
                        whileHover={{
                            scale: 1.05
                        }}
                        className="investor w-[90vw] mx-auto md:w-auto">
                        <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-gray-700">
                            <img src={investor} alt="" className="w-[80px] h-[80px] mb-2 text-gray-500 dark:text-gray-400" />
                            <motion.h5 variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mt-12">Are You Investor ?</motion.h5>
                            <motion.p variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-3 font-normal text-white text-left mt-10">Discover and Invest in curated startups. Get access to exclusive allocations and build your investment portfolio.</motion.p>
                            <Link to="/join/investor"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold mt-12">Join <span className='text-gray-400 text-lg'>to invest</span></button></Link>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{
                            scale: 1.05
                        }}
                        className="startup w-[90vw] mx-auto md:w-auto">
                        <div className="max-w-lg  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img src={startup} alt="" className="w-[80px] h-[80px] mb-2 text-gray-500 dark:text-gray-400" />
                            <motion.h5 variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mt-12">Are You Startup ?</motion.h5>
                            <motion.p variants={textAnimation}
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                viewport={{ once: true, amount: 1 }}
                                transition={{ staggerChildren: 0.5 }} className="mb-3 font-normal text-gray-500 dark:text-white text-left mt-10">Fundraise in STEALTH with your curated list of investors & access value-added capital. Bring all investors as a single entity in your cap table.</motion.p>
                            <Link to="/join/startup"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold mt-6">Join <span className='text-gray-400 text-lg'>to raise funds</span></button></Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default BodyHome