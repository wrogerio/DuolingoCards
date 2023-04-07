export const GetAll = async () => {
  console.log("GetAll");
  const response = await fetch(`/api/unities`);
  const data = await response.json();
  return data;
};
