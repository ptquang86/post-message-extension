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
    minWidth: "125px",
  },
}));

function buildCommand() {
  return {
    gdc: {
      product: "dashboard",
      event: {
        name: "switchToEdit",
      },
    },
  };
}

export default function EditCommand({ sendCommand }) {
  const classes = useStyles();

  const editDashboard = (event) => {
    event.preventDefault();

    const command = buildCommand();

    sendCommand(command, "switchToEdit");
  };

  return (
    <Button
      className={classes.button}
      size="small"
      variant="outlined"
      color={"primary"}
      onClick={editDashboard}
    >
      Edit Dashboard
    </Button>
  );
}
