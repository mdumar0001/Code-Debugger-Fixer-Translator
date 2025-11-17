import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || ""; // e.g. http://localhost:5000
// default to '/api' if REACT_APP_API_PREFIX is not provided
const apiPrefix = (process.env.REACT_APP_API_PREFIX ?? "/api").replace(
  /\/+$/,
  ""
);

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

function handleError(err) {
  const status = err?.response?.status;
  const data = err?.response?.data;
  const url = err?.config?.url;
  console.warn("API error", { status, url, data, msg: err.message });
  const error = new Error(data?.message || err.message);
  error.status = status;
  error.data = data;
  throw error;
}

function path(p) {
  const route = p.startsWith("/") ? p : `/${p}`;
  return `${apiPrefix}${route}`; // yields "/api/auth/register"
}

function fullUrl(p) {
  const b = baseURL?.replace(/\/+$/, "") || "";
  return `${b}${path(p)}`;
}

export async function registerUser(username, email, password) {
  try {
    console.log("POST ->", fullUrl("/auth/register"));
    const res = await api.post(path("/auth/register"), {
      username,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function loginUser(email, password) {
  try {
    console.log("POST ->", fullUrl("/auth/login"));
    const res = await api.post(path("/auth/login"), { email, password });
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getUser() {
  try {
    console.log("GET ->", fullUrl("/auth/me"));
    const res = await api.get(path("/auth/me"));
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getUserHistory() {
  try {
    console.log("GET ->", fullUrl("/history"));
    const res = await api.get(path("/history"));
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function debugCode(code) {
  try {
    console.log("POST ->", fullUrl("/debug"));
    const res = await api.post(path("/debug"), { code });
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function translateCode(code, toLang) {
  try {
    console.log("POST ->", fullUrl("/translate"));
    const res = await api.post(path("/translate"), { code, to: toLang });
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export default api;
