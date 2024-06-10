import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard;