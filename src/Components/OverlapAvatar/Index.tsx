import { useEffect, useState } from "react";

interface UserObject {
  name?: string;
  imageUrl?: string;
}

interface Props {
  users: UserObject[];
}
function OverlapAvatar({ users }: Props) {
  const [userList, setUserList] = useState<UserObject[]>([]);

  useEffect(() => {
    if (users.length > 4) {
      const sliced = users.slice().slice(0, 4);
      setUserList(sliced);
    } else {
      setUserList(users);
    }
  }, [users]);

  return (
    <div className="overlap__avatar__container">
      {userList.map((user, idx) => {
        if (idx === 3) {
          return (
            <div className="image__container remaining__count move__to__left">
              {" "}
              +{users.length - 3}
            </div>
          );
        }

        return (
          <div
            className={
              idx ? "move__to__left image__container" : "image__container"
            }
            style={{ zIndex: 4 - idx }}
          >
            <img src={user.imageUrl} alt="user" />
          </div>
        );
      })}
    </div>
  );
}

export default OverlapAvatar;
