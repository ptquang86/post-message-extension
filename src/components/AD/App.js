import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import EmbeddedGdc from "../EmbeddedGdc";
import ExpansionLogs from "../ExpansionLogs";
import Commands from "./Commands";
import Theme from "../Theme";
import { EMBEDDED_AD } from "./constant";
import { useMessage } from "../../hooks/useMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  logs: {
    overflow: "scroll",
    maxHeight: "800px",
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const {
    innerLogs,
    outerLogs,
    clearInnerLogs,
    clearOuterLogs,
    logCommand,
  } = useMessage();

  return (
    <Theme>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography>Commands</Typography>
              <Commands logCommand={logCommand} />
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper className={classes.logs}>
              <ExpansionLogs
                logs={outerLogs}
                clearLogs={clearOuterLogs}
                isOuter={true}
              />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.logs}>
              <ExpansionLogs logs={innerLogs} clearLogs={clearInnerLogs} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <EmbeddedGdc appName="ad" id={EMBEDDED_AD} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Theme>
  );
}

export default App;
