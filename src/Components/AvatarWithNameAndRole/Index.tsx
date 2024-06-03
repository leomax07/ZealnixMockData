interface AvatarProps {
  profilePic?: string;
  name?: string;
  role?: string;
}
function AvatarWithNameAndRole({ profilePic, name, role }: AvatarProps) {
  return (
    <div className="avatar__image__container">
      <div className="image__container">
        <img src={profilePic} alt="profilePic" />
      </div>
      <div className="details__container">
        <p className="name">{name}</p>
        <p className="role">{role}</p>
      </div>
    </div>
  );
}

export default AvatarWithNameAndRole;
