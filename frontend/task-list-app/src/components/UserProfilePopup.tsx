import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Box, Typography } from '@mui/material';
import { User } from '../interfaces/User';
import userService from '../services/userService';
import '../assets/css/UserProfilePopup.css';

interface UserProfilePopupProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onUpdateProfilePicture: () => void;
  onDeleteProfilePicture: () => void;
}

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({ user, open, onClose, onUpdateProfilePicture, onDeleteProfilePicture }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setProfilePicturePreview(null);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile && user.id) {
      try {
        await userService.updateProfilePicture(user.id, selectedFile);
        onUpdateProfilePicture();
        setSelectedFile(null);
        onClose();
      } catch (error) {
        console.error('Failed to update profile picture:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <Box className="profile-popup-container">
          <Avatar alt={user.username} src={profilePicturePreview || user.profilePictureFileName || ''} className="profile-avatar" />
          <Typography className="profile-username">{user.username}</Typography>
          <Typography className="profile-email">{user.email}</Typography>
          <Box className="file-input-container">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <label htmlFor="file-input">
              <Button variant="contained" component="span" className="file-input-label">
                Choose File
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadClick}
              className="upload-button"
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} className="button-close">Close</Button>
        <Button onClick={onDeleteProfilePicture} className="button-delete">Delete Profile Picture</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfilePopup;
