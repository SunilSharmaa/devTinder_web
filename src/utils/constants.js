export const DEVTINDER_BASE_URL = 
location.hostname === "localhost" ? 
import.meta.env.VITE_DEVTINDER_BACKEND_DEVELOPMENT_URL : 
import.meta.env.VITE_DEVTINDER_BACKEND_PRODUCTION_URL;