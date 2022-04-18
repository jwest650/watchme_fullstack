import React from "react";
import watch from "../assests/watchme.mp4";
import logo from "../assests/watchme.png";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
        localStorage.setItem("user", JSON.stringify(response.profileObj));
        console.log(response);
        const { googleId, name, imageUrl } = response.profileObj;
        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
        });
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full h-full">
                <video
                    className="w-full h-full object-cover"
                    src={watch}
                    controls={false}
                    loop
                    autoPlay
                    type="video/mp4"
                    muted
                />
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay flex flex-col items-center justify-center space-y-2">
                <div>
                    <img src={logo} alt="logo" width="180px" />
                </div>
                <div className="shadow-2xl">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        render={(renderProps) => (
                            <button
                                type="button"
                                className="flex justify-center items-center bg-mainColor rounded-lg p-2 cursor-pointer"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <FcGoogle className="mr-4" /> Sign in with
                                Google
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy="single_host_origin"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
