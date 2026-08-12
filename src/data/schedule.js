export const scheduleMeta = {
  dateRange: '2026/11/27 — 2027/02/20',
  weeklyTime: '每週五 20:00–22:00',
};

export const weeks = [
  { num: 1, title: '開幕週', status: 'confirmed' },
  { num: 2, title: '終界遠征週', status: 'confirmed' },
  { num: 3, title: '冰雪垂釣週', status: 'confirmed' },
  { num: 4, title: '怪物攻城週', status: 'confirmed' },
  { num: 5, title: '聖誕慶典週', status: 'confirmed', featured: true },
  { num: 6, title: '冬境尋寶週', status: 'confirmed' },
  { num: 7, title: '創作者交流週', status: 'confirmed' },
  { num: 8, title: 'Minecraft 試煉週', status: 'confirmed' },
  { num: 9, title: '規劃中', status: 'planning' },
  { num: 10, title: '規劃中', status: 'planning' },
  { num: 11, title: '春節休息週', status: 'break' },
  { num: 12, title: '閉幕週', status: 'confirmed', featured: true },
];

export const statusLabel = {
  confirmed: '已確定',
  planning: '規劃中',
  break: '休息週',
};
