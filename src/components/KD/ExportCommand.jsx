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
  },
}));

function buildCommand() {
  return {
    gdc: {
      product: "dashboard",
      event: {
        name: "exportToPDF",
      },
    },
  };
}

export default function ExportCommand({ sendCommand }) {
  const classes = useStyles();

  const exportDashboard = (event) => {
    event.preventDefault();

    const command = buildCommand();

    sendCommand(command, "exportToPDF");
  };

  return (
    <Button
      className={classes.button}
      size="small"
      variant="outlined"
      color="primary"
      onClick={exportDashboard}
    >
      Export To PDF
    </Button>
  );
}
