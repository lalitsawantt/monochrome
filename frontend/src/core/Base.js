 import React from 'react'
import Nav from './Nav'
 
 const Base = ({
  title="Monochrome",
  description="A collection of images clicked by me",
  className="bg-light text-dark",
  children
 }) => {
   return (
     <div>
       <Nav/>
        <div className="container-fluid">
          <div className="jumbotron bg-light text-dark text-center ">
            <h2 className="display-4 header-custom">{title}</h2>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-light mt-auto py-3">
          <div className="container-fluid bg-secondary text-dark text-center py-3">
            <h4>Feel free to reach out!</h4>
            <button className="btn btn-light btn-lg btn-custom">Contact Me</button>
          </div>
          <div className="container muted">
            {/* <span className="text-muted text-white">The images belong to &#169;Lalit Sawant</span> */}
          </div>
        </footer>
      </div>
    )
 }
 
 export default Base