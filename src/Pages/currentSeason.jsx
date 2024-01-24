import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import useSWR from "swr";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Loading from "@/app/loading";
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
const CurrentList = ({ Season }) => {
    const { data, error, isLoading } = useSWR(
        `api/user/topThree/?Season=${Season}`,
        fetcher
    );
    if (error) return <div>{error}</div>
    if (isLoading) return <div>{<Loading number={4} />}</div>
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2 ">
                {
                    isLoading ? <Loading number={4} /> :
                        data?.query?.map((value, index) => {
                            return (
                                <div className="w-full h-full pl-1 lg:px-0" key={index}>
                                    <div className="p-3 bg-neutral-900 rounded shadow-md h-full">
                                        <Link rel="noopener noreferrer" href={`/Detail/${value.title}`}>
                                            <div className="relative w-full mb-3 h-64 lg:mb-0">
                                                <Image alt="icon"
                                                    src={value.profile_img}
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    placeholder="blur"
                                                    blurDataURL="data:image/jpeg..."
                                                    quality={100}
                                                    priority={true}
                                                    style={{
                                                        display: 'block', marginLeft: 'auto', marginRight: 'auto',
                                                        backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100%",
                                                        width: "auto", objectFit: "cover", borderRadius: '20px'
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
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                }
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:mt-8 md:mt-10 gap-2
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                    <div className='text-gray-200 text-xl m-auto sm:m-auto md:mr-0  mr-0 text-right hover:text-orange-700'>
                        <Link href={`/Anime/${Season}`} passHref={true} prefetch={true}>
                            <BsFillArrowRightCircleFill style={{ margin: "auto" }} aria-label="Season" />
                        </Link>
                    </div>
                    <div className='text-gray-200 text-xl m-auto sm:m-auto md:ml-0 ml-0 col-span-2  text-left hover:text-orange-700'>
                        <Link href={`/Anime/${Season}`} passHref={true} prefetch={true} aria-label="Summer">
                            More Detail
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentList;