import React from "react";
import { BallTriangle } from "react-loader-spinner";
const Spinner = ({ msg }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center mt-[150px]">
            <BallTriangle color="#000fff" width={80} height={80} />
            <p className="text-center px2 text-lg">{msg}</p>
        </div>
    );
};

export default Spinner;
