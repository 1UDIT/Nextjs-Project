'use client'
import styles from '@/Css/Slider.module.css'
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import "@/Css/style.css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image'
import axios from "axios";
import useSWR from "swr";
import dynamic from 'next/dynamic';
import Loading from './loading';

const Airing = dynamic(() => import('@/Pages/topAiring'));
const CurrentList = dynamic(() => import('@/Pages/currentSeason'));
const topAiring = dynamic(() => import('@/Css/topAiring.module.css'));
const Footer = dynamic(() => import('@/Pages/Footer'));
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
  const [season, setSeason] = useState([]);

  useEffect(() => {
    const callTotalSeson = async () => {
      await axios.get(`api/user/Season`)
        .then((res) => {
          if (res.status === 200) {
            setSeason(res.data.totalSeason);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    callTotalSeson();
  }, []);

  const { data, error, isLoading } = useSWR(
    `api/user/weeklyTreading`,
    fetcher
  );

  if (error) return <div>{error}</div>
  if (isLoading) return <div> </div>

  return (
    <>
      <div className={styles.slider}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >

          {
            data?.message?.map((Item, index) => {
              return (
                <SwiperSlide key={Item._id}>
                  <div className="relative w-full mb-3 h-full lg:mb-0">
                    <div className={styles.deslide_cover}  >
                      <Image alt="icon"
                        src={Item.profile_img}
                        width={500}
                        height={0}
                        priority={true}
                        quality="100"
                        blurDataURL={Item.profile_img}
                        style={{
                          height: "auto",  width: "100%",
                          backgroundSize: "cover", backgroundRepeat: "no-repeat", objectFit: "cover", borderRadius: '20px'
                        }}
                      />
                    </div>

                  </div>
                  <div className={styles.container_Left}>
                    <div className={styles.deslide_item_content}>
                      <div className={styles.desi_head_title}>{Item.title}</div>
                      <div className={styles.desi_description}>{Item.description}</div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }

        </Swiper >
      </div>
      <div className={`${topAiring.container} pt-5 pl-2`}>
        <div className='text-gray-200 text-xl'>Treading</div>
        <Airing />
      </div>
      <div>
        {
          season?.map((value, index) => {
            return (
              <div className='pt-5 pl-2 text-gray-200 text-xl' key={index}>
                {value} Anime List
                <CurrentList Season={value} />
              </div>
            )
          })
        }
      </div>
      <Footer />
    </>
  );
}
