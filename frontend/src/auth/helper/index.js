import { API } from "../../BaseUrl";
// TODO: Make a parent method for fetch
export const signup = user => {
  return fetch(`${API}/signup`, {
    method:"POST",
    headers:{
      Accept: "application/json",
      "Content-Type":"application/json"
    },
    body: JSON.stringify(user),
  })
  .then((response) => {return response.json})
  .catch((error) => console.log("ERROR IN SIGNUP : ", error));
}

export const authenticate = (data, next) => {
  if(typeof window !== "undefined"){
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export const signout = next => {
  if(typeof window !== "undefined"){
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method:"GET"
    })
    .then(response => console.log("Signout successful"))
    .catch(error => console.error("Could not signout : ", error));
  }
}
// method to authenticate
export const isAuthenticated = () => {
  if(typeof window == "undefined"){
    return false;
  }
  if(localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"));
  }else{
    return false;
  }
}