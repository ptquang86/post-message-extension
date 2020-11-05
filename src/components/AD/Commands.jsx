import React, { Fragment, useState } from "react";
import merge from "lodash/merge";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import OpenCommand from "./OpenCommand";
import SaveCommand from "./SaveCommand";
import OtherCommands from "./OtherCommands";
import ExportCommand from "./ExportCommand";

import { getContextId, sendCommand } from "../../utils";
import { EMBEDDED_AD } from "./constant";

export default function Commands({ logCommand }) {
  const [isWithContextId, setWithContextId] = useState(true);

  const send = (command, contextName) => {
    let newCommand = command;
    if (isWithContextId) {
      newCommand = merge(command, {
        gdc: {
          event: {
            contextId: getContextId(contextName),
          },
        },
      });
    }

    logCommand(newCommand);
    sendCommand(newCommand, EMBEDDED_AD);
  };

  const handleOnChange = (event) => {
    setWithContextId(event.target.checked);
  };

  return (
    <Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={isWithContextId}
            onChange={handleOnChange}
            color="secondary"
          />
        }
        label="Send command with contextId"
      />
      <br />
      <OpenCommand sendCommand={send} />
      <SaveCommand sendCommand={send} />
      <ExportCommand sendCommand={send} />
      <OtherCommands sendCommand={send} />
    </Fragment>
  );
}
