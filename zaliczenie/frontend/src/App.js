import { useState } from "react";
import logo from "./images/logo.png";
import "./styles/app.scss";
import axios from "axios";
import Characterpage from "./components/Characterpage";
import Addcharacter from "./components/Addcharacter";
import Zombiepage from "./components/Zombiepage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Addzombie from "./components/Addzombie";
import Navbar from "./components/Navbar";
import Mainpagelogin from "./components/Mainpagelogin";
import Mainpageregister from "./components/Mainpageregister";
import Mainpage from "./components/Mainpage";


function App() {
  const [getCharacterResult, setGetCharacterResult] = useState([]);
  const [getZombieResult, setGetZombieResult] = useState([]);
  const [jwt, setJwt] = useState("");
  const [isLogged, setIsLogged] = useState("nie-zalogowano");
  const [message, getMessage] = useState(
    "Aby mieć pogląd na tą stronę musisz się zalogować"
  );
  const [loginMessage, setLoginMessage] = useState("Aby móc korzystać z tej funkcji musisz się zalogować");
  

  const getCharacterData = () => {
    axios
      .get("http://localhost:1337/api/characters", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response);
        setGetCharacterResult(response.data.data);
        console.log(getCharacterResult);
      });
  };
  const getZombieData = () => {
    axios
      .get("http://localhost:1337/api/zombies", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setGetZombieResult(response.data.data);
      });
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          logo1={logo}
          getCharacterData={getCharacterData}
          getZombieData={getZombieData}
        />
        <Routes>
          <Route
            path="characters"
            element={
              <Characterpage
                getCharacterResult={getCharacterResult}
                setGetCharacterResult={setGetCharacterResult}
                jwt={jwt}
                getCharacterData={getCharacterData}
                isLogged={isLogged}
              />
            }
          />
          <Route
            path="zombie"
            element={
              <Zombiepage
                getZombieResult={getZombieResult}
                setGetZombieResult={setGetZombieResult}
                jwt={jwt}
                getZombieData={getZombieData}
                isLogged={isLogged}
              />
            }
          />
          <Route path="/" element={<Mainpage message={message} />} />
          <Route
            path="login"
            element={
              <Mainpagelogin
                setJwt={setJwt}
                setIsLogged={setIsLogged}
                getMessage={getMessage}
                setLoginMessage={setLoginMessage}
              />
            }
          />
          <Route path="register" element={<Mainpageregister />} />
          <Route path="addcharacter" element={<Addcharacter jwt={jwt} loginMessage={loginMessage} isLogged={isLogged}/>} />
          <Route path="addzombie" element={<Addzombie jwt={jwt} loginMessage={loginMessage} isLogged={isLogged}/>} />
        </Routes>
      </Router>
      <footer className={isLogged}>
        <h2>{isLogged}</h2>
      </footer>
    </div>
  );
}

export default App;
