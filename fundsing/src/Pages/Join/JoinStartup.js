import React from 'react'

const JoinStartup = () => {
    return (
        <>
            <fieldset>
                <legend className="sr-only">Checkbox variants</legend>
                <div className="flex items-center mb-4">
                    <input
                        defaultChecked=""
                        id="checkbox-1"
                        type="checkbox"
                        defaultValue=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="checkbox-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                    />
                    <label
                        htmlFor="checkbox-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                    />
                    <label
                        htmlFor="checkbox-3"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        I am 18 years or older
                    </label>
                </div>
                <div className="flex mb-4">
                    <div className="flex items-center h-5">
                        <input
                            id="helper-checkbox"
                            aria-describedby="helper-checkbox-text"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div className="ml-2 text-sm">
                        <label
                            htmlFor="helper-checkbox"
                            className="font-medium text-gray-900 dark:text-gray-300"
                        >
                            Free shipping via Flowbite
                        </label>
                        <p
                            id="helper-checkbox-text"
                            className="text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                            For orders shipped from $25 in books or $29 in other categories
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        id="international-shipping-disabled"
                        type="checkbox"
                        defaultValue=""
                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        disabled=""
                    />
                    <label
                        htmlFor="international-shipping-disabled"
                        className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                    >
                        Eligible for international shipping (disabled)
                    </label>
                </div>
            </fieldset>
        </>
    )
}

export default JoinStartup