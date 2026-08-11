import { weeks } from '../data/schedule';

export const EVENT_START = new Date('2026-11-27T20:00:00+08:00');
export const EVENT_END = new Date('2027-02-20T23:59:59+08:00');
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function getCountdown(target = EVENT_START, now = new Date()) {
  const distance = target.getTime() - now.getTime();

  if (distance <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', complete: true };
  }

  return {
    days: String(Math.floor(distance / (24 * 60 * 60 * 1000))).padStart(2, '0'),
    hours: String(Math.floor((distance / (60 * 60 * 1000)) % 24)).padStart(2, '0'),
    minutes: String(Math.floor((distance / (60 * 1000)) % 60)).padStart(2, '0'),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
    complete: false,
  };
}

export function getEventStatus(now = new Date()) {
  const nowMs = now.getTime();
  const startMs = EVENT_START.getTime();
  const endMs = EVENT_END.getTime();

  if (nowMs < startMs) {
    return {
      phase: 'upcoming',
      label: '活動即將開始',
      detail: '距離 Winter Festival 2026 開幕',
      week: null,
    };
  }

  if (nowMs > endMs) {
    return {
      phase: 'ended',
      label: '本屆活動已結束',
      detail: 'Winter Festival 2026｜冬境之約',
      week: null,
    };
  }

  const rawWeek = Math.floor((nowMs - startMs) / WEEK_MS) + 1;
  const weekNumber = Math.min(Math.max(rawWeek, 1), weeks.length);
  const week = weeks.find((item) => item.num === weekNumber) ?? weeks[0];

  return {
    phase: week.status === 'break' ? 'break' : 'live',
    label: week.status === 'break' ? '春節休息週' : '現正進行中',
    detail: `Week ${week.num}｜${week.title}`,
    week,
  };
}
