export const CARD_STYLE = (theme) => ({
  card: {
    // height: "100px",
    borderColor: theme.palette.primary[500],
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
  cardContent: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  cardActions: {
    display: "flex",
  },
});
