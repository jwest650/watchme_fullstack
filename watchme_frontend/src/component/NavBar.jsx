import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import image1 from "../assests/watchme.png";
import {
    BiSearchAlt,
    BiPlus,
    BiChevronLeft,
    BiChevronRight,
} from "react-icons/bi";
import { RiHome7Fill } from "react-icons/ri";
import { categories } from "../utils/data";
const isNotActiveStyle =
    "flex items-center px-2 md:px-5 gap-2 md:gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
    "flex items-center px-2 md:px-5 gap-2 md:gap-3 font-extrabold   transition-all duration-200 ease-in-out capitalize";
const NavBar = ({ searchTerm, setsearchTerm, user }) => {
    const [isScroll, setisScroll] = useState(false);
    const scrollref = useRef();

    const navigate = useNavigate();
    const scrollOnClick = (side) => {
        setisScroll(true);
        side === "left"
            ? (scrollref.current.scrollLeft -= 200)
            : (scrollref.current.scrollLeft += 200);
        scrollref.current.scrollLeft < 199
            ? setisScroll(false)
            : setisScroll(true);
    };
    return (
        <div className="flex flex-col">
            <div className="flex items-center w-full py-2">
                <Link to="/">
                    <img src={image1} alt="" className="w-40" />
                </Link>
                <div className="bg-white flex w-full mx-4 shadow-lg p-2 rounded-lg">
                    <BiSearchAlt fontSize={30} className="text-gray-700" />
                    <input
                        type="text"
                        placeholder="search"
                        className="w-full outline-none font-semibold px-3 text-grey-800 text-base"
                        onFocus={() => navigate("search")}
                        value={searchTerm}
                        onChange={(e) => setsearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center p-2">
                    <Link to={"/create-pin"}>
                        <button className="w-36 min-w-36 hover:shadow-xl rounded-md duration-150 ease-in-out pt-1 border-2 border-gray-300 text-base text-gray-700 md:flex hidden items-center justify-center">
                            submit a photo
                        </button>

                        <div className="w-10 h-10 bg-black rounded-md md:hidden flex justify-center items-center">
                            <BiPlus fontSize={24} className="text-white" />
                        </div>
                    </Link>

                    <Link
                        to={`user-profile/${user?._id}`}
                        className="rounded-full w-10 h-10 shadow-lg ml-2"
                    >
                        <img
                            src={user?.image}
                            alt=""
                            className="rounded-full"
                        />
                    </Link>
                </div>
            </div>
            <div className="flex  items-center w-full py-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? isActiveStyle : isNotActiveStyle
                    }
                >
                    <RiHome7Fill fontSize={30} />
                </NavLink>
                <div className="h-6 w-[1px] bg-slate-500"></div>
                <div className="h-10 flex items-center  w-full hide relative overflow-y-scroll">
                    <div
                        className={`${
                            isScroll ? "flex" : "hidden"
                        } items-center justify-start  absolute left-0 w-32 h-10 bg-gradient-to-r from-gray-50 cursor-pointer `}
                        onClick={() => scrollOnClick("left")}
                    >
                        <BiChevronLeft fontSize={30} />
                    </div>
                    <div
                        className="flex items-center w-full  scroll-smooth duration-150 ease-in-out hide overflow-x-scroll"
                        ref={scrollref}
                    >
                        {categories
                            .slice(0, categories.length - 1)
                            .map((category) => (
                                <NavLink
                                    to={`category/${category.name}`}
                                    key={category.name}
                                    className={({ isActive }) =>
                                        isActive
                                            ? isActiveStyle
                                            : isNotActiveStyle
                                    }
                                >
                                    {category.name}
                                </NavLink>
                            ))}
                    </div>
                    <div
                        className={
                            "md:flex items-center   absolute right-0 w-32 h-10 bg-gradient-to-l from-gray-50 justify-end cursor-pointer hidden hide "
                        }
                        onClick={() => scrollOnClick("right")}
                    >
                        <BiChevronRight fontSize={30} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
