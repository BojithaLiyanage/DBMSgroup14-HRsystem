export function getUserLevel() {
  const userlevel = sessionStorage.getItem("paygrade");
  return userlevel;
}
