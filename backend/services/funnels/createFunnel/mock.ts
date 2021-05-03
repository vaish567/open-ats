import createFunnel from "./createFunnel";

const create = async () => {
  console.log(
    await createFunnel({
      title: "Wiretapper",
      description: "You will be responsible for wiretapping everyone",
      locations: ["Remote", "NYC"],
      pay: {
        isFixed: true,
        type: "Salary",
        lowEnd: "37,000",
        highEnd: "58,000",
        fixed: "45,000",
        currency: "USD",
      },
    })
  );
};

create();
