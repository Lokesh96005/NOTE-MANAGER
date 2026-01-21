import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import getuserDetails from '../Utils/getUserDetails';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

async function getNotes(setNotes) {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/api/v1/note', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data.notes);
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
}

function Dashboard() {
  const { user, setUser } = useUser();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getuserDetails(setUser);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    getNotes(setNotes);
  }, []);

  const handleDeleteNote = async (_id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:3000/api/v1/note/delete/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      getNotes(setNotes);
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-gradient display-5">
          <i className="fa fa-sticky-note me-2"></i> My Notes
        </h1>
        <p className="text-muted fs-5">
          Keep your thoughts organized and secure ✨
        </p>
        <hr className="w-25 mx-auto border-3 border-primary rounded-pill" />
      </div>

      {notes.length === 0 ? (
        <div className="alert alert-light border shadow-sm text-center">
          <i className="fa fa-info-circle me-2 text-primary"></i>
          No notes yet. Click “Add Note” to get started!
        </div>
      ) : (
        <div className="row g-4">
          {notes.map((n, i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100 border-0 shadow-lg rounded-4 note-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-semibold">
                    <i className="fa fa-file-text me-2"></i> Note {i + 1}
                  </h5>
                  <p className="card-text flex-grow-1 text-secondary">{n.note}</p>
                  <button
                    className="btn btn-danger mt-auto w-100 rounded-pill delete-btn"
                    onClick={() => handleDeleteNote(n._id)}
                  >
                    <i className="fa fa-trash me-2"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;