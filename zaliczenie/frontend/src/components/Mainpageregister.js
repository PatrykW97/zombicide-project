import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const Mainpageregister = () => {
  const [getLogin, setGetLogin] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const [getPassword, setGetPassword] = useState("");
  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/auth/local/register", {
        username: `${getLogin}`,
        email: `${getEmail}`,
        password: `${getPassword}`,
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        setGetLogin("");
        setGetPassword("");
        setGetEmail("");
        Swal.fire({
          icon: "success",
          title: "Zarejestrowano pomyślnie",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(function () {
          window.location = "/login";
        });
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Błąd",
        });
      });
  };

  return (
    <div className="login">
      <form onSubmit={register}>
        <h2>Siema wariacie zarejestruj się</h2>
        <input
          type="login"
          placeholder="Wpisz login"
          className="form-control"
          onChange={(e) => setGetLogin(e.target.value)}
          value={getLogin}
        />
        <input
          type="email"
          placeholder="Wpisz email"
          className="form-control"
          onChange={(e) => setGetEmail(e.target.value)}
          value={getEmail}
        />
        <input
          type="password"
          placeholder="Wpisz hasło"
          className="form-control"
          onChange={(e) => setGetPassword(e.target.value)}
          value={getPassword}
        />
        <input type="submit" value="Zarejestruj" className="submit-btn" />
      </form>
    </div>
  );
};

export default Mainpageregister;
