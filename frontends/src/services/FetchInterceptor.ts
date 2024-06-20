import Swal from "sweetalert2";

async function fetchWithInterceptor(url: string, options: RequestInit = {}): Promise<Response> {
    
    // Fungsi untuk mendapatkan token dari localStorage
    const getToken = (): string | null => localStorage.getItem('access-token');
    const setToken = (token: string): void => localStorage.setItem('access-token', token);

    // Fungsi untuk merefresh token
    async function refreshToken(): Promise<string | null> {

        const response = await fetch(`${process.env.BASE_URL}/refresh-access-token`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            const data: { access_token: string } = await response.json();
            setToken(data.access_token);
            return data.access_token;
        } else {
            localStorage.removeItem('access-token');
            Swal.fire({
                icon: 'error',
                title: 'Sesi Anda Sudah Habis!',
                text: 'Maaf, sesi anda sudah habis, silahkan login kembali untuk melanjutkan akses!',   
                confirmButtonText: 'Yahh :( baiklah saya akan login lagi...', 
            }).then((click) => {
                if (click.isConfirmed) {
                    window.location.href = '/login';
                }
            })
            return null
        }
    }

    // Fungsi untuk melakukan request
    async function makeRequest(url: string, options: RequestInit): Promise<Response> {
        const token = getToken();
        options.headers = options.headers || {};
        (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

        return fetch(url, options);
    }

    // Fungsi interceptor untuk menangani response
    async function interceptor(url: string, options: RequestInit): Promise<Response> {
        let response = await makeRequest(url, options);

        if (response.status === 401) {
            console.log('akses token expired, otw refresh');
            const newToken = await refreshToken();
            if (newToken) {
                (options.headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
                response = await makeRequest(url, options);
            }
        }

        return response;
    }

    return interceptor(url, options);
}

export default fetchWithInterceptor;