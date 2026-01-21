import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import getuserDetails from '../Utils/getUserDetails';
import toast from 'react-hot-toast';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useUser();
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getuserDetails(setUser);
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }
  }, []);

  const handleUpdatename = async (e) => {
    e.preventDefault();
    if (!name) return toast.error('Input fields cannot be empty');
    if (name === user.name) return toast.error('Current name & updated name cannot be same');

    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        'http://localhost:3000/api/v1/user/name',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(res.data.message);
      getuserDetails(setUser);
      setIsUpdate(false);
      setName('');
    } catch (error) {
      console.log(error);
      return toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdatePass = async (e) => {
    e.preventDefault();
    if (!password || !newpassword) return toast.error('Input fields are empty');

    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        'http://localhost:3000/api/v1/user/password',
        { password, newpassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(res.data.message);
      setIsUpdate(false);
      setPassword('');
      setNewPassword('');
      localStorage.removeItem('token');
      navigate('/login');
      setUser(null);
    } catch (error) {
      console.log(error);
      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4 text-primary">
        <i className="fa fa-user-circle me-2"></i> Profile Settings
      </h2>

      <div className="row">
        <div className="ms-2 col-md-4">
          <div className="card border border-secondary">
            <div className="card-body">
              <h5 className="text-secondary fw-semibold mb-3">
                <i className="fa fa-id-card me-2"></i> Account Information
              </h5>
              <p className="fs-6">
                <strong>Name:</strong> {user?.name}{' '}
                <button
                  className="btn btn-sm btn-outline-primary ms-2"
                  onClick={() => setIsUpdate(isUpdate ? false : 'name')}
                >
                  <i className="fa fa-edit me-1"></i> Update
                </button>
              </p>
              <p className="fs-6">
                <strong>Email:</strong> {user?.email}
              </p>
              <button
                className="btn btn-sm btn-outline-warning mt-2"
                onClick={() => setIsUpdate(isUpdate ? false : 'password')}
              >
                <i className="fa fa-lock me-1"></i> Update Password
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {isUpdate === 'name' && (
            <form className="card p-3 border border-primary mb-3">
              <h6 className="text-primary fw-bold mb-3">
                <i className="fa fa-edit me-2"></i> Update Name
              </h6>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter New Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleUpdatename}>
                <i className="fa fa-save me-2"></i> Save Name
              </button>
            </form>
          )}

          {isUpdate === 'password' && (
            <form className="card p-3 border border-warning">
              <h6 className="text-warning fw-bold mb-3">
                <i className="fa fa-lock me-2"></i> Update Password
              </h6>
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Enter Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Enter New Password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="btn btn-warning" onClick={handleUpdatePass}>
                <i className="fa fa-save me-2"></i> Save Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
