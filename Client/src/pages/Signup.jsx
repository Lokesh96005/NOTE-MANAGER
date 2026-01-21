import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();

  const [signupdata, setSignupdate] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignupdate({ ...signupdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupdata;

    if (!name || !email || !password) {
      return toast.error("Input fields should not be empty");
    }
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signup', signupdata);
      toast.success(res.data.message);
      return navigate('/login');
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-4">
        <div className="card border border-secondary shadow-sm">
          <div className="card-header bg-warning text-center">
            <h4 className="mb-0">Signup</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  value={signupdata.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="User Email"
                  value={signupdata.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="User Password"
                  value={signupdata.password}
                  onChange={handleChange}
                  name="password"
                />
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-semibold">
                <i className="fa fa-user-plus me-2"></i> Signup
              </button>
            </form>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;