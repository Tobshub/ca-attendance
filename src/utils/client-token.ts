const TOKEN = "rccg_ca_attendance_admin_token";

let localStorage: Storage | undefined;

if (typeof window !== "undefined") {
  localStorage = window.localStorage;
}

export const ClientToken = {
  set: (value: string) => {
    if (!localStorage) return undefined;
    // let token = JSON.stringify(value);
    localStorage.setItem(TOKEN, value);
    return value;
  },
  get: () => {
    if (!localStorage) return undefined;
    const token = localStorage.getItem(TOKEN);
    return token ?? undefined;
  },
  remove: () => {
    if (!localStorage) return undefined;
    const token = localStorage.getItem(TOKEN);
    if (token) {
      localStorage.removeItem(TOKEN);
      return token;
    } else {
      return undefined;
    }
  },
};
