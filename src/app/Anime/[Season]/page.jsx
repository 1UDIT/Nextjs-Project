'use client'
import animeCss from "@/Css/anime.module.css";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineArrowDown, AiOutlineCheckCircle } from "react-icons/ai";
const ScheduleList = ({ params }) => {
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState([]);
    const [season, setSeason] = useState(params.Season);
    const [Open, setOpen] = useState(false);
    const [OpenDay, setOpeday] = useState(false);
    const closeDropDown = useRef(null);
    const DaycloseDropDown = useRef(null);
    const [day, setDay] = useState([
        {
            id: "1",
            days: "Monday"
        },
        {
            id: "2",
            days: "Tuesday"
        },
        {
            id: "3",
            days: "Wednesday"
        },
        {
            id: "4",
            days: "Thursday"
        },
        {
            id: "5",
            days: "Friday"
        },
        {
            id: "6",
            days: "Saturday"
        },
        {
            id: "7",
            days: "Sunday"
        },
        {
            id: "8",
            days: "All"
        },
    ]);
    const [onclickDay, SetOnclickDay] = useState('All');
    useEffect(() => {
        setLoading(true);
        const callAnimeScheduler = async () => {
            await axios.get(`api/user/schedule/?Season=${season}&day=${onclickDay}`)
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.response.status !== 409) throw error;
                });
        }
        callAnimeScheduler();
    }, [season, onclickDay]);
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (Open && closeDropDown.current && !closeDropDown.current.contains(e.target)) {
                setOpen(false);
            }
            if (OpenDay && DaycloseDropDown.current && !DaycloseDropDown.current.contains(e.target)) {
                setOpeday(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [Open, OpenDay]);
    const filteredItems = data.query?.filter(
        item =>
            // item.description.toLocaleLowerCase().includes(filterText) ||
            item.title.toLocaleLowerCase().includes(filterText)
    );
    const itemsToDisplay = filterText ? filteredItems : data.query;
    const checkRadioBtn = (event) => {
        SetOnclickDay(event.target.value);
    }
    return (
        <>
            <div className="bg-white shadow-lg w-full dark:bg-slate-800 dark:text-white">
                <div id={animeCss.triangle_topleft} className="flex flex-row w-11/12 m-auto justify-between items-center py-7 pl-7">
                    <Link href={'/'}><h1 className="text-2xl font-bold">Anime Page</h1></Link>
                </div>
            </div>
            <div className="font-nunito  dark:bg-slate-900 bg-slate-900">
                <div className='w-11/12 m-auto mt-1 flex flex-col md:flex-row  justify-between items-start md:items-center gap-5 md:gap-0'>
                    <div className="relative mt-10 ml-10 md:ml-0" >
                        <input type='text' placeholder='Search...'
                            value={filterText}
                            onChange={e => setFilterText(e.target.value.toLocaleLowerCase())}
                            className="text-sm py-3 w-full rounded pl-10 shadow-lg focus:outline-none dark:bg-slate-800 dark:text-white" />
                        <AiOutlineSearch className="absolute bottom-3 left-3 text-gray-400 text-2xl dark:text-white" />
                    </div>
                </div>
                <div className="hidden md:grid   gap-x-4 gap-y-8 md:grid-cols-7 lg:grid-cols-8 pt-5 sm:px-16 md:px-16 ">
                    {
                        day?.map((value) => {
                            return (
                                <div className="inline-flex items-center" key={value.id}>
                                    <label
                                        className="relative flex cursor-pointer items-center rounded-full p-3"
                                    >
                                        <input
                                            name={value.days}
                                            value={value.days}
                                            type="radio"
                                            className="before:content[''] peer 
                                            relative h-5 w-5 cursor-pointer appearance-none
                                             rounded-full border border-blue-gray-200 text-pink-500
                                              transition-all before:absolute before:top-2/4 before:left-2/4 
                                              before:block before:h-12 before:w-12 before:-translate-y-2/4 
                                              before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 
                                              before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 
                                              hover:before:opacity-10"
                                            checked={value.days === onclickDay}
                                            onChange={(e) => checkRadioBtn(e)}
                                        />
                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                            <AiOutlineCheckCircle />
                                        </div>
                                    </label>
                                    <span
                                        className="mt-px cursor-pointer select-none text-white"
                                        onClick={() => SetOnclickDay(value.days)}
                                    >
                                        {value.days}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>



                <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
                    <div className="container p-6 mx-auto space-y-8">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ">
                            {itemsToDisplay?.map((Item) => {
                                return (
                                    <article className="flex flex-col dark:bg-gray-900 h-full w-full" key={Item._id}>
                                        <Link rel="noopener noreferrer" href={`/Anime/${Item.title}`}>
                                            <Image alt="icon"
                                                src={Item.profile_img}
                                                width={500}
                                                height={0}
                                                priority
                                                quality="100"
                                                style={{
                                                    backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100%",
                                                    width: "100%", objectFit: "cover"
                                                }}
                                            />
                                        </Link>
                                        <div className={animeCss.triangle}></div>
                                        <div className="flex flex-col p-6 h-full w-full text-white">
                                            <a rel="noopener noreferrer" href="#"></a>
                                            <Link rel="noopener noreferrer" href={`/Anime/${Item.title}`} className="text-xs tracki uppercase hover:underline dark:text-violet-400"> {Item.title}</Link>
                                            <h3 className={`flex-1 py-1 text-lg font-semibold line-clamp-3 h-48`}> {Item.description}</h3>
                                            <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                                                <span>{Item.Studio}</span>
                                                <span>{Item.day}</span>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}


export default ScheduleList;