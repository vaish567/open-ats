import getAllByType from "./getAllByType";

const getAll = async () => {
  let x = await getAllByType("Applic");
  console.log(x);
};

getAll();
