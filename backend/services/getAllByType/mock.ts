import getAllByType from "./getAllByType";

const getAll = async () => {
  let x = await getAllByType("Applicant");
  console.log(x);
};

getAll();
