import createApplicant from "./createApplicant";

const create = async () => {
  const applicant = {
    email: "josev@openats.app",
    first_name: "Jose",
    last_name: "Valerio",
    phone_number: "4831284473",
    stage_title: "Ready To Drive",
    funnel_id: "123",
  };
  console.log(await createApplicant(applicant));
};

create();
