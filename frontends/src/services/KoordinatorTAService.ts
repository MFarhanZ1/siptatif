const createDataPembimbing = async (params: {
  nidn: string;
  kuota: string;
}) => {
  const response = await fetch(`${process.env.BASE_URL}/pembimbing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify({
      nidn: params.nidn,
      kuota: params.kuota,
    }),
  });
  const data = await response.json();
  return data;
};

const getDataDosenPembimbing = async(page:number) => {
  const response = await fetch(`${process.env.BASE_URL}/pembimbing?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
  const data = await response.json();
  return data;
};

const getSearchDataDosenPembimbing = async(search: string) => {
  const response = await fetch(`${process.env.BASE_URL}/pembimbing?search=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
  const data = await response.json();
  return data;
};

const deleteDataDosenPembimbingKoordinator = async(nidn: string) => {
    const response = await fetch(`${process.env.BASE_URL}/pembimbing/${nidn}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
}
const editDataDosenPembimbingKoordinator = async(nidn: string, kuota: string) => {
    const response = await fetch(`${process.env.BASE_URL}/pembimbing/${nidn}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
        body: JSON.stringify({
            nidn: nidn,
            kuota: kuota
        })
    })
    const data = await response.json();
    return data;
}

const createPengujiKoordinator = async(nidn: string, kuota: string) =>{
    const response = await fetch(`${process.env.BASE_URL}/penguji`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
        body: JSON.stringify({
            nidn: nidn,
            kuota: kuota
        })
    })
    const data = await response.json();
    return data;
}

const getDataDosenPengujiPage = async(pagePenguji: number) =>{
    const response = await fetch(`${process.env.BASE_URL}/penguji?page=${pagePenguji}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
}

const getSearchDataDosenPenguji = async(search: string) => {
 const response = await fetch(`${process.env.BASE_URL}/penguji?search=${search}`, {
     method: "GET",
     headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("access-token")}`
     }
 })
 const data = await response.json();
 return data;
}

const editDataDosenPengujiKoordinator = async(nidn: string, kuota: string)=>{
    const response = await fetch(`${process.env.BASE_URL}/penguji/${nidn}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
        body: JSON.stringify({
            nidn: nidn,
            kuota: kuota
        })
    })
    const data = await response.json();
    return data;
}

const deleteDataDosenPengujiKoordinator = async(nidn : string) => {
    const response = await fetch(`${process.env.BASE_URL}/penguji/${nidn}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
}

const getDataMahasiswaKoordinator = async(page : number) => {
    const response = await fetch(`${process.env.BASE_URL}/tugas-akhir?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        }
    })
    console.log(response)
    const data = await response.json();
    return data;
}
const getDataMahasiswaKoordinatorSearch = async(search : string) => {
    const response = await fetch(`${process.env.BASE_URL}/tugas-akhir?search=${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        }
    })
    console.log(response)
    const data = await response.json();
    return data;
}

const updateTAMahasiswa = async(registration_number : string, status: string, catatan: string, nidn_penguji1: string,nidn_penguji2: string) =>{
    console.log(nidn_penguji1 == "", nidn_penguji2 == "")
    const response = await fetch(`${process.env.BASE_URL}/tugas-akhir/${registration_number}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },body: JSON.stringify({
            status: status,
            catatan: catatan || null,
            nidn_penguji1: (nidn_penguji1 == "" || !nidn_penguji1) ? null : nidn_penguji1,
            nidn_penguji2: (nidn_penguji2 == "" || !nidn_penguji2) ? null : nidn_penguji2
        })
    })
    const data = await response.json();
    return data;
}

const getPengujiKoordinator = async() => {
    const response = await fetch(`${process.env.BASE_URL}/penguji`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    })
    const data = await response.json();
    return data;
}
export {
     createDataPembimbing,
     getDataDosenPembimbing,
     getSearchDataDosenPembimbing,
     deleteDataDosenPembimbingKoordinator,
     editDataDosenPembimbingKoordinator,
     createPengujiKoordinator,
     getPengujiKoordinator,
     getDataDosenPengujiPage,
     getSearchDataDosenPenguji,
     editDataDosenPengujiKoordinator,
     deleteDataDosenPengujiKoordinator,
     getDataMahasiswaKoordinator,
     getDataMahasiswaKoordinatorSearch,
     updateTAMahasiswa
    }