import { useEffect, useState } from "react";
import { backgroundPageConnection } from "../utils/index";

export const useMessage = () => {
  const [innerLogs, setInnerLogs] = useState([]);
  const [outerLogs, setOuterLogs] = useState([]);

  const logCommand = (command) => {
    setOuterLogs([
      {
        id: Date.now(),
        direction: command.gdc.event.name,
        timestamp: new Date().toLocaleTimeString(),
        description: command.gdc,
      },
      ...outerLogs,
    ]);
  };

  const handleReceiveMessage = ({ gdc }) => {
    if (gdc) {
      setInnerLogs((prevLogs) => [
        {
          id: Date.now(),
          direction: "embedded to outer",
          timestamp: new Date().toLocaleTimeString(),
          description: gdc,
        },
        ...prevLogs,
      ]);
    }
  };

  const clearInnerLogs = () => setInnerLogs([]);
  const clearOuterLogs = () => setOuterLogs([]);

  useEffect(() => {
    // window.addEventListener("message", handleReceiveMessage);

    // return function unhandleReceiveMessage() {
    //   window.removeEventListener("message", handleReceiveMessage);
    // };

    backgroundPageConnection.onMessage.addListener(handleReceiveMessage);
  }, []);

  return {
    innerLogs,
    outerLogs,
    setInnerLogs,
    setOuterLogs,
    clearInnerLogs,
    clearOuterLogs,
    logCommand,
  };
};
