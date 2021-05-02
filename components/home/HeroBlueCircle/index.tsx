import React from "react";
import { useIsMd } from "../../../helpers/helpers";

const HeroBlueCircle = () => {
  const isMd = useIsMd();
  return (
    <>
      {isMd ? (
        <div
          className="bg-brand fixed z-[-1]"
          style={{
            width: "100vw",
            height: "100vw",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: `translate(-97%, -50%)`,
          }}
        ></div>
      ) : (
        <div
          className="bg-brand fixed z-0"
          style={{
            width: "100vw",
            height: "25vh",
          }}
        ></div>
      )}
    </>
  );
};

export default HeroBlueCircle;
