import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isLoggedIn = loginStatus === "success" && identity !== null;
  const principal = identity?.getPrincipal()?.toText() ?? null;

  return {
    isLoggedIn,
    principal,
    login,
    logout: clear,
    loginStatus,
  };
}
