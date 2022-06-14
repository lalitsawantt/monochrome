import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../auth/helper';
import Base from '../../core/Base'

const Signup = () => {

  const [formInput, setFormInput] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  });

  const {name, email, password, error, success} = formInput;

  const handleChange = name => event => {
    // higher order function
    setFormInput({...formInput, error:false, [name]:event.target.value})
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setFormInput({...formInput, error:false})
    signup({name, email, password})
    .then((res) => {
      if(res.err){
        // TODO: add toast notification
        setFormInput({...formInput, error:res.error, success:false})
      }else{
        setFormInput({
          ...formInput,
          name:"",
          email:"",
          password:"",
          error:"",
          success:true
        })
      }
    })
    .catch((error) => {
      // TODO: toast notif
      console.log("error in submit : ", error);
    })
  }

  useEffect(() => {
    console.log("user : ", formInput);
  },[formInput])

  const signUpForm = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3 mt-3">
              <label className="text-dark">Name</label>
              <input className="form-control" type="text" onChange={handleChange("name")} value={name}/>
            </div>
            <div className="form-group mb-3">
              <label className="text-dark">Email</label>
              <input className="form-control" type="email" onChange={handleChange("email")} value={email}/>
            </div>
            <div className="form-group mb-3">
              <label className="text-dark">Password</label>
              <input className="form-control" type="password" onChange={handleChange("password")} value={password}/>
            </div>
            <button className="btn form-control btn-secondary custom-btn btn-block mt-3 mb-3" onClick={(e) => onSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Base title={"Signup page"} description={""}>
        {signUpForm()}
      </Base>
    </div>
  )
}

export default Signup