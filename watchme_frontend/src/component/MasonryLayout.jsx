import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
const MasonryLayout = ({ pins }) => {
    const breakPoints = {
        default: 4,
        3000: 6,
        1200: 3,
        2000: 5,
        1000: 2,
        500: 1,
    };

    return (
        <Masonry
            breakpointCols={breakPoints}
            className="flex animate-slide-fwd"
        >
            {pins?.map((pin) => {
                return <Pin className="w-max" key={pin._id} pin={pin} />;
            })}
        </Masonry>
    );
};

export default MasonryLayout;
