const getDataDosenPage = async (page: number) => {
    const response = await fetch(`${process.env.BASE_URL}/dosen?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};
const getDataDosenSearch = async (search: string) => {
    const response = await fetch(`${process.env.BASE_URL}/dosen?search=${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};
const getAllDataDosen = async () => {
    const response = await fetch(`${process.env.BASE_URL}/dosen`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};
const getAllDataKeahlian = async () => {
    const response = await fetch(`${process.env.BASE_URL}/keahlian`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};

const createDataDosen = async (params:{nidn: string,nama: string,no_hp: string,jenis_kelamin: string, email: string}) => {
    const response = await fetch(`${process.env.BASE_URL}/dosen`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },body: JSON.stringify({
            nidn: params.nidn,
            nama: params.nama,
            no_hp: params.no_hp,
            jenis_kelamin: params.jenis_kelamin,
            email: params.email
        })

    })
    const data = await response.json();
    return data;
};

const deleteDataDosen = async (nidn: string) => {
    const response = await fetch(`${process.env.BASE_URL}/dosen/${nidn}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
}
const editDataDosen = async (params:{nidn: string,nama: string,no_hp: string,jenis_kelamin: string, email: string}) => {
    const response = await fetch(`${process.env.BASE_URL}/dosen/${params.nidn}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },body: JSON.stringify({
            nama: params.nama,
            no_hp: params.no_hp,
            jenis_kelamin: params.jenis_kelamin,
            email: params.email
        })
    })
    const data = await response.json();
    return data;
}
const getKeahlianDosenPage = async (page: number) => {
    const response = await fetch(`${process.env.BASE_URL}/keahlian-dosen?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
};

const deleteKeahlianDosen = async (nidn: string,id_keahlian: string) => {
    console.log(nidn, id_keahlian);
    const response = await fetch(`${process.env.BASE_URL}/keahlian-dosen/${nidn}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },body: JSON.stringify({
            id_keahlian: id_keahlian
        })
    })
    const data = await response.json();
    return data;
}

const createDataKeahlianDosen = async (params:{nidn: string,id_keahlian: number}) => {
    const response = await fetch(`${process.env.BASE_URL}/keahlian-dosen`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },body: JSON.stringify({
            nidn: params.nidn,
            id_keahlian: params.id_keahlian
        })
    })
    const data = await response.json();
    return data;
}
const getKeahlianSearch = async (search: string) => {
    const response = await fetch(`${process.env.BASE_URL}/keahlian-dosen?search=${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    console.log(response)
    const data = await response.json();
    return data;
};
export { 
    getDataDosenSearch,
    getDataDosenPage,
    getAllDataDosen,
    getAllDataKeahlian,
    createDataDosen,
    deleteDataDosen,
    editDataDosen,
    getKeahlianDosenPage,
    deleteKeahlianDosen,
    createDataKeahlianDosen, 
    getKeahlianSearch
}