import getApplicant from "./getApplicant";

const get = async () => {
  console.log(await getApplicant("23423"));
};

get();
