import createFunnel from "./createFunnel";

const create = async () => {
  const newFunnel = {
    title: "Boston",
    locations: ["Remote"],
    description: "Come work for us!",
  };
  console.log(await createFunnel(newFunnel));
};

create();
