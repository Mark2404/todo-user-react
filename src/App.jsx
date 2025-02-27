import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser } from "./redux/slices/dataSlice";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUserTie, faUser } from "@fortawesome/free-solid-svg-icons";

import "./utils/i18n";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [working, setWorking] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [editingIndex, setEditingIndex] = useState(null);

  const currentLanguage = i18n.language;
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSubmit = () => {
    if (name.trim() === "" || surname.trim() === "" || profession.trim() === "" || phone.trim() === "") return;

    const userData = { name, surname, profession, phone, working };

    if (editingIndex !== null) {
      dispatch(editUser({ index: editingIndex, newData: userData }));
      setEditingIndex(null);
    } else {
      dispatch(addUser(userData));
    }

    setName("");
    setSurname("");
    setProfession("");
    setPhone("");
    setWorking(false);
  };

  return (
    <div className="container">
      <aside>
        <button className="langBtn" onClick={() => {
          const newLanguage = currentLanguage === "ru" ? "uz" : "ru";
          i18n.changeLanguage(newLanguage);
        }}>{currentLanguage === "ru" ? "Uz" : "Ru"}</button>
        <input
          type="text"
          placeholder={t("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("surname")}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("job")}
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
        <input
          type="number"
          placeholder={t("age")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={working}
            onChange={(e) => setWorking(e.target.checked)}
          /> {t("hasWork")}
        </label>
        <button className="submitBtn" onClick={handleSubmit}>
          {editingIndex !== null ? t("save") : t("add")}
        </button>

      </aside>
      <div className="users">
        {users.map((user, index) => (
          <div className="user-card" key={index}>
            <FontAwesomeIcon icon={faUser} size="3x" />
            <h3>{user.name} {user.surname}</h3>
            <p>{user.profession}</p>
            <p>{user.phone}</p>
            <p>
              {user.working ? (
                <>
                  <FontAwesomeIcon icon={faUserTie} style={{ color: "#74C0FC" }} /> {t("working")}
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#ff0000" }} /> {t("notWorking")}
                </>
              )}
            </p>


            <div className="actions">
              <button onClick={() => {
                setEditingIndex(index);
                setName(user.name);
                setSurname(user.surname);
                setProfession(user.profession);
                setPhone(user.phone);
                setWorking(user.working);
              }}>
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button onClick={() => dispatch(deleteUser(index))}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
