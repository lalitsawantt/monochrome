import { API } from "../BaseUrl";

const getAPI = (url) => {
  return fetch(url,{
    method:"GET",
    headers:{
      "Accept": "application/json",
      "Content-Type":"application/json",
    }
  }).then((res) => {
    return res.json()
  }).catch((error) => console.error("Error in GET > ", url, " : ", error));
}

const postAPI = (url, body) => {
  return fetch(url,{
    method:"POST",
    headers:{
      "Accept": "application/json",
      "Content-Type":"application/json",
    },
    body: JSON.stringify(body)
  }).then((res) => {
    return res.json()
  }).catch((error) => console.error("Error in POST > ", url, " : ", error));
}

export {getAPI, postAPI}