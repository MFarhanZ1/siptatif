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

const getSearchDataDosenPenguji = async() => {}
export {
     createDataPembimbing,
     getDataDosenPembimbing,
     getSearchDataDosenPembimbing,
     deleteDataDosenPembimbingKoordinator,
     editDataDosenPembimbingKoordinator,
     createPengujiKoordinator,
     getDataDosenPengujiPage
    }