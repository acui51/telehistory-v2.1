import Button from "@/components/ui/Button";
import React from "react";
import { useIsMd } from "../../../helpers/helpers";
import { useRouter } from "next/router";

const TelehistoryDefinition = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col justify-center items-center z-10"
      style={{
        height: useIsMd() ? "100vh" : "100%",
        width: useIsMd() ? "55vw" : "100%",
      }}
    >
      <div className="flex items-center fixed mt-80 md:mt-0">
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
              className="animate-spin-slow-once"
            />
          </div>
          <p className="text-white italic">noun</p>
          <p className="text-white headline-light">
            an app that analyzes the history of your telegram chats through data
            visualization
          </p>
          <Button
            className="mt-3 bg-white"
            onClickButton={() => router.push("/messages")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#0088CC"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TelehistoryDefinition;
