import getAllByType from "./getAllByType";

const getAll = async () => {
  console.log(await getAllByType("Stage"));
};

getAll();
