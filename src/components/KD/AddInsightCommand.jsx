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
    minWidth: 360,
    fontSize: "10px",
  },
  button: {
    fontSize: "10px",
  },
}));

function buildCommand(reference, gdcEventName) {
  const referenceKey = reference.includes("/") ? "uri" : "identifier";
  return {
    gdc: {
      product: "dashboard",
      event: {
        name: gdcEventName,
        data: {
          widget: {
            type: "insight",
            ref: {
              [referenceKey]: reference,
            },
          },
        },
      },
    },
  };
}

export default function AddInsightCommand({ sendCommand }) {
  const classes = useStyles();
  const addInsightRef = useRef();

  const addInsight = (_event, gdcEventName) => {
    const reference = addInsightRef.current.value;
    const command = buildCommand(reference, gdcEventName);

    sendCommand(command, gdcEventName);
  };

  const addInsightToDashboard = (event) => addInsight(event, "addWidget");

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <TextField
          required
          id="addInsight"
          label="Your Insight Uri or Identifier"
          inputRef={addInsightRef}
          className={classes.title}
        />
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          color="primary"
          onClick={addInsightToDashboard}
        >
          Add Insight
        </Button>
      </CardActions>
    </Card>
  );
}
