import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
    UserProfile,
    Search,
    Feed,
    NavBar,
    CreatePin,
    PinDetails,
} from "../component/index";
const Pin = ({ user }) => {
    const [searchTerm, setsearchTerm] = useState("");
    return (
        <div className="px-2 md:px-5">
            <div className="bg-white">
                <NavBar
                    setsearchTerm={setsearchTerm}
                    searchTerm={searchTerm}
                    user={user}
                />
            </div>
            <Routes>
                <Route index element={<Feed />} />

                <Route path="user-profile/:userId" element={<UserProfile />} />
                <Route path="/category/:categoryId" element={<Feed />} />
                <Route
                    path="pin-details/:pinId"
                    element={<PinDetails user={user} />}
                />
                <Route path="create-pin" element={<CreatePin user={user} />} />
                <Route
                    path="search"
                    element={
                        <Search
                            searchTerm={searchTerm}
                            setSearchTerm={setsearchTerm}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default Pin;
