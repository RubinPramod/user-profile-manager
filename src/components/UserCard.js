import React, { useState, useContext } from 'react';
import { FiMail, FiPhone, FiGlobe, FiEdit, FiTrash2, FiHeart } from 'react-icons/fi';
import EditModal from './EditModal';
import ConfirmationPopup from './ConfirmationPopup';
import { UserContext } from '../contexts/UserContext';
import { DICEBEAR_URL, errorMessages } from '../utils/constants';

const UserCard = ({ user }) => {
  const [liked, setLiked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deleteUser } = useContext(UserContext);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deleteUser(user.id);
    setShowConfirmation(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100">
        <img src={DICEBEAR_URL(user.username)} className="card-img-top" alt="Avatar" />
        <div className="card-body">
          <h5 className="card-title semi-bold" >{user.name}</h5>
          <p className="card-text mb-1"><FiMail className="me-2" /> {user.email}</p>
          <p className="card-text mb-1"><FiPhone className="me-2" /> {user.phone}</p>
          <p className="card-text mb-1"><FiGlobe className="me-2" /> {user.website}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="cursor-pointer" onClick={() => setLiked(!liked)}>
            {liked ? <FiHeart className="text-danger heart-filled" /> : <FiHeart className="text-danger" />}
          </div>
          <div className="divider"></div>
          <div className="cursor-pointer" onClick={handleEdit}><FiEdit /></div>
          <div className="divider"></div>
          <div className="cursor-pointer" onClick={handleDelete}><FiTrash2 /></div>
        </div>
      </div>
      {showEditModal && <EditModal user={user} onClose={() => setShowEditModal(false)} />}
      {showConfirmation && <ConfirmationPopup
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={confirmDelete}
        message={errorMessages.deleteConfirmation}
      />}
    </div>
  );
};

export default UserCard;
