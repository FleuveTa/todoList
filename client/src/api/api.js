const baseUrl = 'http://127.0.0.1:8000'

export const getAllUser = async () => {
    const user = await fetch(`${baseUrl}`)
    const data = await user.json()
    return data
}

export const getAllTaskTest = async () => {
    const user = await fetch(`${baseUrl}/tasks`)
    const data = await user.json()
    return data
}

export const fetchAPIpostLogin = async (loginData) => {
    const data = JSON.stringify(loginData)
    console.log(data)
    const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "true",
        body: data,
    });
    return res;
}

export const fetchAPIGetUser = async () => {
    const user = await fetch(`${baseUrl}/api/user`)
}