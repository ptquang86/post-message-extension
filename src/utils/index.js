/*global chrome*/

export const backgroundPageConnection = chrome.runtime.connect({
  name: "panel",
});

backgroundPageConnection.postMessage({
  name: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
});

// backgroundPageConnection.onMessage.addListener((message) => {
//   // tslint:disable-next-line:no-console
//   console.log("Quang: dev tools", JSON.stringify(message, null, 2));
// });

export const sendCommand = (command, embeddedId) => {
  backgroundPageConnection.postMessage({
    name: "command",
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: command || {},
  });
};

export const getContextId = (name) => {
  return `${name}-${Date.now()}`;
};

export const getItem = (app, name) =>
  window.localStorage.getItem(`${app}-${name}`);
export const setItem = (app, name, value) =>
  window.localStorage.setItem(`${app}-${name}`, value);
