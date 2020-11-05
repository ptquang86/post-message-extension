export const sendCommand = (command, embeddedId) => {
  const embeddedContentWindow = document.getElementById(embeddedId)
    .contentWindow;
  if (!embeddedContentWindow) {
    console.log("Invalid", embeddedId);
  }
  embeddedContentWindow.postMessage(command, "*");
};

export const getContextId = (name) => {
  return `${name}-${Date.now()}`;
};

export const getItem = (app, name) =>
  window.localStorage.getItem(`${app}-${name}`);
export const setItem = (app, name, value) =>
  window.localStorage.setItem(`${app}-${name}`, value);
