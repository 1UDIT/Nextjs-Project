import Loading from "@/app/loading";
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import useSWR from "swr";
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
const Airing = () => {
    const { data, error, isLoading } = useSWR(
        `api/user/topTen`,
        fetcher
    );

    if(error) return <div>{error}</div>
    if(isLoading) return <div>{<Loading number={4}/>}</div>
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5 sm:grid-cols-3 ">
                {
                    isLoading ? <Loading number={4}/>:
                        data?.message?.map((value, index) => {
                            return (
                                <div className="w-full h-full pl-1 lg:px-0" key={index}>
                                    <div className="p-3 bg-neutral-900 rounded shadow-md h-full">
                                        <Link rel="noopener noreferrer" href={`/Detail/${value.title}`}>
                                            <div className="">
                                                <div className="relative w-full mb-3 h-64 lg:mb-0 rounded-full">
                                                    <Image alt="icon"
                                                        src={value.profile_img}
                                                        width={500}
                                                        height={500}
                                                        placeholder="blur"
                                                        blurDataURL={value.profile_img}
                                                        quality={100} 
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
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
            </div>
        </>
    )
}

export default Airing;