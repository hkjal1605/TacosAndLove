import React from "react";

import "./profile-page.styles.scss";
import ProfilePreview from "../../components/profile-preview/profile-preview.component";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ProfilePreview />
    </div>
  );
};

export default ProfilePage;
