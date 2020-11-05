import React, { Fragment, useState } from "react";
import merge from "lodash/merge";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core";

import EditCommand from "./EditCommand";
import SaveCommand from "./SaveCommand";
import CancelCommand from "./CancelCommand";
import AddFilterCommand from "./AddFilterCommand";
import ExportCommand from "./ExportCommand";

import { getContextId, sendCommand } from "../../utils";
import { EMBEDDED_KD } from "./Constant";
import { CARD_STYLE } from "../../styles";
import AddInsightCommand from "./AddInsightCommand";
import AddKpiWidgetCommand from "./AddKpiWidgetCommand";

const useStyles = makeStyles((theme) => ({
  ...CARD_STYLE(theme),
  projectId: {
    minWidth: 300,
    marginRight: theme.spacing(1),
  },
  insightId: {
    minWidth: 150,
  },
  button: {
    fontSize: "10px",
  },
}));

export default function Commands({ logCommand }) {
  const classes = useStyles();
  const [isWithContextId] = useState(true);

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
    sendCommand(newCommand, EMBEDDED_KD);
  };

  return (
    <Fragment>
      <Card className={classes.card} variant="outlined">
        <CardActions>
          <ExportCommand sendCommand={send} />
          <AddFilterCommand sendCommand={send} />
          <AddKpiWidgetCommand sendCommand={send} />
        </CardActions>
        <CardActions>
          <CancelCommand sendCommand={send} />
          <EditCommand sendCommand={send} />
        </CardActions>
      </Card>
      <SaveCommand sendCommand={send} />
      <AddInsightCommand sendCommand={send} />
    </Fragment>
  );
}
