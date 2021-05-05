import createStage from "./createStage";
const create = async () => {
  const stage = {
    FUNNEL_ID: "St1VHDkB1lwIMGaURozY5yYTN",
    DESCRIPTION: "Applicants should be reviewed here",
    TITLE: "Final Review",
    FUNNEL_TITLE: "Wiretapper", // TODO, get the funnel info in the create stage call!
  };
  console.log(await createStage(stage));
};

create();
