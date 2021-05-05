import createStage from "./createStage";
const create = async () => {
  const stage = {
    FUNNEL_ID: "Po_i3TKoIurkqDfK35Ytf9RW_",
    DESCRIPTION: "Applicants should be reviewed here",
    TITLE: "Final Review",
    FUNNEL_TITLE: "Wiretapper", // TODO, get the funnel info in the create stage call!
  };
  console.log(await createStage(stage));
};

create();
