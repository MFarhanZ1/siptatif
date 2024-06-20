const getListPengumuman = async () => {
    const response = await fetch(`${process.env.BASE_URL}/list-pengumuman`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const results = await response.json();
    return results;
}
export { getListPengumuman }