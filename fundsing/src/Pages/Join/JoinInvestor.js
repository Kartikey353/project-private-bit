import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import kartikey from '../../Assets/kartikey.jpeg'
import Footer from '../../Components/Footer/Footer' 
import { Link } from 'react-router-dom'
const JoinInvestor = () => {
    return (
        <>
            <Navbar />
            <div className="w-[100vw] h-[30vh] md:h-[20vw] bg-blue-700 shadow-xl">
                <h1 className='pt-[20vh] md:pt-[12vw] text-4xl font-bold text-center'>Welcome to Fundsing</h1>
            </div>
            <div className="w-full z-2 -mt-10 md:max-w-[80vw] mx-auto bg-white border border-white rounded-lg shadow text-black">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img
                        className="w-32 h-32 mb-3 rounded-full shadow-lg"
                        src={kartikey}
                        alt="Bonnie image"
                    />
                    <h5 className="mb-1 text-xl font-medium">
                        Kartikey Bhardwaj
                    </h5>
                    <span className="text-sm ">
                        Founder
                    </span>
                    <div className="mt-4 space-x-3 md:mt-6">
                        <p className="text-2xl font-bold text-center">Congratulations on taking the first step to becoming an Fundsing Angel</p>
                        <p className="text-center leading-[1.5]">At LetsVenture, we believe in enabling you to connect with founders who build disruptive startups and enable you to grow together within the ecosystem. Our focus has always been to do right by our founders while protecting our investors.
                            From finding the right startup, easing the commitment process to everything post-investment, let’s build the future of the Private markets together.</p>
                    </div>
                    <div className="mt-4 md:mt-6 ml-4 md:ml-6 mr-2 md:mr-4">
                        <h1 className='text-center text-black text-2xl font-bold'>Terms and Condition</h1>
                        <p className="text-left mt-4 md:mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quam at ex ducimus aperiam accusantium reprehenderit! Veritatis sit facere sequi fugit possimus sint. Nostrum nulla omnis id est, molestiae cumque fugiat laudantium ab numquam temporibus magnam rem distinctio odit modi. Earum et, id repudiandae qui voluptatibus quae consequuntur. Saepe dolorem unde laudantium aperiam quo optio quis nam eum facilis pariatur tenetur eaque repellendus natus voluptatibus commodi veniam ducimus voluptas animi placeat nesciunt dolorum reprehenderit voluptatum, cumque odio. Laboriosam iure consequatur vel quibusdam culpa sit harum doloremque distinctio, voluptatem atque aspernatur commodi, molestiae doloribus a repellat asperiores eum ipsa ad laudantium!</p>
                        <fieldset className='text-black mt-4 md:mt-6'>
                            <legend className="sr-only">Checkbox variants</legend>
                            <div className="flex items-center mb-4">
                                <input
                                    defaultChecked=""
                                    id="checkbox-1"
                                    type="checkbox"
                                    defaultValue=""
                                    required
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="checkbox-1"
                                    className="ml-2 text-sm font-medium"
                                >
                                    I agree to the{" "}
                                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                                        terms and conditions
                                    </a>
                                    .
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="checkbox-2"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    required                                
                                />
                                <label
                                    htmlFor="checkbox-2"
                                    className="ml-2 text-sm font-medium"
                                >
                                    I want to get promotional offers
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="checkbox-3"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    required
                                />
                                <label
                                    htmlFor="checkbox-3"
                                    className="ml-2 text-sm font-medium"
                                >
                                    I am 18 years or older
                                </label>
                            </div>
                        </fieldset>
                        <div className="text-center mt-4 md:mt-6">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-lg md:text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold"><Link to="/join/investor/registration">Let's<span className='text-gray-400 text-lg'> start Investing</span></Link></button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default JoinInvestor;