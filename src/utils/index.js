/*global chrome*/

export const sendCommand = (command, embeddedId) => {
  // const embeddedContentWindow = document.getElementById(embeddedId)
  //   .contentWindow;
  // if (!embeddedContentWindow) {
  //   console.log("Invalid", embeddedId);
  // }
  // embeddedContentWindow.postMessage(command, "*");

  // tslint:disable-next-line:no-console
  console.log("Ext: send message start", JSON.stringify(command, null, 2));

  const commandJs = `window.postMessage(${JSON.stringify(command)}, "*");`;
  chrome.devtools.inspectedWindow.eval(commandJs, function (
    result,
    isException
  ) {
    // tslint:disable-next-line:no-console
    console.log(
      "Ext: send message end",
      JSON.stringify(result, null, 2),
      isException
    );
  });
};

export const getContextId = (name) => {
  return `${name}-${Date.now()}`;
};

export const getItem = (app, name) =>
  window.localStorage.getItem(`${app}-${name}`);
export const setItem = (app, name, value) =>
  window.localStorage.setItem(`${app}-${name}`, value);
