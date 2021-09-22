import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((users) => users._id !== userId.target.id));
  };

  const renderPhrase = (number) => {
    const lastTwoDigitsOfNumber = number % 100;
    const lastDigitOfNumber = number % 10;

    if (number === 0) return `Никто с тобой не тусанет`;
    if (
      (lastTwoDigitsOfNumber > 11 && lastTwoDigitsOfNumber < 15) ||
      lastDigitOfNumber === 1
    )
      return `${users.length} человек тусанет с тобой сегодня`;
    if (lastDigitOfNumber > 1 && lastDigitOfNumber < 5)
      return `${users.length} человека тусанут с тобой сегодня`;
    return `${users.length} человек тусанет с тобой сегодня`;
  };

  const getTextClasses = (value) => {
    let classes = "badge m-2 bg-";
    if (value === 0) return (classes += "danger");
    if (value > 0) return (classes += "primary");
    return (classes += value);
  };

  const displayTable = (value) => {
    let classes = "table table-hover";
    if (!value) return (classes += " d-none");
    return classes;
  };

  return (
    <>
      <span className={getTextClasses(users.length)}>
        {renderPhrase(users.length)}
      </span>
      <table className={displayTable(users.length)}>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td key={user.name}>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <span
                    key={user.name + quality._id}
                    className={getTextClasses(quality.color)}
                  >
                    {quality.name}
                  </span>
                ))}
              </td>
              <td key={user.name + user.profession._id}>
                {user.profession.name}
              </td>
              <td key={user.name + user.completedMeetings}>
                {user.completedMeetings}
              </td>
              <td key={user.name + user.rate}>{user.rate} /5</td>
              <td>
                <button
                  id={user._id}
                  onClick={handleDelete}
                  className={"badge bg-danger"}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
