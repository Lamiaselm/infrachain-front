import create from "../../create";
import endpoints from "./endpoints";

export async function getBalance({ user }) {
  const api = create();
  const response = await api.get(endpoints.getBalance(), {
    user: user,
  });

  return response;
}
export async function getConsumption({ user }) {
  const api = create();
  const response = await api.get(endpoints.getConsumption(), {
    user: user,
  });

  return response;
}
export async function claimReward(data) {
  const api = create();
  console.log("data core", data);
  const response = await api.post(endpoints.claimReward(), data);
  console.log(response);
  return response;
}
export async function generateToken(data) {
  const api = create();
  console.log("data core", data);
  const response = await api.post(endpoints.generateToken(), data);
  console.log(response);
  return response;
}
