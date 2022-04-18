import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { client } from "../client";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchuser";
import Pin from "./Pin";

const Home = () => {
    const [user, setuser] = useState(null);
    const scroller = useRef(null);
    const userInfo = fetchUser();

    useEffect(() => {
        scroller.current.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const query = userQuery(userInfo?.googleId);
        client.fetch(query).then((data) => {
            setuser(data[0]);
            console.log(data[0]);
        });
    }, []);
    return (
        <div className="flex flex-col transition-height duration-75 h-full ease-out">
            <div
                className="pb-2 flex-1 h-screen overflow-y-scroll hide"
                ref={scroller}
            >
                <Routes>
                    <Route path="*" element={<Pin user={user} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
