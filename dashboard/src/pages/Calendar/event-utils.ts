let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Code header',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Học tiếng anh',
    start: todayStr + 'T12:00:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}
