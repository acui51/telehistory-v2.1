import React from "react";
import { useIsMd } from "../../../helpers/helpers";

const TelehistoryDefinition = () => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        height: useIsMd() ? "100vh" : "100%",
        width: useIsMd() ? "55vw" : "100%",
      }}
    >
      <div className="flex items-center fixed mt-72 md:mt-0">
        <div style={{ maxWidth: "450px" }}>
          <div className="flex items-center">
            <p className="display-heavy text-white mr-2">
              Tele
              <div
                className="inline-block align-middle bg-white mx-2"
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
              history
            </p>
            <img
              src="/telehistory.png"
              alt="telehistory"
              width={43}
              height={43}
            />
          </div>
          <p className="text-white italic">noun</p>
          <p className="text-white headline-light">
            an app that analyzes the history of your telegram chats through data
            visualization
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelehistoryDefinition;
