export const CARD_STYLE = (theme) => ({
  card: {
    // height: "100px",
    borderColor: theme.palette.primary[500],
    display: "inline-block",
    marginRight: theme.spacing(1),
    height: "96px",
  },
  cardContent: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    height: "45px",
  },
  cardActions: {
    display: "flex",
    alignItems: "end",
    height: "80px",
  },
});
