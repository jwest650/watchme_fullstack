import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { IoCloudDownload, IoArrowRedo } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchuser";
const Pin = ({ pin: { postedBy, _id, destination, save, image } }) => {
    const navigate = useNavigate();
    const [postHovered, setpostHovered] = useState(false);
    const user = fetchUser();
    const alreadySaved = !!save?.filter(
        (item) => item.postedBy?._id === user?.googleId
    )?.length;
    const savePin = (id) => {
        if (!alreadySaved) {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert("after", "save[-1]", [
                    {
                        _key: uuid(),
                        userId: user?.googleId,
                        postedBy: {
                            _type: "postedBy",
                            _ref: user?.googleId,
                        },
                    },
                ])
                .commit()
                .then(() => {
                    window.location.reload();
                });
        }
    };
    const deletePin = async (id) => {
        const result = await client.delete(id);

        window.location.reload();

        console.log(result);
    };
    return (
        <div className="m-2">
            <div
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                onClick={() => navigate(`/pin-details/${_id}`)}
                onMouseEnter={() => setpostHovered(true)}
                onMouseLeave={() => setpostHovered(false)}
            >
                <img
                    src={urlFor(image).width(250).url()}
                    alt=""
                    className="rounded-lg w-full"
                />
                {postHovered && (
                    <div className="absolute z-50 w-full h-full top-0 flex justify-between flex-col p-1 pt-2 pb-3">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white flex flex-col items-center justify-center w-9 h-9 opacity-75 hover:opacity-100 hover:shadow-md rounded-full outline-none text-xl text-black"
                                >
                                    <IoCloudDownload />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <div>
                                    <button className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none">
                                        {save?.length} Saved
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                                        type="buttton"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            savePin(_id);
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between w-full gap-2 items-center">
                            {destination && (
                                <Link
                                    to={destination}
                                    target="_blank"
                                    rel="norefferer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md bg-white"
                                >
                                    <IoArrowRedo />
                                    {destination.length > 15
                                        ? `${destination.slice(0, 15)}...`
                                        : destination}
                                </Link>
                            )}
                            {postedBy?._id === user?.googleId && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}
                                    className="bg-white p-2 opacity-70 hover:opacity-100 text-red-500 font-bold text-base rounded-full shadow-md"
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link
                to={`user-profile/${postedBy?._id}`}
                className="flex items-center gap-2 mt-2"
            >
                <img
                    src={postedBy?.image}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-semibold capitalize">{postedBy?.userName}</p>
            </Link>
        </div>
    );
};

export default Pin;
