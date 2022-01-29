import { Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { getTimeString, useEllapsedTime } from "../../util/time";

export function ServerHealth() {
  const status = useAppSelector((state) => state.userAccount.status);
  const startTime = useAppSelector((state) => state.userAccount.startTime);
  const averagePingTime = useAppSelector(
    (state) => state.userAccount.averagePingTime
  );
  const ellapsedTime = useEllapsedTime(startTime);
  const pingTimeString = averagePingTime
    ? getTimeString(averagePingTime)
    : "unknown";
  if (status !== "idle") {
    return null;
  }
  return (
    <>
      <Typography variant="body1" component="div">
        Alive Time: {ellapsedTime}
      </Typography>
      <Typography variant="body1" component="div">
        Average Ping Time: {pingTimeString}
      </Typography>
    </>
  );
}
