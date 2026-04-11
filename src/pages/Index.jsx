import { useEffect, useState } from "react";
import BodyWrapper from "../components/Core/BodyWrapper/BodyWrapper";
import Header from "../components/Core/Header/Header";
//import SystemConsole from "../components/Core/SystemConsole/SystemConsole";
import GameContent from "../components/App/GameContent/GameContent";
import IndexStyle from "./index.style";
import useSystemFeed from "../hooks/useSystemFeed";
import SelectGame from "../components/App/SelectGame/SelectGame";


function Home() {
    const lines = useSystemFeed({ limit: 50, maxLines: 6 });

  return (
    <>
      <BodyWrapper parentClass="chose-game-page">
         <IndexStyle> 
          <Header/>
          <div className="">
            {/* .home-hero */}
            {/*<div className="hero-console">
              <SystemConsole lines={lines} />
            </div>*/}

            <div className="hero-actions">
              {/* <GameContent /> */}
              <SelectGame/>
            </div>
          </div>
         </IndexStyle> 
      </BodyWrapper>
    </>
  );
}

export default Home;
