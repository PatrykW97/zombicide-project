import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const Mainpagelogin = ({
  setJwt,
  setIsLogged,
  getMessage,
  setLoginMessage,
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: `${login}`,
        password: `${password}`,
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        setJwt(response.data.jwt);
        setLogin("");
        setPassword("");
        setIsLogged("zalogowano");
        getMessage(
          "Zombicide: Czarna Plaga to kooperacyjna gra planszowa, w której gracze wcielają się w Ocalałych, próbujących przetrwać apokalipsę Zombie. Czarna Plaga stanowi jedną z części kultowego cyklu Zombicide, do którego należą takie tytuły tak Zombicide: Zielona Horda czy Zombicide 2.0. "
        );
        setLoginMessage("");
        Swal.fire({
          icon: "success",
          title: "Zalogowano",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Błędne hasło bądź login",
        });
      });
  };

  return (
    <div className="login">
      <form onSubmit={loginHandler}>
        <h2>Siema wariacie zaloguj się</h2>
        <input
          type="login"
          placeholder="Wpisz login"
          className="form-control"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        <input
          type="password"
          placeholder="Wpisz hasło"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" value="Zaloguj" className="submit-btn" />
      </form>
    </div>
  );
};

export default Mainpagelogin;
