import createStage from "./createStage";
const create = async () => {
  const stage = {
    FUNNEL_ID: "A50-89RqLWg0Q6_tbCMeSmvH8",
    DESCRIPTION: "Applicants should be reviewed here",
    STAGE_TITLE: "Final Review",
  };
  console.log(await createStage(stage));
};

create();
