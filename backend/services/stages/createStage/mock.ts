import createStage from "./createStage";
import getAllByType from "../../getAllByType/getAllByType";
const create = async () => {
  let allFunnels: any[] | { message: string } = await getAllByType("Funnel");
  let desiredFunnelId = allFunnels.filter((funnel) => {
    return funnel.FUNNEL_TITLE.S == "Software Engineer";
  });
  console.log(allFunnels);

  let funnelId = desiredFunnelId[0].FUNNEL_ID.S;
  let funnelTitle = desiredFunnelId[0].FUNNEL_TITLE.S;
  const stage = {
    PK: "dsad",
    SK: "sdsa",
    FUNNEL_ID: funnelId,
    TITLE: "Final Review",
    FUNNEL_TITLE: funnelTitle,
  };
  console.log(await createStage(stage));
};

create();
