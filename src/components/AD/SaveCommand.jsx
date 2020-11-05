import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CARD_STYLE } from "../../styles";

const useStyles = makeStyles((theme) => ({
  ...CARD_STYLE(theme),
  title: {
    minWidth: 200,
    fontSize: "10px",
  },
  button: {
    fontSize: "10px",
  },
}));

function buildCommand(title, gdcEventName) {
  return {
    gdc: {
      product: "analyticalDesigner",
      event: {
        name: gdcEventName,
        data: {
          title,
        },
      },
    },
  };
}

export default function SaveCommand({ sendCommand }) {
  const classes = useStyles();
  const titleRef = useRef();

  const save = (event, gdcEventName) => {
    const title = titleRef.current.value;
    const command = buildCommand(title, gdcEventName);

    sendCommand(command, gdcEventName);
  };

  const saveInsight = (event) => save(event, "saveInsight");
  const saveAsInsight = (event) => save(event, "saveAsInsight");

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <TextField
          required
          id="title"
          label="Insight Name"
          inputRef={titleRef}
          className={classes.title}
        />
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          color={"primary"}
          onClick={saveInsight}
        >
          Save Insight
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          color={"primary"}
          onClick={saveAsInsight}
        >
          Save Insight As
        </Button>
      </CardActions>
    </Card>
  );
}
