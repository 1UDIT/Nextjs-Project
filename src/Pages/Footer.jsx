'use client'
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai"
import { useState } from "react";
import dynamic from "next/dynamic";
const ContactpopUp = dynamic(() => import('@/Components/ContactpopUp'));
const Footer = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <footer className="relative   pt-8 pb-6 text-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl fonat-semibold text-blueGray-700">Let&apos;s keep in touch!</h4>
                        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                            Find us on any of these platforms, we respond 1-2 business days.
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6">
                            <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" aria-label="Twitter">
                                <BsTwitter style={{ color: "black", display: "block", marginLeft: "auto", marginRight: "auto", fontSize: "20px" }} /></button>
                            <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" aria-label="Faccebook">
                                <FaFacebookF style={{ color: "black", display: "block", marginLeft: "auto", marginRight: "auto", fontSize: "20px" }} /></button>
                            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" aria-label="Github">
                                <AiFillGithub style={{ color: "black", display: "block", marginLeft: "auto", marginRight: "auto", fontSize: "20px" }} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/1UDIT">About Us</a>
                                    </li>
                                    <li>
                                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/News">Blog</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm cursor-pointer" onClick={() => setShowModal(true)}>Contact Us</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
            </div>
            <ContactpopUp showModal={showModal} setShowModal={setShowModal} />
        </footer>
    )
}
export default Footer;