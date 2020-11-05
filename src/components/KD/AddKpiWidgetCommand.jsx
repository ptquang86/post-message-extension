import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { CARD_STYLE } from "../../styles";

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
    minWidth: "69px",
  },
}));

function buildCommand() {
  return {
    gdc: {
      product: "dashboard",
      event: {
        name: "addWidget",
        data: {
          widget: {
            type: "kpi",
          },
        },
      },
    },
  };
}

export default function AddKpiWidgetCommand({ sendCommand }) {
  const classes = useStyles();

  const addKpiWidgetToDashboard = (event) => {
    event.preventDefault();

    const command = buildCommand();

    sendCommand(command, "addWidget");
  };

  return (
    <Button
      className={classes.button}
      size="small"
      variant="outlined"
      color="primary"
      onClick={addKpiWidgetToDashboard}
    >
      Add KPI
    </Button>
  );
}
