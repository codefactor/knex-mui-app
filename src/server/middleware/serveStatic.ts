import serveStatic from "serve-static";
import { FilterRouter } from "../routers/FilterRouter";
const staticHandler = serveStatic("build", {
  maxAge: process.env.CACHE_MAX_AGE || 63072e6, // 2 years by default
});
export default FilterRouter((req) => {
  // The server.js is also in build directory, don't serve it.
  return req.path !== "/server.js";
}, staticHandler);
