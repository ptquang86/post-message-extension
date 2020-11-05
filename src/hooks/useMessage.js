import { useEffect, useState } from "react";

export const useMessage = () => {
  const [logs, setLogs] = useState([]);

  const logCommand = (command) => {
    setLogs([
      {
        id: Date.now(),
        direction: "outer to embedded",
        timestamp: new Date().toLocaleTimeString(),
        description: command.gdc,
      },
      ...logs,
    ]);
  };

  const handleReceiveMessage = (event) => {
    if (!event || !event.data) {
      return false;
    }

    let gdc;
    if (typeof event.data === "string") {
      try {
        const data = JSON.parse(event.data);
        gdc = data && data.gdc;
      } catch (_) {}
    } else {
      gdc = event.data.gdc;
    }

    if (gdc) {
      setLogs((prevLogs) => [
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

  const clearLogs = () => setLogs([]);

  useEffect(() => {
    window.addEventListener("message", handleReceiveMessage);

    return function unhandleReceiveMessage() {
      window.removeEventListener("message", handleReceiveMessage);
    };
  }, []);

  return {
    logs,
    setLogs,
    clearLogs,
    logCommand,
  };
};
