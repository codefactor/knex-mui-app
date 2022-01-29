import { useEffect, useState } from "react";

export type TimeUnit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "year";

export interface TimeStringConfig {
  maxUnitCount: number;
  minUnit: TimeUnit;
  maxUnit: TimeUnit;
}

export const defaultConfig: TimeStringConfig = {
  maxUnitCount: 2,
  minUnit: "second",
  maxUnit: "year",
};

const divisorLookup: Record<TimeUnit, number> = {
  millisecond: 1,
  second: 1000,
  minute: 60,
  hour: 60,
  day: 24,
  year: 365,
};
Object.entries(divisorLookup).reduce((divisor, [d, v]) => {
  return (divisorLookup[d as TimeUnit] = divisor * v);
}, 1);

export const TIME_UNITS = divisorLookup;

export function useEllapsedTime(
  startTime: number | Date = 0,
  config: TimeStringConfig = defaultConfig
): string {
  const [ellapsedTime, setEllapsedTime] = useState(() =>
    getEllapsedTimeString(startTime, config)
  );
  useEffect(() => {
    const updateNow = () =>
      setEllapsedTime(getEllapsedTimeString(startTime, config));
    if (ellapsedTime === "unknown" && startTime !== 0) {
      updateNow();
    }
    const interval = setInterval(updateNow, getUpdateInterval(config.minUnit));
    return () => clearInterval(interval);
  }, [startTime, config, ellapsedTime]);
  return ellapsedTime;
}

export function getEllapsedTimeString(
  startTime: number | Date = 0,
  config?: TimeStringConfig
) {
  if (startTime === 0) {
    return "unknown";
  }
  if (startTime instanceof Date) {
    startTime = startTime.getTime();
  }
  return getTimeString(new Date().getTime() - startTime, config);
}

export function getTimeString(
  ellapsedTime: number,
  { maxUnitCount, minUnit, maxUnit }: TimeStringConfig = defaultConfig
): string {
  let totalTime = ellapsedTime;
  const order = Object.keys(divisorLookup) as TimeUnit[];
  const parts = order
    .slice(order.indexOf(minUnit), order.indexOf(maxUnit) + 1)
    .reverse();
  const results: string[] = [];
  parts.every((unit, i) => {
    const div = divisorLookup[unit];
    const exactCount = totalTime / div;
    const floor = Math.floor(exactCount);
    const rounded = Math.round(exactCount * 10) / 10;
    const unitCount =
      (i === parts.length - 1 && results.length === 0) ||
      (floor > 0 && results.length === maxUnitCount - 1)
        ? rounded
        : floor;
    if (unitCount > 0) {
      results.push(`${unitCount} ${unit}${unitCount === 1 ? "" : "s"}`);
    }
    totalTime -= div * unitCount;
    return results.length < maxUnitCount;
  });
  return results.join(" ");
}

export function getUpdateInterval(minUnit: TimeUnit) {
  const minTime = 500; // half second
  const maxTime = 360000; // 6 minutes
  let updateTime = divisorLookup[minUnit] / 2;
  return Math.min(maxTime, Math.max(minTime, Math.round(updateTime)));
}
