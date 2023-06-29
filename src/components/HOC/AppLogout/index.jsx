import { useEffect } from "react";
import { autoLogoutHandler } from "../../../helpers/commonHelpers";
import { getCookie } from "../../../helpers/cookieHelper";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  let timer;

  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const logoutAction = () => {
    autoLogoutHandler();
  };

  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      getCookie("petcare-token") && logoutAction();
    }, 120000);
  };

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  return children;
};

export default AppLogout;
