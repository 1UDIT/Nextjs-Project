'use client'

import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

const DataFetch = ({ param }) => {
    const [data, setData] = useState([]);
    const [Title, setTitle] = useState(param);
    const [Loading, setLoading] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`Detail/?title=${Title}`, {
            cache: "force-cache",
        })
            .then((res) => {
                setData(res.data);
                setLoading(false);
                console.log(res.data, "hello");
            })
            .catch((error) => {
                console.log("error", error.response.data, error);
            });
    }, [])

    return (
        <>
            <div className="bg-slate-950">
                <section className="flex flex-col justify-center antialiased bg-gray-900 text-gray-200 min-h-screen ">
                    <div className="max-w-6xl mx-auto p-4 sm:px-6 ">
                        {data.query?.map((Item) => {
                            return (
                                <article key={Item._id} className="  max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                                    <div className="relative block group" href="#0">
                                        <div className="max-w-xs w-56 h-80 absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true"></div>
                                        <figure className="max-w-xs w-56 h-80 relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                                            <Image alt="icon"
                                                src={Item.profile_img}
                                                width={500}
                                                height={500}
                                                quality="100"
                                                style={{
                                                    backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "auto",
                                                    width: "auto", objectFit: "cover"
                                                }}
                                            />
                                        </figure>
                                    </div>
                                    <div>
                                        <header>
                                            <div className="mb-3">
                                                <ul className="flex flex-wrap text-xs font-medium -m-1">
                                                    <li className="m-1">
                                                        <div className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">{Item.Season}</div>
                                                    </li>
                                                    <li className="m-1">
                                                        <div className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">{Item.Studio}</div>
                                                    </li>
                                                    <li className="m-1">
                                                        <div className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">{Item.day}</div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                                                <div className="hover:text-gray-100 transition duration-150 ease-in-out" href="#0">{Item.title}</div>
                                            </h3>
                                        </header>
                                        <p className="text-lg text-gray-400 flex-grow">{Item.description}</p>
                                        <footer className="flex items-center mt-4">
                                            <div>
                                                <span className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Time</span>
                                                <span className="text-gray-700"> - </span>
                                                <span className="text-gray-500">{Item.Time}</span>
                                            </div>
                                        </footer>
                                    </div>
                                </article>
                            )
                        })}


                    </div>
                </section>

                {/* <div x-show="open" className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
                    <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
                        <div>👉 <a className="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-blog-post-hover" target="_blank">More components on Cruip.com</a></div>
                        <button className="text-gray-500 hover:text-gray-400 ml-5" />
                        <span className="sr-only">Close</span>
                        <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                        </svg>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default DataFetch;