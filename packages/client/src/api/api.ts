import { getCodeSandboxHost } from "@codesandbox/utils";
const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

  //we can memoize the function call instead of hitting api
export const getHotelsByQuery = async (query: string) => {
  try {
    const data = await fetch(`${API_URL}/hotels?query=${query}`);
    return await data.json();
  } catch (error) {
    console.error("Error occurred fetching hotels" + error);
  }
};
