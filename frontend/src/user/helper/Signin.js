import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../../core/Base'

const Signin = () => {
  const signInForm = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-3 mt-3">
              <label className="text-dark">Email</label>
              <input className="form-control" type="email"/>
            </div>
            <div className="form-group mb-3">
              <label className="text-dark">Password</label>
              <input className="form-control" type="password"/>
            </div>
            <button className="btn form-control btn-secondary custom-btn btn-block mt-3 mb-3">Submit</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Base title={"Signin page"} description={""}>
        {signInForm()}
      </Base>
    </div>
  )
}

export default Signin;