import doesStageExist from "./doesStageExist";

const check = async () => {
  const response = await doesStageExist("vlXTvxE9xOYpuNZfXDZuEQHFV", "Active");
  console.log(response);
};
check();
