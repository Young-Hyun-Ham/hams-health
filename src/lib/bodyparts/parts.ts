export type BodyPartId =
  | "upperArmFront"
  | "trapsNeck"
  | "upperAbs"
  | "shoulder"
  | "chest"
  | "oblique"
  | "lowerAbs"
  | "neck"
  | "forearm";

export type BodyPart = {
  id: BodyPartId;
  label: string;
  // 3x3 스프라이트용 (0,1,2)
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
  // (옵션) UI용 뱃지 컬러
  badgeClass: string;
};

export const BODY_PARTS: BodyPart[] = [
  { id: "upperArmFront",  label: "상완(팔)",     row: 0, col: 0, badgeClass: "bg-violet-500/90" },
  { id: "trapsNeck",     label: "승모/목덜미",  row: 0, col: 1, badgeClass: "bg-emerald-500/90" },
  { id: "upperAbs",  label: "복부(상)",     row: 0, col: 2, badgeClass: "bg-lime-500/90" },

  { id: "shoulder", label: "어깨",         row: 1, col: 0, badgeClass: "bg-orange-500/90" },
  { id: "chest",     label: "가슴",         row: 1, col: 1, badgeClass: "bg-rose-500/90" },
  { id: "oblique",  label: "옆구리",       row: 1, col: 2, badgeClass: "bg-sky-500/90" },

  { id: "lowerAbs",  label: "하복부",       row: 2, col: 0, badgeClass: "bg-pink-500/90" },
  { id: "neck",      label: "목",           row: 2, col: 1, badgeClass: "bg-yellow-400/90" },
  { id: "forearm",  label: "전완(팔뚝)",   row: 2, col: 2, badgeClass: "bg-fuchsia-500/90" },
];

export function getPart(id: string) {
  return BODY_PARTS.find((p) => p.id === id);
}
