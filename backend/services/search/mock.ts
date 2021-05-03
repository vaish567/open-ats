import getAllByType from "./getAllByType";

const getAll = async () => {
  let x = await getAllByType("Stage");
  console.log(x);
};

getAll();
