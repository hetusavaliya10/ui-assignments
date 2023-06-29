export const cookieOptions = {
  path: "/",
};

export const deleteCookie = (cname) => {
  document.cookie = cname + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie?.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c?.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c?.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
