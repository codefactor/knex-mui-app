import { APIRouter } from "../../routers/APIRouter";

const router = APIRouter();

router.add("get", "/api/logout", {
  execute: async (req, res): Promise<void> => {
    req.session.destroy((error) => {
      res.status(error ? 500 : 200).json({
        success: !error,
      });
    });
  },
});

export default router;
