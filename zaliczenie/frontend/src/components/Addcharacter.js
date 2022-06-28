import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Addcharacter = ({jwt,loginMessage,isLogged}) => {
  const [postName, setPostName] = useState("");
  const [postIloscHp, setPostIloscHp] = useState("");
  const [postSkill1, setPostSkill1] = useState("");
  const [postSkill2, setPostSkill2] = useState("");
  const [postSkill3, setPostSkill3] = useState("");
  const [postSkill4, setPostSkill4] = useState("");

  const postData = (e) => {
    e.preventDefault();
    if(isLogged==="zalogowano"){
    axios
      .post(`http://localhost:1337/api/characters`, {
        
        data: {
          name: postName,
          iloscHP: postIloscHp,
          skill1: postSkill1,
          skill2: postSkill2,
          skill3: postSkill3,
          skill4: postSkill4,
        }},{
        headers:{
          Authorization:`Bearer ${jwt}`
        },
      })
      .then(() => {
        Swal.fire(
          "Pomyślnie dodano",
          postName,
          postIloscHp,
          postSkill1,
          postSkill2,
          postSkill3,
          postSkill4
        );
        setPostName("");
        setPostIloscHp("");
        setPostSkill1("");
        setPostSkill2("");
        setPostSkill3("");
        setPostSkill4("");
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
    setPostSkill1("");
    setPostSkill2("");
    setPostSkill3("");
    setPostSkill4("");
  };
  
  return (
    <div className="add-character-container">
      <form className="form-character" >
      <h2>{loginMessage}</h2>
      <h2>Tu możesz dodać postać</h2>
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
          placeholder="skill 1"
          onChange={(e) => {
            setPostSkill1(e.target.value);
          }}
          value={postSkill1}
        />

        <input
          type="text"
          className="character-skill2-form"
          placeholder="skill 2"
          onChange={(e) => {
            setPostSkill2(e.target.value);
          }}
          value={postSkill2}
        />

        <input
          type="text"
          className="character-skill3-form"
          placeholder="skill 3"
          onChange={(e) => {
            setPostSkill3(e.target.value);
          }}
          value={postSkill3}
        />

        <input
          type="text"
          className="character-skill4-form"
          placeholder="skill 4"
          onChange={(e) => {
            setPostSkill4(e.target.value);
          }}
          value={postSkill4}
        />

        <div className="btn-holder">
          <button onClick={postData}>Dodaj</button>
          <button onClick={clearPostOutput}>Wyczyść</button>
        </div>
      </form>
    </div>
  );
};

export default Addcharacter;
