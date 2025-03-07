import React from "react";
import { useAuthStore } from "../../store/uselog";
import "./index.scss";

const Profile = () => {
    const { username, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <p className="profile-message">Please log in to view your profile.</p>;
    }

    return (
        <div className="profile-card">
            <div className="profile-header">
                <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User Avatar"
                    className="profile-avatar"
                />
                <h2>{username}</h2>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Member Since:</strong> 2023</p>
            </div>
        </div>
    );
};

export default Profile;
