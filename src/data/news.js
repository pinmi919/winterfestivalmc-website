import { assetUrl } from '../utils/assetUrl';

export const newsItems = [
  {
    id: 1,
    title: 'Winter Festival 2026｜冬境之約正式籌備中',
    excerpt: '第一屆 MC Winter Festival 將於 2026 年 11 月 27 日展開，12 週企劃將以創作者交流、共同創作與冬季節慶活動為核心。',
    category: '企劃公告',
    date: '2026/08/11',
    image: assetUrl('pic1.png'),
    featured: true,
    body: [
      'Winter Festival 2026｜冬境之約目前正式進入籌備階段。第一屆活動預定自 2026 年 11 月 27 日展開，並延續至 2027 年 2 月 20 日。',
      '本屆企劃將以 Minecraft Java 創作者之間的交流、共同創作與冬季節慶活動為核心，透過 12 週主題內容串起整個活動週期。',
      '後續包含每週活動細節、參與創作者、伺服器系統與其他官方資訊，將依企劃進度陸續於官網更新。',
    ],
    highlights: [
      '活動期間：2026/11/27 — 2027/02/20',
      'Minecraft Java Edition 1.21.11',
      '12 週創作者冬季聯動企劃',
    ],
  },
  {
    id: 2,
    title: '12 週活動與冬境系統持續開發',
    excerpt: '每週活動、每日任務、每週任務、隱藏任務、冬境幣與 Winter Awards 將共同構成今年冬境之約的主要活動體驗。',
    category: '開發進度',
    date: '2026/08/11',
    image: assetUrl('pic2.png'),
    featured: false,
    body: [
      'Winter Festival 2026 的 12 週活動與核心系統目前持續開發中。已確認的架構包含每週主題活動、個人每日任務、每週合作任務、隱藏任務與冬境幣。',
      '這些系統的目的，是讓整個 12 週企劃彼此連結，而不是只由單次活動構成。Winter Awards 則會在季末作為整體企劃的收束內容之一。',
      '尚未定案的活動細節、獎勵內容與冬境商店項目，將在確認後再正式公布，不會提前放入未確認資訊。',
    ],
    highlights: [
      '每日任務：每日 5 個，23:59 重置',
      '每週合作任務：每週 3 個',
      '隱藏任務：每週 3 個',
      '核心貨幣：冬境幣',
    ],
  },
];

export const newsCategoryClass = {
  企劃公告: 'border-aurora-purple/30 bg-aurora-purple/15 text-aurora-purple',
  開發進度: 'border-aurora-cyan/30 bg-aurora-cyan/15 text-aurora-cyan',
};
