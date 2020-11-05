import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  heading: {
    padding: "5px",
    margin: "0",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  clearButton: {
    position: "absolute",
    top: -10,
    right: 0,
  },
  summary: {
    margin: "5px",
  },
}));

function ExpansionLog(props) {
  const classes = useStyles();
  const { timestamp, description, direction, expanded, isOuter } = props;
  const [isExpand, setExpand] = useState(expanded);

  function onChange(_event, expanded) {
    setExpand(Boolean(expanded));
  }

  // collapse log item whenever new first log item is added
  useEffect(() => {
    setExpand(Boolean(expanded));
  }, [expanded]);

  return (
    <Accordion expanded={isExpand} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.summary}
      >
        <Typography className={classes.heading}>
          {`${timestamp} - `}
          {isOuter ? (
            <span>
              {" "}
              Structure for <span className="commandColor">
                {direction}
              </span>{" "}
              Command
            </span>
          ) : (
            direction
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          rowsMax={20}
          variant="outlined"
          value={
            isOuter
              ? `window.postMessage(${JSON.stringify(
                  description,
                  null,
                  "\t"
                )}, "*")`
              : JSON.stringify(description, null, "\t")
          }
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default function ExpansionLogs(props) {
  const { logs = [], clearLogs, isOuter } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>{isOuter ? "Post Messages Structure" : "Logs"} </Typography>
      <IconButton
        onClick={clearLogs}
        aria-label="delete"
        color="secondary"
        className={classes.clearButton}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      {logs.map((log, index) => {
        const { id, timestamp, description, direction } = log;
        const expanded = index === 0;
        return (
          <ExpansionLog
            key={id}
            timestamp={timestamp}
            description={description}
            direction={direction}
            expanded={expanded}
            index={index}
            isOuter={isOuter}
          />
        );
      })}
    </div>
  );
}
