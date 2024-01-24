'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from "axios";
import useSWR from "swr";
import Image from 'next/image';
import Loading from '../loading';
const fetcher = async (url) => {
    return await axios
        .get(url, {
            auth: {
                username: "AnimeGo",
                password: "AnimeRock"
            }
        })
        .then((res) => res.data)
        .catch((error) => {
            if (error.response.status !== 409) throw error;
        });
};
export default function Home() {
    const { data, error, isLoading } = useSWR(
        `api/user/topTen`,
        fetcher
    );
    return (
        <>
            <h1 className='mt-10 mb-10 text-center text-gray-200 text-xl'>Testing News Link</h1>
            <div className="ml-10 grid grid-cols-1 gap-4 md:grid-cols-5 sm:grid-cols-3 ">
                {
                    isLoading ?
                        <Loading number={4} /> :
                        data?.message.map((value, index) => {
                            return (
                                <div className="w-full h-full pl-1 lg:px-0" key={index}>
                                    <div className="p-3 bg-neutral-900 rounded shadow-md h-full">
                                        <div className="">
                                            <div className="relative w-full mb-3 h-64 lg:mb-0 rounded-full">
                                                <Image alt="icon"
                                                    src={value.profile_img}
                                                    width={500}
                                                    height={500}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/jpeg..."
                                                    quality={100}
                                                    priority={true}
                                                    style={{
                                                        backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100%",
                                                        width: "100%", objectFit: "cover", borderRadius: '20px'
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-auto p-2 justify-evenly">
                                                <div className="flex flex-wrap ">
                                                    <div className="flex items-center justify-between w-full min-w-0 ">
                                                        <h2 className="mr-auto text-lg cursor-pointer text-white">
                                                            {value.title}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
            </div>
        </>
    );
}
