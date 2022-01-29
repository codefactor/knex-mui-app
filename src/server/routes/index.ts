import { ComboRouter } from "../routers/ComboRouter";
import * as routes from "./api";
const router = ComboRouter(Object.values(routes));
export default router;
