import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import notfound from "../assests/Sandy_Tech-28_Single-11.jpg";
import { useParams } from "react-router-dom";
import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
const Feed = () => {
    const [loading, setloading] = useState(false);
    const [pins, setpins] = useState(null);
    const { categoryId } = useParams();
    useEffect(() => {
        setloading(true);
        if (categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setpins(data);
                setloading(false);
            });
        } else {
            client.fetch(feedQuery).then((data) => {
                setpins(data);
                setloading(false);
            });
        }

        // to unsubscribe later on
    }, [categoryId]);
    console.log(pins);
    if (loading) return <Spinner msg={" New Feeds Loading..."} />;
    if (!pins?.length) {
        return (
            <div className="text-center capitalize mt-5 ">
                <p className="text-lg font-bold">sorry no 🤪 feed available</p>
                <img
                    src={notfound}
                    alt=""
                    className="w-[80%] md:w-[30%] h-[30%] block mx-auto"
                />
            </div>
        );
    }

    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
