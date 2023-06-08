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
    const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
        body: data,
    });
    console.log(data)
    return res;
}

export const fetchAPIRegister = async (registerData) => {
    const data = JSON.stringify(registerData)
    const res = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
        body: data,
    })
    console.log(data)
    return res
}

export const fetchAPIGetUser = async () => {
    const user = await fetch(`${baseUrl}/api/user`)
}