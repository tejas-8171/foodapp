import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"

export default function Login() {
  let navigate = useNavigate()
  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className='container '>
        <form onSubmit={handleSubmit}>

          <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card bg-dark text-white" style={{ "border-radius": "1 rem" }}>
                    <div className="card-body p-5 text-center">

                      <div className="mb-md-0 mt-md-0 pb-0">

                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                        <div className="form-outline form-white mb-4">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="form-outline form-white mb-1">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                        </div>



                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>



                      </div>

                      <div>
                        <p className="mb-3">Don't have an account? <Link to='/creatuser' className="text-white-50 fw-bold">Create user</Link>
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
