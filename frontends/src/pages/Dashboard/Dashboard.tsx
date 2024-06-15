const Dashboard = () => {

    return (
        <>
            <button onClick={ async () => {
                const response =await fetch("http://localhost:3000/logout",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
            }}>Test</button>
        </>
    );
}

export default Dashboard;