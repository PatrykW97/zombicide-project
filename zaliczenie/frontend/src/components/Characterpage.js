import React from "react";
import Charactercard from "./Charactercard";

const Characterpage = ({
  getCharacterResult,
  setGetCharacterResult,
  jwt,
  getCharacterData,
  isLogged
}) => {
  return (
    <div className="character-page">
        
      {getCharacterResult.map((character) => (
        <Charactercard
          character={character.attributes}
          characterId={character.id}
          setGetCharacterResult={setGetCharacterResult}
          getCharacterResult={getCharacterResult}
          getCharacterData={getCharacterData}
          jwt={jwt}
          isLogged={isLogged}
        />
      ))}
    </div>
  );
};

export default Characterpage;
