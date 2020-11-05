import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  heading: {
    padding: "5px",
    margin: "5px",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  clearButton: {
    position: "absolute",
    top: -10,
    right: 0,
  },
}));

function PostMessageStructure(props) {
  const classes = useStyles();
  const { timestamp, description, direction, expanded } = props;
  const [isExpand, setExpand] = useState(expanded);

  function onChange(_event, expanded) {
    setExpand(Boolean(expanded));
  }

  // collapse log item whenever new first log item is added
  useEffect(() => {
    setExpand(Boolean(expanded));
  }, [expanded]);

  return (
    <ExpansionPanel expanded={isExpand} onChange={onChange}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          className={classes.heading}
        >{`${timestamp} - ${direction}`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TextField
          fullWidth
          multiline
          rowsMax={20}
          variant="outlined"
          value={JSON.stringify(description, null, "\t")}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default function ExpansionPostMessageStructure(props) {
  const { logs = [], clearLogs } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Post Message Structure</Typography>
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
          <PostMessageStructure
            key={id}
            timestamp={timestamp}
            description={description}
            direction={direction}
            expanded={expanded}
            index={index}
          />
        );
      })}
    </div>
  );
}
