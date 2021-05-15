import doesFunnelExist from "./doesFunnelExist";

const check = async () => {
  const response = await doesFunnelExist("vlXTvxE9xOYpuNZfXDZuEQHFV");
  console.log(response);
};
check();
