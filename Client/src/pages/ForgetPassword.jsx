import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Provide email');

    try {
      const res = await axios.post('http://localhost:3000/api/v1/otp/create', { email });
      toast.success(res.data.message);
      setIsVerifyOtp(true);
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error('Provide OTP');

    try {
      const res = await axios.post('http://localhost:3000/api/v1/otp/verify', { email, otp });
      toast.success(res.data.message);
      setIsResetPassword(true);
      setIsVerifyOtp(false);
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!password) return toast.error('Provide password');

    try {
      const res = await axios.post('http://localhost:3000/api/v1/otp/password', { password, email });
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-4">
        <div className="card border border-secondary shadow-sm">
          <div className="card-header bg-warning text-center">
            <h4 className="mb-0">Forget Password</h4>
          </div>
          <div className="card-body">
            {!isVerifyOtp && !isResetPassword && (
              <form onSubmit={handleGetOtp}>
                <label className="form-label fw-semibold">Enter your email to generate OTP</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-3"
                />
                <button className="btn btn-warning w-100 fw-semibold" type="submit">
                  Get OTP
                </button>
              </form>
            )}

            {isVerifyOtp && (
              <form onSubmit={handleSendOtp}>
                <label className="form-label fw-semibold">Enter the OTP</label>
                <input
                  type="text"
                  value={otp}
                  placeholder="OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-control mb-3"
                />
                <button className="btn btn-warning w-100 fw-semibold" type="submit">
                  Verify OTP
                </button>
              </form>
            )}

            {isResetPassword && (
              <form onSubmit={handleChangePassword}>
                <label className="form-label fw-semibold">Enter New Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-3"
                />
                <button className="btn btn-warning w-100 fw-semibold" type="submit">
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;