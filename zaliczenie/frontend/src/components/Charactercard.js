import axios from "axios";
import Swal from "sweetalert2";

const Charactercard = ({
  character,
  setGetCharacterResult,
  characterId,
  getCharacterResult,
  jwt,
  getCharacterData,
  isLogged
}) => {
  
  const deleteCharacter = () => {
    if(isLogged==="zalogowano"){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setGetCharacterResult(
          getCharacterResult.filter((el) => el.id !== characterId)
        );
        axios.delete(`http://localhost:1337/api/characters/${characterId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        Swal.fire("Deleted", "Character has been deleted.", "success");
      }
    });
  }else{
    Swal.fire("nie zalogowano")
  }
  };
  const editCharacter = () => {
    if(isLogged==="zalogowano"){
    Swal.fire({
      title: "Edit character",
      html: `<input type="text" id="name"  class="swal2-input" placeholder=${character.name}>
    <input type="text" id="iloscHp" class="swal2-input" placeholder=${character.iloscHP}>
    <input type="text" id="skill1" class="swal2-input" placeholder=${character.skill1}>
    <input type="text" id="skill2" class="swal2-input" placeholder=${character.skill2}>
    <input type="text" id="skill3" class="swal2-input" placeholder=${character.skill3}>
    <input type="text" id="skill4" class="swal2-input" placeholder=${character.skill4}>`,
      confirmButtonText: "Edit",
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const iloscHp = Swal.getPopup().querySelector("#iloscHp").value;
        const skill1 = Swal.getPopup().querySelector("#skill1").value;
        const skill2 = Swal.getPopup().querySelector("#skill2").value;
        const skill3 = Swal.getPopup().querySelector("#skill3").value;
        const skill4 = Swal.getPopup().querySelector("#skill4").value;
        if (!name || !iloscHp || !skill1 || !skill2 || !skill3 || !skill4) {
          Swal.showValidationMessage(`Sprawdź dane`);
        }
        return {
          name: name,
          iloscHp: iloscHp,
          skill1: skill1,
          skill2: skill2,
          skill3: skill3,
          skill4: skill4,
        };
      },
    }).then((result) => {
      axios.put(
        `http://localhost:1337/api/characters/${characterId}`,
        {
          data: {
            name: result.value.name,
            iloscHP: result.value.iloscHp,
            skill1: result.value.skill1,
            skill2: result.value.skill2,
            skill3: result.value.skill3,
            skill4: result.value.skill4,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      Swal.fire(
        `
      Zmieniono
      name: ${result.value.name}
      iloscHp: ${result.value.iloscHp}
      skill1: ${result.value.skill1}
      skill2: ${result.value.skill2}
      skill3: ${result.value.skill3}
      skill3: ${result.value.skill4}
    `.trim()
      );
      getCharacterData();
    });
  }else{
    Swal.fire("nie zalogowano")
  }
  };

  return (
    <div className="character-card">
      <h1 className="name">{character.name}</h1>
      <h2 className="iloschp">HP:{character.iloscHP}</h2>
      <h3 className="skill">
        <span>Skill 1: </span>
        {character.skill1}
      </h3>
      <h3 className="skill">
        <span>Skill 2:</span> {character.skill2}
      </h3>
      <h3 className="skill">
        <span>Skill 3:</span> {character.skill3}
      </h3>
      <h3 className="skill">
        <span>Skill 4:</span> {character.skill4}
      </h3>
      <div className="btn">
        <button onClick={deleteCharacter}>Usuń</button>
        <button onClick={editCharacter}>Edytuj</button>
      </div>
    </div>
  );
};

export default Charactercard;
