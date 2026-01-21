import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [logindetails, setLogindetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLogindetails({ ...logindetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!logindetails.email) {
      return toast.error("Email field is empty");
    }
    if (!logindetails.password) {
      return toast.error("Password field is empty");
    }

    try {
      const data = await axios.post('http://localhost:3000/api/v1/user/login', logindetails);
      localStorage.setItem('token', data.data.token);
      toast.success(data.data.message);
      return navigate('/dashboard');
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-4">
        <div className="card border border-secondary shadow-sm">
          <div className="card-header bg-warning text-center">
            <h4 className="mb-0">Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="text"
                  name="email"
                  value={logindetails.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={logindetails.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-semibold">
                <i className="fa fa-sign-in me-2"></i> Login
              </button>
            </form>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          <p>
            <Link to="/forgetPassword">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;