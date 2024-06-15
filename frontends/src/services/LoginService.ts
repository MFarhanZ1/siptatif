
const validateloginService = async (params:{email: string, password: string}) => {
    const response = await fetch(`${process.env.BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: params.email,
            password: params.password,
        }),
    })
    const data = await response.json();
    return data;
}

export {
    validateloginService
}