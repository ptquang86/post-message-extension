import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { CARD_STYLE } from "../../styles";

const useStyles = makeStyles((theme) => ({
  ...CARD_STYLE(theme),
  button: {
    fontSize: "10px",
  },
}));

function buildCommand(format, cellMergedChecked, includeFiltersChecked) {
  return {
    gdc: {
      product: "analyticalDesigner",
      event: {
        name: "exportInsight",
        data: {
          config: {
            format,
            mergeHeaders: cellMergedChecked,
            includeFilterContext: includeFiltersChecked,
          },
        },
      },
    },
  };
}

export default function ExportCommand({ sendCommand }) {
  const classes = useStyles();
  const cellMergedRef = useRef();
  const includeFiltersRef = useRef();

  const exportInsight = (
    event,
    format,
    cellMergedChecked,
    includeFiltersChecked
  ) => {
    const command = buildCommand(
      format,
      cellMergedChecked,
      includeFiltersChecked
    );
    sendCommand(command, `exportInsight-${format}`);
  };

  const exportCsv = (event) => exportInsight(event, "csv");
  const exportXlsx = (event) =>
    exportInsight(
      event,
      "xlsx",
      cellMergedRef.current.checked,
      includeFiltersRef.current.checked
    );

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <FormControlLabel
          control={
            <Checkbox
              inputRef={cellMergedRef}
              name="cellMerged"
              color="primary"
            />
          }
          label="Keep attribute cells merged"
        />
        <FormControlLabel
          control={
            <Checkbox
              inputRef={includeFiltersRef}
              name="includeFilters"
              color="primary"
            />
          }
          label="Include applied filters"
        />
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          color={"primary"}
          onClick={exportCsv}
        >
          Export to CSV
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          color={"primary"}
          onClick={exportXlsx}
        >
          Export to XLSX
        </Button>
      </CardActions>
    </Card>
  );
}
