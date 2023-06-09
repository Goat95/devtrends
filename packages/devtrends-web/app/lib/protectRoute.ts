import { type AuthResult, getMyAccount } from "./api/auth";
import { applyAuth } from "./applyAuth";

let getMyAccountPromise: Promise<AuthResult> | null = null;
export async function getMemoMyAccount() {
  if (!getMyAccountPromise) {
    getMyAccountPromise = getMyAccount();
  }
  return getMyAccountPromise;
}

export const checkIsLoggedIn = async (request: Request) => {
  const applied = applyAuth(request);
  if (!applied) return false;

  try {
    await getMemoMyAccount();
  } catch (e) {
    return false;
  }
  return true;
};
