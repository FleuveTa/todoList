
const baseUrl = 'http://127.0.0.1:8000'

export const getAllUser = async () => {
    const user = await fetch(`${baseUrl}`)
    const data = await user.json()
    return data
}

export const getAllTask = async () => {
    const user = await fetch(`${baseUrl}/api/alltasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const data = await user.json()
    return data
}

export const getTodayTask= async () => {
    const user = await fetch(`${baseUrl}/api/todaytasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const data = await user.json()
    return data
}

export const getImportantTask= async () => {
    const user = await fetch(`${baseUrl}/api/important`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const data = await user.json()
    return data
}
export const getCompletedTask= async () => {
    const user = await fetch(`${baseUrl}/api/completed`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const data = await user.json()
    return data
}
export const getUnCompletedTask= async () => {
    const user = await fetch(`${baseUrl}/api/uncompleted`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const data = await user.json()
    return data
}

export const getTaskByDir  = async (name) => {
    const res = await fetch(`${baseUrl}/api/taskbydir/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const response = await res.json()
    return response
}

export const getDirofUser  = async () => {
    const res = await fetch(`${baseUrl}/api/getdir`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
    })
    const response = await res.json()
    return response
}

export const changeUrlAPI = async (img_url) => {
    const myObject = {"img_url" : img_url}
    const data = JSON.stringify(myObject)
    const res = fetch(`${baseUrl}/api/changeurl`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
        body: data,
    })
    return res
}

export const fetchAPIDeleteTask = async (task_id) => {
    const data = JSON.stringify(task_id)
    console.log(data)
    const res = fetch(`${baseUrl}/api/delete-taskbyid`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
        credentials : "include",
        body: data,
    })
    return res
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
    return res;
}

export const fetchAPILogout = async () => {
    const res = await fetch(`${baseUrl}/api/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
    });
    return res
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

export const fetchAPIDeleteAll = async () => {
    const res = await fetch(`${baseUrl}/api/delete-all`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    })
    return res
}

