import React from 'react'

function Forbiden() {

  // chưa xửa lý logic

  return (
    <>
      <div className=" pt-4 px-4">
        <div className="row vh-100 rounded align-items-center justify-content-center mx-0">
          <div className="col-md-6 text-center p-4">
            <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
            <h1 className="display-1 fw-bold">401</h1>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">We apologize, but you are attempting to access a page for which you do not have permission. 
            Please return to our homepage or try again with other pages?</p>
            <a className="btn btn-primary rounded-pill py-3 px-5" href="">Go Back To Home</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forbiden