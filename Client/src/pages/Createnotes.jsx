import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import getuserDetails from '../Utils/getUserDetails';
import toast from 'react-hot-toast';
import axios from 'axios';

const Createnotes = () => {
  const [inp, setInp] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getuserDetails(setUser);
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inp) {
      return toast.error('Note cannot be empty');
    }
    try {
      const token = localStorage.getItem('token');
      const data = await axios.post(
        'http://localhost:3000/api/v1/note/create',
        { note: inp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(data.data.message);
      setInp('');
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4 text-primary">
        <i className="fa fa-sticky-note me-2"></i> Create Notes
      </h2>

      <div className="row">
        <div className=" ms-3 col-md-5">
          <div className="card note-card border border-secondary">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Note</label>
                  <textarea
                    className="form-control note-textarea"
                    rows="6"
                    placeholder="Write your note here..."
                    value={inp}
                    onChange={(e) => setInp(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-save me-2"></i> Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createnotes;