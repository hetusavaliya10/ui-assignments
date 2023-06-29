import { toast } from "react-hot-toast";
import { deleteCookie } from "./cookieHelper";
// NOTE: let the team know if you need to make changes to this file because it is used in multiple frameworks
export const loginHandler = (callBack) => {
  if (callBack) callBack();
};

export const logoutHandler = (callBack) => {
  deleteCookie("petcare-token");
  if (callBack) callBack();
};

export const autoLogoutHandler = () => {
  toast.success("You have been logged out");
  const callBack = () => {
    window.location.href = "/ ";
  };
  logoutHandler(callBack);
};
