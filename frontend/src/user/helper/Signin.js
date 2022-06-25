import React,{useState} from 'react'
import { Navigate } from 'react-router';
import { authenticate, isAuthenticated, signin } from '../../auth/helper';
import Base from '../../core/Base'
import Toast from '../../utils/Toast';

const Signin = () => {

  const [values, setValues] = useState({
    email:"",
    password:"",
    error:"",
    loading:"",
    didRedirect:false
  });

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

  const handleChange = name => event => {
    // higher order function
    setValues({...values, error:false, [name]:event.target.value})
  }
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error:false, loading:true})
    signin({email, password})
    .then((res) => {
      if(res.error){
        setValues({...values, error:res.error, loading:false})
        Toast("Could not sign in","error");
      }else{
        authenticate(res, () => {
          Toast("Signin successful","success");
          setValues({
            ...values,
            didRedirect: true
          })
        })
      }
    }).catch(err => console.log("Could not connect to database"))
  }

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1){
        return <p>Redirect to admin dashboard</p>
      }else{
        return <p>Redirect to user dashboard</p>
      }
    }
    if(isAuthenticated()){
      console.log("Auth true");
      return <Navigate to='/'/>
    }
  }

  const signInForm = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3 mt-3">
              <label className="text-dark">Email</label>
              <input className="form-control" type="email" value={email} onChange={handleChange("email")}/>
            </div>
            <div className="form-group mb-3">
              <label className="text-dark">Password</label>
              <input className="form-control" type="password" value={password} onChange={handleChange("password")}/>
            </div>
            <button onClick={onSubmit} className="btn form-control btn-secondary custom-btn btn-block mt-3 mb-3">Submit</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Base title={"Signin page"} description={""}>
        {signInForm()}
        {performRedirect()}
      </Base>
    </div>
  )
}

export default Signin;