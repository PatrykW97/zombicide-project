import React from "react";
import Zombiecard from "./Zombiecard";

const Zombiepage = ({
  getZombieResult,
  setGetZombieResult,
  jwt,
  getZombieData,
  isLogged
}) => {
  return (
    <div className="zombie-page">
      {getZombieResult.map((zombie) => (
        <Zombiecard
          zombie={zombie.attributes}
          zombieId={zombie.id}
          setGetZombieResult={setGetZombieResult}
          getZombieResult={getZombieResult}
          jwt={jwt}
          getZombieData={getZombieData}
          isLogged={isLogged}
        />
      ))}
    </div>
  );
};

export default Zombiepage;
