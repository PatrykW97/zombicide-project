import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Addzombie = ({ jwt,loginMessage,isLogged }) => {
  const [postName, setPostName] = useState("");
  const [postIloscHp, setPostIloscHp] = useState("");
  const [postIloscAktywacji, setPostIloscAktywacji] = useState("");
  const [postZasieg, setPostZasieg] = useState("");
  const [postCzymZabic, setCzymZabic] = useState("");
  const [postIleExpa, setPostIleExpa] = useState("");

  const postData = (e) => {
    e.preventDefault();
    if(isLogged==="zalogowano"){
    axios
      .post(
        `http://localhost:1337/api/zombies`,
        {
          data: {
            name: postName,
            iloscHP: postIloscHp,
            iloscAktywacji: postIloscAktywacji,
            zasieg: postZasieg,
            czymZabic: postCzymZabic,
            ileExpa: postIleExpa,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        Swal.fire(
          "Pomyślnie dodano",
          postName,
          postIloscHp,
          postIloscAktywacji,
          postZasieg,
          postCzymZabic,
          postIleExpa
        );
        setPostName("");
        setPostIloscHp("");
        setPostIloscAktywacji("");
        setPostZasieg("");
        setCzymZabic("");
        setPostIleExpa("");
      })
      .catch((err) => Swal.fire("Błąd, sprawdź dane i spróbuj jeszcze raz", err));
    }else{
      Swal.fire("nie zalogowano")
    }
  };
  const clearPostOutput = (e) => {
    e.preventDefault()
    setPostName("");
    setPostIloscHp("");
    setPostIloscAktywacji("");
    setPostZasieg("");
    setCzymZabic("");
    setPostIleExpa("");
  };

  return (
    <div className="add-character-container">
      <form className="form-character">
      <h2>{loginMessage}</h2>
        <h2>Tu możesz dodać zombie</h2>
        <input
          type="text"
          className="character-name-form"
          placeholder="Nazwa"
          onChange={(e) => {
            setPostName(e.target.value);
          }}
          value={postName}
        />

        <input
          type="text"
          className="character-hp-form"
          placeholder="ilosc Hp"
          onChange={(e) => {
            setPostIloscHp(e.target.value);
          }}
          value={postIloscHp}
        />

        <input
          type="text"
          className="character-skill1-form"
          placeholder="Ilość aktywacji"
          onChange={(e) => {
            setPostIloscAktywacji(e.target.value);
          }}
          value={postIloscAktywacji}
        />

        <input
          type="text"
          className="character-skill2-form"
          placeholder="Zasięg"
          onChange={(e) => {
            setPostZasieg(e.target.value);
          }}
          value={postZasieg}
        />

        <input
          type="text"
          className="character-skill3-form"
          placeholder="Czym zabić"
          onChange={(e) => {
            setCzymZabic(e.target.value);
          }}
          value={postCzymZabic}
        />

        <input
          type="text"
          className="character-skill4-form"
          placeholder="Ile expa"
          onChange={(e) => {
            setPostIleExpa(e.target.value);
          }}
          value={postIleExpa}
        />

        <div className="btn-holder">
          <button onClick={postData}>Dodaj</button>
          <button onClick={clearPostOutput}>Wyczyść</button>
        </div>
      </form>
    </div>
  );
};

export default Addzombie;
