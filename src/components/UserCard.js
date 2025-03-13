import React, { useState, useContext } from 'react';
import { FaRegEnvelope, FaPhoneAlt, FaGlobeAmericas, FaRegEdit, FaRegTrashAlt, FaRegHeart, FaHeart } from 'react-icons/fa';
import EditModal from './EditModal';
import ConfirmationPopup from './ConfirmationPopup';
import { UserContext } from '../contexts/UserContext';

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
        <img src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${user.username}?mood=happy`} className="card-img-top" alt="Avatar" style={{ backgroundColor: '#f0f0f0'}} />
        <div className="card-body" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <h5 className="card-title" style={{ fontWeight: '700' }}>{user.name}</h5>
          <p className="card-text mb-1"><FaRegEnvelope className="me-2" /> {user.email}</p>
          <p className="card-text mb-1"><FaPhoneAlt className="me-2" /> {user.phone}</p>
          <p className="card-text mb-1"><FaGlobeAmericas className="me-2" /> {user.website}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="cursor-pointer" onClick={() => setLiked(!liked)}>
            {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart style={{ color: 'red' }} />}
          </div>
          <div className="divider" style={{ width: '1px', height: '20px', backgroundColor: '#ccc' }}></div>
          <div className="cursor-pointer" onClick={handleEdit}><FaRegEdit /></div>
          <div className="divider" style={{ width: '1px', height: '20px', backgroundColor: '#ccc' }}></div>
          <div className="cursor-pointer" onClick={handleDelete}><FaRegTrashAlt /></div>
        </div>
      </div>
      {showEditModal && <EditModal user={user} onClose={() => setShowEditModal(false)} />}
      <ConfirmationPopup
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UserCard;
