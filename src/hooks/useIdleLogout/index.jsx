import { useEffect, useState } from "react";

const useIdleLogout = (logout, idleTime = 120000) => {
  const [timer, setTimer] = useState(null);

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(setTimeout(logout, idleTime));
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [timer, logout]);

  return resetTimer;
};

export default useIdleLogout;
