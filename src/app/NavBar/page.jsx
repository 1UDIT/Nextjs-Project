"use client";
import Link from "next/link";
import { FaBars, FaHome, FaRegNewspaper,  } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
    priority: '1',
  },
  {
    path: "/Anime",
    name: "Anime",
    icon: <MdOutlineSchedule />,
    priority: '2'
  },
  {
    path: "/News",
    name: "News",
    icon: <FaRegNewspaper/>,
  },   
];
const SideBar = ({ children }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <Link
                  href={route.path}
                  key={index}
                  className={pathname == route.path ? "active" : "link"}
                  prefetch={false}
                  passHref={true}
                  aria-label={route.path}
                  priority={route.priority}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </section>
        </motion.div>

      </div>
    </>
  );
};

export default SideBar;