const getDataDosenMahasiswa = async () => {
    const response = await fetch(`${process.env.BASE_URL}/pembimbing`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};

const getDataDosenMahasiswaPage = async (page: number) => {
    const response = await fetch(`${process.env.BASE_URL}/pembimbing?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};

export {
     getDataDosenMahasiswa,
     getDataDosenMahasiswaPage}