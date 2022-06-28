import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Zombiecard = ({
  zombie,
  zombieId,
  setGetZombieResult,
  getZombieResult,
  jwt,
  getZombieData,
  isLogged
}) => {
  const deleteZombie = () => {
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
        setGetZombieResult(getZombieResult.filter((el) => el.id !== zombieId));
        axios.delete(`http://localhost:1337/api/zombies/${zombieId}`, {
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
  const editZombie = () => {
    if(isLogged==="zalogowano"){
    Swal.fire({
      title: "Edit zombie",
      html: `<input type="text" id="name"  class="swal2-input" placeholder=${zombie.name}>
          <input type="text" id="iloscHp" class="swal2-input" placeholder=${zombie.iloscHP}>
          <input type="text" id="iloscAktywacji" class="swal2-input" placeholder=${zombie.iloscAktywacji}>
          <input type="text" id="zasieg" class="swal2-input" placeholder=${zombie.zasieg}>
          <input type="text" id="czymZabic" class="swal2-input" placeholder=${zombie.czymZabic}>
          <input type="text" id="ileExpa" class="swal2-input" placeholder=${zombie.ileExpa}>`,
      confirmButtonText: "Edit",
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const iloscHp = Swal.getPopup().querySelector("#iloscHp").value;
        const iloscAktywacji =
          Swal.getPopup().querySelector("#iloscAktywacji").value;
        const zasieg = Swal.getPopup().querySelector("#zasieg").value;
        const czymZabic = Swal.getPopup().querySelector("#czymZabic").value;
        const ileExpa = Swal.getPopup().querySelector("#ileExpa").value;
        if (
          !name ||
          !iloscHp ||
          !iloscAktywacji ||
          !zasieg ||
          !czymZabic ||
          !ileExpa
        ) {
          Swal.showValidationMessage(`Sprawdź dane`);
        }
        return {
          name: name,
          iloscHp: iloscHp,
          iloscAktywacji: iloscAktywacji,
          zasieg: zasieg,
          czymZabic: czymZabic,
          ileExpa: ileExpa,
        };
      },
    }).then((result) => {
      axios.put(
        `http://localhost:1337/api/zombies/${zombieId}`,
        {
          data: {
            name: result.value.name,
            iloscHP: result.value.iloscHp,
            iloscAktywacji: result.value.iloscAktywacji,
            zasieg: result.value.zasieg,
            czymZabic: result.value.czymZabic,
            ileExpa: result.value.ileExpa,
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
            Ilość aktywacji: ${result.value.iloscAktywacji}
            Zasięg: ${result.value.zasieg}
            Czym zabić: ${result.value.czymZabic}
            Ile expa: ${result.value.ileExpa}
          `.trim()
      );
      getZombieData();
    });
  }else{
    Swal.fire("nie zalogowano")
  }
  };
  return (
    <div className="zombie-card">
      <h1 className="name">{zombie.name}</h1>
      <h2 className="iloschp">HP:{zombie.iloscHP}</h2>
      <h3 className="iloscRuchow">
        <span>Ilość Aktywacji:</span>
        {zombie.iloscAktywacji}
      </h3>
      <h3 className="skill">
        <span>Zasięg: </span>
        {zombie.zasieg}
      </h3>
      <h3 className="skill">
        <span>Czym zabić:</span> {zombie.czymZabic}
      </h3>
      <h3 className="skill">
        <span>Ile expa:</span> {zombie.ileExpa}
      </h3>
      <div className="btn">
        <button onClick={deleteZombie}>Usuń</button>
        <button onClick={editZombie}>Edytuj</button>
      </div>
    </div>
  );
};

export default Zombiecard;
