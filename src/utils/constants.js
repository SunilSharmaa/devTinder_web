export const DEVTINDER_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7000"
    : "/api";