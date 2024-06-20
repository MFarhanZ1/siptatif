import fetchWithInterceptor from "./FetchInterceptor";

const verifyAccess = async () => {

    const response = await fetchWithInterceptor(`${process.env.BASE_URL}/verify-access-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token") || "null"}`
        },
    });

    const data = await response.json();
    return data;

};

const refreshToken = async()=>{
    const response = await fetch(`${process.env.BASE_URL}/refresh-access-token`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    return data;
}

export{
    verifyAccess,
    refreshToken
}