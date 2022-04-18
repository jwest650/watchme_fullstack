import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./component/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchuser";

function App() {
    const naigate = useNavigate();
    useEffect(() => {
        const user = fetchUser();
        if (!user) {
            naigate("/login");
        }
    }, []);

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
        </Routes>
    );
}

export default App;
