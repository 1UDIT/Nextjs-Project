'use client'

import { useState } from "react";
const ContactPop = ({ showModal, setShowModal }) => {
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [EmailAddress, setEmailaddress] = useState('');
    return (
        <> {
            showModal === true ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="relative p-6 flex-auto">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                    Your Name
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700
     border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
     focus:border-gray-500" id="grid-first-name" type="text" placeholder="Enter Your Name" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    Description
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Description"
                                                    value={Description} onChange={(e) => { setDescription(e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    Email
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Description"
                                                    value={Description} onChange={(e) => { setEmailaddress(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                onClick={(e) => { setShowModal(false); submitData(e) }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>

    )
}

export default ContactPop;