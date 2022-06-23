import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../auth/helper';
import Base from '../../core/Base'
import Toast from '../../utils/Toast';
import {toast} from 'react-toastify';
const Signup = () => {

  const [formInput, setFormInput] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  });
  const [submitDisabled, toggleSubmitDisabled] = useState(false);
  const {name, email, password, error, success} = formInput;

  const handleChange = name => event => {
    // higher order function
    setFormInput({...formInput, error:false, [name]:event.target.value})
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    console.log("validateemails :" , validateEmail(email));
    if(password.length > 5 && name.length > 2 && validateEmail(email)){
      setFormInput({...formInput, error:false});
      signup({name, email, password})
      .then((res) => {
        if(res.error){
          Toast(res.error.err, "error");
          setFormInput({...formInput, error:res.err, success:false})
          return;
        }
        if(res.error){
          Toast("Something went wrong","error");
          console.error(res.error);
        }else{
          Toast("User Created Successfully", "success");
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
        Toast("Cannot create user", "error");
        console.error("error in submit : ", error);
      })
    }else{
      if(name.length <= 2){
        Toast("Name should be more than 2 characters","error");
      }
      if(password.length <= 5){
        Toast("Password should be more than 5 characters", "error")
      }
      if(!validateEmail(email)){
        Toast("Email invalid","error");
      }
      console.log("chickened out", validateEmail(email)," : : ", name.length, " : : ", password.length);
    }
  }
    
    const successMessage = () => {
    return(
      <div className="alert alert-success" style={{display: success ? "" : "none"}}>
        User created successfully, please <Link to="/signin">login here</Link>
      </div>
    )
  }

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
        {successMessage()}
        {signUpForm()}
      </Base>
    </div>
  )
}

export default Signup