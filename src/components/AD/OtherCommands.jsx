import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { CARD_STYLE } from "../../styles";

const useStyles = makeStyles((theme) => ({
  ...CARD_STYLE(theme),
  button: {
    fontSize: "10px",
  },
}));

function buildCommand(name) {
  return {
    gdc: {
      product: "analyticalDesigner",
      event: {
        name,
      },
    },
  };
}

export default function OtherCommands({ sendCommand }) {
  const classes = useStyles();

  const handleAction = (event) => {
    event.preventDefault();

    const command = buildCommand(event.currentTarget.id);
    sendCommand(command, event.currentTarget.id);
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          className={classes.button}
          id="undo"
          variant="outlined"
          color={"primary"}
          onClick={handleAction}
        >
          Undo
        </Button>
        <Button
          size="small"
          className={classes.button}
          id="redo"
          variant="outlined"
          color={"primary"}
          onClick={handleAction}
        >
          Redo
        </Button>
        <Button
          size="small"
          className={classes.button}
          id="clear"
          variant="outlined"
          color={"primary"}
          onClick={handleAction}
        >
          Clear
        </Button>
      </CardActions>
    </Card>
  );
}
