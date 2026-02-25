// src/lib/bodyparts/motions.data.ts

export type LevelKey = "beginner" | "intermediate" | "advanced";

export type Motion = {
  levels: LevelKey;
  label: string;
  labelEn: string;
  frames: string[];
  points: [string, string, string, string];
  frameText: string;
  setScoreText: string;
};

export type PartMotions = {
  id:
    | "upperArmFront" // 상완(앞)
    | "trapsNeck" // 승모/목덜미
    | "upperAbs" // 복부(상)
    | "shoulder" // 어깨
    | "chest" // 가슴
    | "oblique" // 옆구리
    | "lowerAbs" // 하복부
    | "neck" // 목
    | "forearm"; // 전완(팔뚝)
  title: string;
  titleEn: string;
  motions: readonly Motion[];
};

function f(
  partId: string,
  slug: string,
  count: number
): string[] {
  return Array.from({ length: count }, (_, i) =>
    `/bodyparts/${partId}/${slug}/${i + 1}.png`
  );
}

/** 1) 상완(앞) = 이두 */
export const PART_UPPER_ARM_FRONT: PartMotions = {
  id: "upperArmFront",
  title: "상완(앞)",
  titleEn: "Upper Arm (Front) / Biceps",
  motions: [
    // beginner (3)
    {
      levels: "beginner",
      label: "덤벨 컬",
      labelEn: "Dumbbell Curl",
      frames: f("upperArmFront", "biceps-dumbbell-curl", 4),
      points: [
        "팔꿈치를 몸 옆에 고정하고 덤벨을 들어 올림",
        "손목은 중립에 가깝게 유지 (꺾지 않기)",
        "내릴 때 2~3초로 천천히 버티며 이완",
        "반동/어깨 개입 없이 팔로만 수행",
      ],
      frameText: "* 이두 기본기. 반동 없이 천천히.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "beginner",
      label: "해머 컬",
      labelEn: "Hammer Curl",
      frames: f("upperArmFront", "biceps-hammer-curl", 4),
      points: [
        "엄지가 위를 향하도록 덤벨을 잡음",
        "팔꿈치를 뒤로 빼지 말고 고정",
        "상완근/전완 개입으로 팔 두께에 도움",
        "상단에서 1초 수축 후 천천히 하강",
      ],
      frameText: "* 팔 두께(상완근/전완)까지 같이.",
      setScoreText: "3 세트 10 회",
    },
    {
      levels: "beginner",
      label: "케이블 컬",
      labelEn: "Cable Curl",
      frames: f("upperArmFront", "biceps-cable-curl", 4),
      points: [
        "케이블을 아래에서 잡고 팔꿈치를 고정",
        "상단에서 완전 수축 후 잠깐 정지",
        "내릴 때 케이블 장력을 끝까지 유지",
        "허리 젖힘 없이 몸통은 고정",
      ],
      frameText: "* 장력 유지가 쉬워 초급에 안정적.",
      setScoreText: "2 세트 15 회",
    },

    // intermediate (3)
    {
      levels: "intermediate",
      label: "인클라인 덤벨 컬",
      labelEn: "Incline Dumbbell Curl",
      frames: f("upperArmFront", "biceps-incline-dumbbell-curl", 4),
      points: [
        "벤치를 45~60도로 세팅 후 등 기대기",
        "팔이 몸 뒤로 살짝 빠진 상태에서 시작",
        "하단 스트레치를 충분히 느끼며 수행",
        "어깨 말림 없이 가슴을 열고 고정",
      ],
      frameText: "* 하단 스트레치가 큰 이두 자극.",
      setScoreText: "3 세트 10 회",
    },
    {
      levels: "intermediate",
      label: "컨센트레이션 컬",
      labelEn: "Concentration Curl",
      frames: f("upperArmFront", "biceps-concentration-curl", 4),
      points: [
        "팔꿈치를 허벅지 안쪽에 고정하고 컬",
        "상단에서 강하게 쥐어짜듯 수축",
        "반동을 원천 차단해 집중도↑",
        "좌우 반복 수를 동일하게 맞춤",
      ],
      frameText: "* 이두 정점 수축(피크) 강화.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "intermediate",
      label: "바벨 컬",
      labelEn: "Barbell Curl",
      frames: f("upperArmFront", "biceps-barbell-curl", 4),
      points: [
        "어깨너비 그립으로 바벨을 잡음",
        "팔꿈치가 앞으로 나오지 않게 고정",
        "상단에서 상완을 세우며 과수축",
        "하강은 2~3초로 천천히 컨트롤",
      ],
      frameText: "* 중량 진행(프로그레시브)에 유리.",
      setScoreText: "4 세트 8 회",
    },

    // advanced (3)
    {
      levels: "advanced",
      label: "친업",
      labelEn: "Chin-up",
      frames: f("upperArmFront", "biceps-chinup", 4),
      points: [
        "손바닥이 나를 향하도록 바를 잡음",
        "가슴을 바에 가져간다는 느낌으로 당김",
        "하강은 완전 이완까지 천천히",
        "반동 대신 견갑 하강/후인을 먼저",
      ],
      frameText: "* 이두+등 복합. 정확한 폼이 핵심.",
      setScoreText: "4 세트 6~8 회",
    },
    {
      levels: "advanced",
      label: "드래그 컬",
      labelEn: "Drag Curl",
      frames: f("upperArmFront", "biceps-drag-curl", 4),
      points: [
        "바를 몸에 ‘끌어올리며’ 위로 이동",
        "팔꿈치를 뒤로 보내며 이두 집중",
        "어깨 전면 개입을 최소화",
        "상단에서 1초 정지 후 천천히 하강",
      ],
      frameText: "* 어깨 개입 줄이고 이두만 ‘집중’.",
      setScoreText: "3 세트 8~10 회",
    },
    {
      levels: "advanced",
      label: "스파이더 컬",
      labelEn: "Spider Curl",
      frames: f("upperArmFront", "biceps-spider-curl", 4),
      points: [
        "인클라인 벤치에 엎드려 팔을 아래로",
        "상단에서 피크 수축을 강하게",
        "반동이 어렵고 폼이 잘 유지됨",
        "가벼운 중량으로 정확하게 수행",
      ],
      frameText: "* 반동 불가. 수축감 극대화.",
      setScoreText: "3 세트 12 회",
    },
  ] as const,
};

/** 2) 승모/목덜미 */
export const PART_TRAPS_NECK: PartMotions = {
  id: "trapsNeck",
  title: "승모/목덜미",
  titleEn: "Traps / Neck",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "덤벨 슈러그",
      labelEn: "Dumbbell Shrug",
      frames: f("trapsNeck", "traps-dumbbell-shrug", 4),
      points: [
        "팔은 편 채로 어깨를 ‘귀 쪽’으로 들어 올림",
        "목을 내밀지 말고 턱을 살짝 당김",
        "상단에서 1초 수축 후 천천히 하강",
        "어깨를 돌리지 말고 수직으로만",
      ],
      frameText: "* 승모 기본. ‘올리고-멈추고-내리기’.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "beginner",
      label: "밴드 페이스풀",
      labelEn: "Band Face Pull",
      frames: f("trapsNeck", "traps-band-face-pull", 4),
      points: [
        "밴드를 얼굴 높이로 당기며 팔꿈치를 벌림",
        "견갑골을 뒤로 모아 상부 등 수축",
        "허리 꺾지 말고 갈비뼈를 내림",
        "목/어깨 통증 있으면 가동범위 줄임",
      ],
      frameText: "* 상부 등/후면 어깨 자세 교정에도 좋음.",
      setScoreText: "2 세트 15 회",
    },
    {
      levels: "beginner",
      label: "스캡션(견갑 상승/하강) 컨트롤",
      labelEn: "Scapular Elevation/Depression Control",
      frames: f("trapsNeck", "traps-scapular-control", 4),
      points: [
        "팔을 가볍게 들어 견갑만 위/아래로 움직임",
        "목에 힘 주지 말고 견갑 움직임에 집중",
        "상단/하단에서 각각 1초 정지",
        "호흡은 자연스럽게 유지",
      ],
      frameText: "* 승모 과긴장/불균형을 정리하는 기초.",
      setScoreText: "2 세트 12 회",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "바벨 슈러그",
      labelEn: "Barbell Shrug",
      frames: f("trapsNeck", "traps-barbell-shrug", 4),
      points: [
        "바벨을 허벅지 앞에서 잡고 승모를 수직 수축",
        "상단에서 1~2초 정지하여 수축 유지",
        "무게 욕심으로 목을 앞으로 빼지 않기",
        "반동 대신 템포로 자극 확보",
      ],
      frameText: "* 중량 진행에 유리. 폼이 우선.",
      setScoreText: "4 세트 8~10 회",
    },
    {
      levels: "intermediate",
      label: "업라이트 로우(가벼운 중량)",
      labelEn: "Upright Row (Light)",
      frames: f("trapsNeck", "traps-upright-row", 4),
      points: [
        "바/덤벨을 몸 가까이로 끌어올림",
        "팔꿈치가 손보다 위로 올라가게 리드",
        "어깨 통증 있으면 범위 줄이거나 제외",
        "상단에서 승모/삼각근 수축 느끼기",
      ],
      frameText: "* 통증 없는 범위에서만. 어깨 보호 우선.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "intermediate",
      label: "케이블 하이 풀",
      labelEn: "Cable High Pull",
      frames: f("trapsNeck", "traps-cable-high-pull", 4),
      points: [
        "케이블을 위로 당기며 상부 등 수축",
        "견갑 상방회전/상승을 자연스럽게",
        "몸통 반동 없이 가슴을 열고 고정",
        "상단에서 1초 정지 후 컨트롤 하강",
      ],
      frameText: "* 승모+상부 등 ‘끌어올림’ 자극.",
      setScoreText: "3 세트 10 회",
    },

    // advanced
    {
      levels: "advanced",
      label: "스내치 그립 슈러그",
      labelEn: "Snatch-Grip Shrug",
      frames: f("trapsNeck", "traps-snatchgrip-shrug", 4),
      points: [
        "넓은 그립으로 바벨을 잡고 견갑을 강하게 수축",
        "팔꿈치 굽힘 없이 ‘견갑’만 사용",
        "상단 정지로 수축감 극대화",
        "허리 과신전 없이 코어 고정",
      ],
      frameText: "* 상부 승모/중부 승모 자극 강화.",
      setScoreText: "4 세트 6~8 회",
    },
    {
      levels: "advanced",
      label: "파머스 캐리(승모 고정)",
      labelEn: "Farmer's Carry",
      frames: f("trapsNeck", "traps-farmers-carry", 4),
      points: [
        "무게를 들고 상체를 곧게 세워 걷기",
        "어깨를 ‘내린’ 상태로 견갑 안정 유지",
        "몸이 좌우로 흔들리지 않게 코어 고정",
        "짧게 자주, 자세 무너짐 전에 종료",
      ],
      frameText: "* 승모/그립/코어 종합 강화.",
      setScoreText: "4 세트 30초",
    },
    {
      levels: "advanced",
      label: "프론트 랙 캐리",
      labelEn: "Front Rack Carry",
      frames: f("trapsNeck", "traps-front-rack-carry", 4),
      points: [
        "프론트랙 포지션에서 상부 등/승모로 지지",
        "갈비뼈를 내리고 코어를 단단히",
        "목을 길게 뽑고 시선 정면",
        "짧은 거리로 폼 유지 집중",
      ],
      frameText: "* 상부 등 지지력/자세 고정에 탁월.",
      setScoreText: "3 세트 20~30m",
    },
  ] as const,
};

/** 3) 복부(상) */
export const PART_UPPER_ABS: PartMotions = {
  id: "upperAbs",
  title: "복부(상)",
  titleEn: "Upper Abs",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "크런치",
      labelEn: "Crunch",
      frames: f("upperAbs", "abs-crunch", 4),
      points: [
        "허리를 바닥에 붙이고 상체를 말아 올림",
        "목을 당기지 말고 시선은 천장",
        "상단에서 복근 수축 1초 유지",
        "허리 뜨면 가동범위를 줄임",
      ],
      frameText: "* 상복부 ‘말아 올리기’ 기본.",
      setScoreText: "3 세트 15 회",
    },
    {
      levels: "beginner",
      label: "데드버그",
      labelEn: "Dead Bug",
      frames: f("upperAbs", "abs-dead-bug", 4),
      points: [
        "허리 중립/갈비뼈 내리기 유지",
        "반대 팔/다리를 천천히 뻗어 복압 유지",
        "허리가 뜨면 범위 축소",
        "호흡은 내쉬며 복근 긴장 유지",
      ],
      frameText: "* 허리 보호 + 코어 컨트롤 기초.",
      setScoreText: "3 세트 10 회(좌우)",
    },
    {
      levels: "beginner",
      label: "플랭크",
      labelEn: "Plank",
      frames: f("upperAbs", "abs-plank", 4),
      points: [
        "머리~발끝까지 일직선 유지",
        "엉덩이가 올라가거나 내려가지 않게",
        "배꼽을 등 쪽으로 당겨 복부 긴장",
        "호흡을 멈추지 말고 짧게 유지",
      ],
      frameText: "* ‘버티는 코어’ 기본.",
      setScoreText: "3 세트 30초",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "케이블 크런치",
      labelEn: "Cable Crunch",
      frames: f("upperAbs", "abs-cable-crunch", 4),
      points: [
        "무릎 꿇고 케이블을 머리 옆에 고정",
        "상체를 ‘접는다’ 느낌으로 복근 수축",
        "허리 과신전/반동 금지",
        "수축-이완 템포를 일정하게 유지",
      ],
      frameText: "* 저항을 걸어 상복부에 확실히.",
      setScoreText: "4 세트 12 회",
    },
    {
      levels: "intermediate",
      label: "리버스 크런치(상복부 집중 버전)",
      labelEn: "Reverse Crunch (Controlled)",
      frames: f("upperAbs", "abs-reverse-crunch-controlled", 4),
      points: [
        "무릎을 가슴 쪽으로 당기며 골반을 말아 올림",
        "상체는 고정하고 복부로만 컨트롤",
        "내릴 때 허리 뜨지 않게 천천히",
        "상단에서 골반 말림 1초 유지",
      ],
      frameText: "* 골반 말림 컨트롤이 핵심.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "intermediate",
      label: "할로우 홀드",
      labelEn: "Hollow Hold",
      frames: f("upperAbs", "abs-hollow-hold", 4),
      points: [
        "갈비뼈를 내리고 허리를 바닥에 밀착",
        "다리/팔을 뻗되 허리가 뜨면 범위 축소",
        "짧게 버티며 복부 긴장 유지",
        "목/어깨 부담 시 팔 각도 조절",
      ],
      frameText: "* 코어 ‘전면 체인’ 고정 강화.",
      setScoreText: "4 세트 20초",
    },

    // advanced
    {
      levels: "advanced",
      label: "V업",
      labelEn: "V-Up",
      frames: f("upperAbs", "abs-v-up", 4),
      points: [
        "상체/하체를 동시에 들어 V자 형태",
        "반동 대신 복부 수축으로 끌어올림",
        "허리가 아프면 무릎을 약간 굽혀 난이도 조절",
        "하강도 천천히 컨트롤",
      ],
      frameText: "* 상복부 + 하복부 동시 고난도.",
      setScoreText: "4 세트 10 회",
    },
    {
      levels: "advanced",
      label: "토즈투바(또는 니즈투체스트)",
      labelEn: "Toes-to-Bar / Knees-to-Chest",
      frames: f("upperAbs", "abs-toes-to-bar", 4),
      points: [
        "바에 매달려 견갑을 먼저 안정화",
        "다리를 들어 올리며 복부 수축",
        "스윙 최소화(컨트롤 우선)",
        "가능하면 천천히 내려 완전 이완",
      ],
      frameText: "* 컨트롤이 되면 강력한 코어 자극.",
      setScoreText: "4 세트 6~10 회",
    },
    {
      levels: "advanced",
      label: "아브 휠 롤아웃",
      labelEn: "Ab Wheel Rollout",
      frames: f("upperAbs", "abs-abwheel-rollout", 4),
      points: [
        "골반을 말아 복부 긴장 유지한 채 굴림",
        "허리 꺾이면 범위를 줄임",
        "어깨가 귀로 올라가지 않게",
        "반동 없이 천천히 왕복",
      ],
      frameText: "* 허리 중립 유지가 생명.",
      setScoreText: "4 세트 8 회",
    },
  ] as const,
};

/** 4) 어깨 */
export const PART_SHOULDER: PartMotions = {
  id: "shoulder",
  title: "어깨",
  titleEn: "Shoulders",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "덤벨 숄더 프레스",
      labelEn: "Dumbbell Shoulder Press",
      frames: f("shoulder", "shoulder-dumbbell-press", 4),
      points: [
        "코어를 조여 허리 과신전 방지",
        "덤벨을 귀 옆에서 수직으로 밀어 올림",
        "상단에서 어깨 으쓱하지 않기",
        "내릴 때 팔꿈치가 너무 뒤로 가지 않게",
      ],
      frameText: "* 어깨 전반+삼두 보조. 기본 프레스.",
      setScoreText: "3 세트 10 회",
    },
    {
      levels: "beginner",
      label: "사이드 레터럴 레이즈",
      labelEn: "Lateral Raise",
      frames: f("shoulder", "shoulder-lateral-raise", 4),
      points: [
        "팔꿈치를 살짝 굽힌 채 옆으로 들어 올림",
        "승모로 끌어올리지 말고 삼각근 중간에 집중",
        "손목이 꺾이지 않게 중립 유지",
        "상단에서 1초 정지 후 천천히 하강",
      ],
      frameText: "* 어깨 ‘넓이’ 핵심. 가벼워도 정확히.",
      setScoreText: "3 세트 15 회",
    },
    {
      levels: "beginner",
      label: "프론트 레이즈",
      labelEn: "Front Raise",
      frames: f("shoulder", "shoulder-front-raise", 4),
      points: [
        "덤벨을 전방으로 어깨 높이까지 올림",
        "몸통 반동 없이 코어 고정",
        "어깨 통증 있으면 범위 축소",
        "내릴 때 천천히 장력 유지",
      ],
      frameText: "* 전면 삼각근 강화(과사용 주의).",
      setScoreText: "2 세트 12 회",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "아놀드 프레스",
      labelEn: "Arnold Press",
      frames: f("shoulder", "shoulder-arnold-press", 4),
      points: [
        "하단에서 손바닥이 얼굴 쪽, 상단에서 전방",
        "회전 중 어깨가 뜨지 않게 컨트롤",
        "허리 꺾임 방지(갈비뼈 내리기)",
        "가벼운 중량으로 정확하게",
      ],
      frameText: "* 전/측면 삼각근을 넓게 자극.",
      setScoreText: "3 세트 10 회",
    },
    {
      levels: "intermediate",
      label: "리어 델트 플라이",
      labelEn: "Rear Delt Fly",
      frames: f("shoulder", "shoulder-rear-delt-fly", 4),
      points: [
        "상체를 숙이고 팔을 옆으로 벌림",
        "견갑을 살짝 모아 후면 삼각근 수축",
        "목을 길게 유지하고 승모 과개입 방지",
        "반동 없이 천천히 왕복",
      ],
      frameText: "* 후면 어깨로 밸런스 잡기.",
      setScoreText: "3 세트 15 회",
    },
    {
      levels: "intermediate",
      label: "케이블 레터럴 레이즈",
      labelEn: "Cable Lateral Raise",
      frames: f("shoulder", "shoulder-cable-lateral-raise", 4),
      points: [
        "케이블이 옆에서 당기도록 세팅",
        "상단까지 장력 유지하며 올림",
        "팔꿈치 각도 고정(흔들림 최소)",
        "상단 1초 정지 후 천천히 하강",
      ],
      frameText: "* 전 구간 장력 유지가 쉬움.",
      setScoreText: "4 세트 12 회",
    },

    // advanced
    {
      levels: "advanced",
      label: "푸쉬 프레스",
      labelEn: "Push Press",
      frames: f("shoulder", "shoulder-push-press", 4),
      points: [
        "무릎 반동을 ‘최소’로 사용해 바를 띄움",
        "상단에서 팔꿈치 완전 잠금보다 안정 우선",
        "허리 과신전 금지(코어 고정)",
        "하강은 컨트롤하여 어깨 보호",
      ],
      frameText: "* 파워+어깨. 폼 무너지면 무게 낮추기.",
      setScoreText: "5 세트 5 회",
    },
    {
      levels: "advanced",
      label: "핸드스탠드 푸쉬업(진행형)",
      labelEn: "Handstand Push-up (Progression)",
      frames: f("shoulder", "shoulder-handstand-pushup", 4),
      points: [
        "벽에 기대어 안정화 후 수행",
        "머리/목 부담 시 매트로 높이 조절",
        "견갑 상방회전 컨트롤 유지",
        "범위/반복보다 안정적인 라인이 우선",
      ],
      frameText: "* 체중 기반 고난도. 진행형으로 접근.",
      setScoreText: "4 세트 3~6 회",
    },
    {
      levels: "advanced",
      label: "덤벨 Y-레이즈(프론/중부 승모 포함)",
      labelEn: "Dumbbell Y-Raise",
      frames: f("shoulder", "shoulder-y-raise", 4),
      points: [
        "상체를 숙이고 팔을 Y 형태로 들어 올림",
        "가벼운 중량으로 견갑 안정에 집중",
        "목이 긴장되면 범위/중량을 줄임",
        "상단에서 1초 정지 후 천천히 하강",
      ],
      frameText: "* 어깨 안정화 + 자세 보강.",
      setScoreText: "3 세트 12 회",
    },
  ] as const,
};

/** 5) 가슴 */
export const PART_CHEST: PartMotions = {
  id: "chest",
  title: "가슴",
  titleEn: "Chest",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "푸쉬업",
      labelEn: "Push-up",
      frames: f("chest", "chest-pushup", 4),
      points: [
        "손은 가슴 옆(어깨보다 약간 넓게)",
        "몸통 일직선 유지(엉덩이 처짐 금지)",
        "내릴 때 가슴이 먼저 내려간다는 느낌",
        "올릴 때 팔꿈치 완전 잠금보다 가슴 수축",
      ],
      frameText: "* 체중으로 시작하는 가슴 기본.",
      setScoreText: "3 세트 10~15 회",
    },
    {
      levels: "beginner",
      label: "덤벨 플로어 프레스",
      labelEn: "Dumbbell Floor Press",
      frames: f("chest", "chest-dumbbell-floor-press", 4),
      points: [
        "바닥에서 팔꿈치가 바닥에 닿는 범위까지",
        "어깨가 들리지 않게 견갑 고정",
        "상단에서 가슴 수축을 느끼기",
        "허리 과신전 없이 코어 고정",
      ],
      frameText: "* 어깨 부담을 줄인 프레스 입문.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "beginner",
      label: "덤벨 플라이(가벼운 중량)",
      labelEn: "Dumbbell Fly (Light)",
      frames: f("chest", "chest-dumbbell-fly", 4),
      points: [
        "팔꿈치를 살짝 굽혀 고정",
        "가슴이 늘어나는 범위까지만 열기",
        "어깨 통증 있으면 범위 축소",
        "올릴 때 가슴을 모은다는 느낌",
      ],
      frameText: "* ‘스트레치’ 위주. 무게보다 컨트롤.",
      setScoreText: "2 세트 15 회",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "덤벨 벤치 프레스",
      labelEn: "Dumbbell Bench Press",
      frames: f("chest", "chest-dumbbell-bench-press", 4),
      points: [
        "견갑을 뒤로/아래로 고정해 가슴 열기",
        "덤벨을 가슴 중앙으로 내렸다가 밀어 올림",
        "팔꿈치가 너무 벌어지지 않게(약 45도)",
        "하강을 2~3초로 컨트롤",
      ],
      frameText: "* 가슴 두께+안정성. 중급 대표.",
      setScoreText: "4 세트 8~10 회",
    },
    {
      levels: "intermediate",
      label: "인클라인 덤벨 프레스",
      labelEn: "Incline Dumbbell Press",
      frames: f("chest", "chest-incline-dumbbell-press", 4),
      points: [
        "벤치 20~30도 세팅(너무 높이면 어깨 개입↑)",
        "상부 가슴으로 밀어 올리는 궤도",
        "견갑 고정 유지",
        "상단에서 가슴 수축 1초",
      ],
      frameText: "* 상부 가슴(윗가슴) 집중.",
      setScoreText: "4 세트 8 회",
    },
    {
      levels: "intermediate",
      label: "딥스(가슴 타겟)",
      labelEn: "Dips (Chest Focus)",
      frames: f("chest", "chest-dips", 4),
      points: [
        "몸을 살짝 앞으로 기울여 가슴 개입↑",
        "어깨가 말리지 않게 가슴 열기",
        "통증 있으면 깊이를 줄이기",
        "상단에서 잠깐 정지 후 반복",
      ],
      frameText: "* 어깨 통증 없을 때만. 컨트롤 우선.",
      setScoreText: "3 세트 6~10 회",
    },

    // advanced
    {
      levels: "advanced",
      label: "바벨 벤치 프레스",
      labelEn: "Barbell Bench Press",
      frames: f("chest", "chest-barbell-bench-press", 4),
      points: [
        "견갑 고정 + 발로 지면 밀어 안정화",
        "바는 가슴 하단 쪽으로 내렸다가 수직에 가깝게",
        "손목이 꺾이지 않게 바 위에 손목 쌓기",
        "반복마다 같은 궤도로 수행",
      ],
      frameText: "* 중량 진행의 왕. 안전장치/스팟 권장.",
      setScoreText: "5 세트 5 회",
    },
    {
      levels: "advanced",
      label: "케이블 크로스오버",
      labelEn: "Cable Crossover",
      frames: f("chest", "chest-cable-crossover", 4),
      points: [
        "가슴을 열고 케이블을 앞에서 모으기",
        "상단에서 1초 수축 유지",
        "팔꿈치 각도 유지(팔로 당기지 않기)",
        "전 구간 장력 유지하며 천천히",
      ],
      frameText: "* 수축감/펌핑 최강. 마무리로 좋음.",
      setScoreText: "4 세트 12 회",
    },
    {
      levels: "advanced",
      label: "플라이-프레스 콤보(덤벨)",
      labelEn: "Fly-to-Press Combo",
      frames: f("chest", "chest-fly-to-press-combo", 4),
      points: [
        "플라이로 늘린 뒤 프레스로 마무리",
        "가벼운 중량으로 가동범위 컨트롤",
        "어깨 불편하면 플라이 범위 축소",
        "호흡을 일정하게 유지",
      ],
      frameText: "* 스트레치+수축 연속 자극(고난도 컨트롤).",
      setScoreText: "3 세트 10 회",
    },
  ] as const,
};

/** 6) 옆구리 */
export const PART_OBLIQUE: PartMotions = {
  id: "oblique",
  title: "옆구리",
  titleEn: "Obliques",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "사이드 플랭크",
      labelEn: "Side Plank",
      frames: f("oblique", "oblique-side-plank", 4),
      points: [
        "어깨-골반-발목이 일직선",
        "골반이 아래로 처지지 않게 유지",
        "목을 길게, 어깨는 귀에서 멀게",
        "호흡 유지하며 옆구리 긴장",
      ],
      frameText: "* 옆구리 안정화 기본.",
      setScoreText: "3 세트 20~30초(좌우)",
    },
    {
      levels: "beginner",
      label: "스탠딩 사이드 크런치",
      labelEn: "Standing Side Crunch",
      frames: f("oblique", "oblique-standing-side-crunch", 4),
      points: [
        "한 손을 머리에 대고 옆으로 접기",
        "상체를 비틀지 말고 측면으로만",
        "골반은 정면 고정",
        "수축-이완을 천천히 반복",
      ],
      frameText: "* 장비 없이 옆구리 수축 감각 잡기.",
      setScoreText: "2 세트 15 회(좌우)",
    },
    {
      levels: "beginner",
      label: "니 투 엘보(크로스)",
      labelEn: "Knee to Elbow (Cross)",
      frames: f("oblique", "oblique-knee-to-elbow", 4),
      points: [
        "무릎과 반대 팔꿈치를 교차로 모으기",
        "허리 과회전 대신 복부로 컨트롤",
        "상단에서 옆구리 수축 1초",
        "속도보다 정확한 접기/회전",
      ],
      frameText: "* 교차 수축으로 옆구리 자극.",
      setScoreText: "3 세트 12 회(좌우)",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "러시안 트위스트(컨트롤)",
      labelEn: "Russian Twist (Controlled)",
      frames: f("oblique", "oblique-russian-twist", 4),
      points: [
        "상체를 살짝 뒤로 기울여 코어 긴장",
        "골반은 고정하고 상체만 좌우 회전",
        "반동으로 휘두르지 않기",
        "시선은 손을 따라가며 천천히",
      ],
      frameText: "* 빠르게 하지 말고 ‘천천히 회전’.",
      setScoreText: "4 세트 12 회(좌우)",
    },
    {
      levels: "intermediate",
      label: "케이블 우드초퍼",
      labelEn: "Cable Woodchopper",
      frames: f("oblique", "oblique-cable-woodchopper", 4),
      points: [
        "케이블을 대각선으로 당기며 몸통 회전",
        "골반이 같이 돌아가지 않게 컨트롤",
        "복부로 ‘비틀기’가 아니라 ‘버티며 회전’",
        "상단에서 1초 정지",
      ],
      frameText: "* 회전 힘 + 옆구리 안정 강화.",
      setScoreText: "3 세트 10 회(좌우)",
    },
    {
      levels: "intermediate",
      label: "팔로프 프레스",
      labelEn: "Pallof Press",
      frames: f("oblique", "oblique-pallof-press", 4),
      points: [
        "케이블/밴드가 옆에서 당기도록 세팅",
        "가슴 앞에서 밀어내며 회전 저항",
        "몸통이 돌아가지 않게 코어로 버티기",
        "천천히 내/외측 반복",
      ],
      frameText: "* ‘안 돌아가게 버티는’ 옆구리 코어.",
      setScoreText: "4 세트 12 회(좌우)",
    },

    // advanced
    {
      levels: "advanced",
      label: "윈드실드 와이퍼(진행형)",
      labelEn: "Windshield Wipers (Progression)",
      frames: f("oblique", "oblique-windshield-wipers", 4),
      points: [
        "누워서 다리를 들어 좌우로 천천히 이동",
        "허리 뜨면 범위를 즉시 줄이기",
        "어깨/등은 바닥에 고정",
        "반동 없이 컨트롤로만",
      ],
      frameText: "* 허리 보호가 우선. 범위보다 컨트롤.",
      setScoreText: "4 세트 8 회(좌우)",
    },
    {
      levels: "advanced",
      label: "행잉 니 레이즈(회전)",
      labelEn: "Hanging Knee Raise (Twist)",
      frames: f("oblique", "oblique-hanging-knee-raise-twist", 4),
      points: [
        "바에 매달려 견갑을 안정화",
        "무릎을 들어 올리며 좌우로 살짝 틀기",
        "스윙을 최소화해 옆구리 수축 집중",
        "하강은 천천히 완전 이완",
      ],
      frameText: "* 매달림+회전으로 강한 옆구리 자극.",
      setScoreText: "4 세트 6~10 회",
    },
    {
      levels: "advanced",
      label: "사이드 플랭크 힙딥",
      labelEn: "Side Plank Hip Dips",
      frames: f("oblique", "oblique-side-plank-hip-dips", 4),
      points: [
        "사이드 플랭크에서 골반을 아래로 내렸다 올림",
        "어깨가 무너지지 않게 지지",
        "동작 중 몸이 앞으로/뒤로 기울지 않게",
        "수축-이완을 일정한 템포로",
      ],
      frameText: "* 버티기+반복으로 옆구리 펌핑.",
      setScoreText: "3 세트 12 회(좌우)",
    },
  ] as const,
};

/** 7) 하복부 */
export const PART_LOWER_ABS: PartMotions = {
  id: "lowerAbs",
  title: "하복부",
  titleEn: "Lower Abs",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "레그 레이즈(무릎 굽힘)",
      labelEn: "Leg Raise (Bent Knee)",
      frames: f("lowerAbs", "lowerabs-bent-knee-leg-raise", 4),
      points: [
        "무릎을 굽혀 허리 부담을 낮춤",
        "허리가 뜨지 않게 골반 말림 유지",
        "내릴 때 발이 바닥에 닿기 전 멈춤(장력 유지)",
        "반동 없이 천천히",
      ],
      frameText: "* 골반 말림(Posterior tilt)이 핵심.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "beginner",
      label: "리버스 크런치",
      labelEn: "Reverse Crunch",
      frames: f("lowerAbs", "lowerabs-reverse-crunch", 4),
      points: [
        "무릎을 당겨 골반을 바닥에서 살짝 들어 올림",
        "상체는 고정하고 복부로만 수행",
        "내릴 때 허리 뜨지 않게 컨트롤",
        "상단에서 1초 정지",
      ],
      frameText: "* 하복부 입문에 가장 무난.",
      setScoreText: "3 세트 15 회",
    },
    {
      levels: "beginner",
      label: "마운틴 클라이머(컨트롤)",
      labelEn: "Mountain Climber (Controlled)",
      frames: f("lowerAbs", "lowerabs-mountain-climber", 4),
      points: [
        "플랭크 자세에서 무릎을 번갈아 당김",
        "허리가 꺾이지 않게 코어 고정",
        "속도보다 무릎을 ‘당기는’ 복부 수축",
        "어깨에 힘이 과하면 세트 시간을 줄임",
      ],
      frameText: "* 하복부+심폐. 컨트롤 버전으로 시작.",
      setScoreText: "3 세트 30초",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "레그 레이즈(스트레이트)",
      labelEn: "Straight Leg Raise",
      frames: f("lowerAbs", "lowerabs-straight-leg-raise", 4),
      points: [
        "다리를 곧게 펴고 천천히 올리고 내림",
        "허리 뜨면 각도를 줄이기(90도까지 안 내려도 됨)",
        "하강을 2~3초로 컨트롤",
        "복부 긴장을 끝까지 유지",
      ],
      frameText: "* 허리 뜨면 범위 조절이 정답.",
      setScoreText: "4 세트 10 회",
    },
    {
      levels: "intermediate",
      label: "플러터 킥",
      labelEn: "Flutter Kicks",
      frames: f("lowerAbs", "lowerabs-flutter-kicks", 4),
      points: [
        "허리를 바닥에 밀착하고 다리를 번갈아 차올림",
        "다리를 너무 높이 들지 말고 낮게 유지",
        "목/어깨 긴장 시 머리를 바닥에 두기",
        "호흡을 끊지 않고 유지",
      ],
      frameText: "* 하복부 ‘지속 긴장’에 좋음.",
      setScoreText: "4 세트 20초",
    },
    {
      levels: "intermediate",
      label: "행잉 니 레이즈",
      labelEn: "Hanging Knee Raise",
      frames: f("lowerAbs", "lowerabs-hanging-knee-raise", 4),
      points: [
        "바에 매달려 견갑 안정화",
        "무릎을 가슴 쪽으로 당기며 골반 말림",
        "스윙을 최소화",
        "내릴 때 천천히 완전 이완",
      ],
      frameText: "* 매달림 코어. 스윙 없게.",
      setScoreText: "4 세트 8 회",
    },

    // advanced
    {
      levels: "advanced",
      label: "행잉 레그 레이즈",
      labelEn: "Hanging Leg Raise",
      frames: f("lowerAbs", "lowerabs-hanging-leg-raise", 4),
      points: [
        "다리를 곧게 펴고 복부로 들어 올림",
        "견갑 안정(어깨 내림) 먼저",
        "반동 없이 컨트롤로 올리고 내림",
        "가능하면 천천히 완전 이완",
      ],
      frameText: "* 하복부 최고 난이도 중 하나. 컨트롤 우선.",
      setScoreText: "5 세트 6 회",
    },
    {
      levels: "advanced",
      label: "L-싯(진행형)",
      labelEn: "L-Sit (Progression)",
      frames: f("lowerAbs", "lowerabs-l-sit", 4),
      points: [
        "바닥/딥바에서 몸을 지지하고 다리를 들어 L자",
        "어깨를 내리고 견갑을 고정",
        "무릎 굽힘 → 한 다리 → 양 다리 순으로 진행",
        "짧게 버티며 자세 유지",
      ],
      frameText: "* 코어/어깨/고관절 굴곡근 종합.",
      setScoreText: "4 세트 10~20초",
    },
    {
      levels: "advanced",
      label: "드래곤 플래그(진행형)",
      labelEn: "Dragon Flag (Progression)",
      frames: f("lowerAbs", "lowerabs-dragon-flag", 4),
      points: [
        "어깨/등 상부를 고정하고 몸을 일직선으로 버팀",
        "내릴 때 허리가 꺾이면 즉시 범위 축소",
        "천천히 하강(네거티브)에 집중",
        "목/허리 불편 시 진행형으로만",
      ],
      frameText: "* 무리 금지. 진행형으로 안전하게.",
      setScoreText: "4 세트 3~5 회",
    },
  ] as const,
};

/** 8) 목 */
export const PART_NECK: PartMotions = {
  id: "neck",
  title: "목",
  titleEn: "Neck",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "턱 당기기(친턱)",
      labelEn: "Chin Tuck",
      frames: f("neck", "neck-chin-tuck", 4),
      points: [
        "턱을 뒤로 ‘수평’으로 당겨 목을 길게",
        "고개를 숙이거나 젖히지 않기",
        "앞목 긴장이 아니라 깊은 목근육 사용",
        "10~20초 유지하며 호흡 유지",
      ],
      frameText: "* 거북목 교정 기본. 통증 없이.",
      setScoreText: "3 세트 20초",
    },
    {
      levels: "beginner",
      label: "목 등척성(손으로 저항)",
      labelEn: "Neck Isometrics (Hand Resistance)",
      frames: f("neck", "neck-isometrics-hand", 4),
      points: [
        "손으로 가볍게 저항을 주고 목은 버티기",
        "전/후/좌/우 각 방향으로 수행",
        "힘을 30~50%만 사용(과긴장 금지)",
        "통증이 있으면 즉시 중단",
      ],
      frameText: "* 과하게 하지 말고 ‘가볍게’ 버티기.",
      setScoreText: "2 세트 10초(각방향)",
    },
    {
      levels: "beginner",
      label: "목 가동성(천천히 회전/측굴)",
      labelEn: "Neck Mobility (Slow)",
      frames: f("neck", "neck-mobility-slow", 4),
      points: [
        "천천히 좌우 회전/측굴로 범위 확인",
        "통증/저림이 있으면 범위를 줄임",
        "어깨는 내리고 목만 움직이기",
        "호흡을 멈추지 않기",
      ],
      frameText: "* 목은 ‘부드럽게’가 원칙.",
      setScoreText: "2 세트 6 회(각방향)",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "밴드 목 저항(전/후)",
      labelEn: "Band Resisted Neck (Front/Back)",
      frames: f("neck", "neck-band-resistance", 4),
      points: [
        "밴드로 가벼운 저항을 주고 천천히 움직임",
        "턱 당기기 자세를 유지한 채 수행",
        "반동 없이 작은 범위로 컨트롤",
        "통증 있으면 즉시 중단",
      ],
      frameText: "* 가볍게, 작은 범위, 정확하게.",
      setScoreText: "3 세트 10 회",
    },
    {
      levels: "intermediate",
      label: "스캐플라 리트랙션(어깨/목 안정)",
      labelEn: "Scapular Retraction (Neck Support)",
      frames: f("neck", "neck-scapular-retraction", 4),
      points: [
        "견갑을 뒤로 모아 목의 긴장을 낮춤",
        "어깨를 으쓱하지 말고 아래로",
        "가슴을 열어 상체 정렬을 유지",
        "수축 1초 정지 후 이완",
      ],
      frameText: "* 목 부담 줄이는 ‘자세 근육’ 강화.",
      setScoreText: "3 세트 12 회",
    },
    {
      levels: "intermediate",
      label: "목 측면 등척성(밴드/수건)",
      labelEn: "Lateral Neck Isometrics",
      frames: f("neck", "neck-lateral-isometrics", 4),
      points: [
        "측면으로 저항을 주고 머리를 중립에서 유지",
        "어깨가 올라가지 않게 고정",
        "힘은 50% 이하로",
        "호흡 유지하며 10~15초",
      ],
      frameText: "* ‘세게’보다 ‘꾸준히’.",
      setScoreText: "3 세트 12초(좌우)",
    },

    // advanced
    {
      levels: "advanced",
      label: "4방향 목 등척성 서킷",
      labelEn: "4-Way Neck Isometric Circuit",
      frames: f("neck", "neck-4way-isometric-circuit", 4),
      points: [
        "전/후/좌/우 4방향을 연속으로 버티기",
        "중립 정렬 유지(턱 당기기)",
        "통증 신호가 있으면 즉시 중단",
        "짧게 자주(회복 우선)",
      ],
      frameText: "* 고강도보다 ‘안전한 누적’이 목표.",
      setScoreText: "4 라운드(각 10초)",
    },
    {
      levels: "advanced",
      label: "밴드 목 회전 저항",
      labelEn: "Band Resisted Neck Rotation",
      frames: f("neck", "neck-band-rotation", 4),
      points: [
        "밴드를 옆에서 당기도록 세팅",
        "천천히 회전하며 저항을 컨트롤",
        "어깨/몸통은 고정",
        "가동범위는 통증 없는 범위까지만",
      ],
      frameText: "* 회전 저항은 특히 ‘천천히’.",
      setScoreText: "3 세트 8 회(좌우)",
    },
    {
      levels: "advanced",
      label: "목+견갑 안정 루틴(친턱+리트랙션)",
      labelEn: "Neck + Scap Stability Combo",
      frames: f("neck", "neck-scap-stability-combo", 4),
      points: [
        "친턱으로 정렬 → 견갑 리트랙션 수축",
        "동작 사이에 목을 길게 유지",
        "호흡은 천천히 내쉬며 안정",
        "반복수보다 품질 우선",
      ],
      frameText: "* 목 통증 예방은 ‘정렬+견갑 안정’ 조합.",
      setScoreText: "3 세트 10 회",
    },
  ] as const,
};

/** 9) 전완(팔뚝) */
export const PART_FOREARM: PartMotions = {
  id: "forearm",
  title: "전완(팔뚝)",
  titleEn: "Forearms",
  motions: [
    // beginner
    {
      levels: "beginner",
      label: "리스트 컬",
      labelEn: "Wrist Curl",
      frames: f("forearm", "forearm-wrist-curl", 4),
      points: [
        "팔뚝을 고정하고 손목만 굽혀 올림",
        "상단에서 1초 수축",
        "내릴 때 완전 이완까지 천천히",
        "손목 통증 있으면 범위 축소",
      ],
      frameText: "* 전완 굴곡근 기본.",
      setScoreText: "3 세트 15 회",
    },
    {
      levels: "beginner",
      label: "리버스 리스트 컬",
      labelEn: "Reverse Wrist Curl",
      frames: f("forearm", "forearm-reverse-wrist-curl", 4),
      points: [
        "손등이 위로 가게 잡고 손목을 들어 올림",
        "팔뚝 고정, 손목만 움직임",
        "상단에서 1초 정지",
        "가벼운 중량으로 컨트롤",
      ],
      frameText: "* 전완 신전근 밸런스.",
      setScoreText: "3 세트 15 회",
    },
    {
      levels: "beginner",
      label: "그립 스퀴즈(볼/그립)",
      labelEn: "Grip Squeeze",
      frames: f("forearm", "forearm-grip-squeeze", 4),
      points: [
        "그립/볼을 쥐었다가 천천히 풀기",
        "손가락 끝까지 힘이 퍼지도록",
        "통증 없이 반복/시간으로 누적",
        "좌우 균형을 맞춰 수행",
      ],
      frameText: "* 장비 간단. 꾸준히 누적하면 확실히 느낌.",
      setScoreText: "3 세트 30초",
    },

    // intermediate
    {
      levels: "intermediate",
      label: "해머 컬(전완 집중 템포)",
      labelEn: "Hammer Curl (Tempo)",
      frames: f("forearm", "forearm-hammer-curl-tempo", 4),
      points: [
        "엄지가 위를 향하도록 잡고 컬",
        "내릴 때 3초 템포로 전완에 자극",
        "팔꿈치 고정, 반동 금지",
        "상단 정지 후 천천히 하강",
      ],
      frameText: "* 상완근+전완을 템포로 확실히.",
      setScoreText: "4 세트 10 회",
    },
    {
      levels: "intermediate",
      label: "파머스 홀드",
      labelEn: "Farmer's Hold",
      frames: f("forearm", "forearm-farmers-hold", 4),
      points: [
        "덤벨을 들고 자세를 곧게 고정",
        "어깨를 내리고 견갑 안정 유지",
        "손가락이 풀리기 전까지 버티기",
        "짧게 자주, 폼 무너지면 종료",
      ],
      frameText: "* 그립/전완/코어 한 번에.",
      setScoreText: "4 세트 30초",
    },
    {
      levels: "intermediate",
      label: "플레이트 핀치 홀드",
      labelEn: "Plate Pinch Hold",
      frames: f("forearm", "forearm-plate-pinch-hold", 4),
      points: [
        "원판을 손가락으로 ‘집어’ 버티기",
        "손목이 꺾이지 않게 중립 유지",
        "어깨를 내리고 상체 정렬 유지",
        "가능한 시간만큼 버티고 휴식",
      ],
      frameText: "* 손가락/전완 ‘집는 힘’ 특화.",
      setScoreText: "4 세트 20초",
    },

    // advanced
    {
      levels: "advanced",
      label: "행잉 데드행(그립)",
      labelEn: "Dead Hang (Grip)",
      frames: f("forearm", "forearm-dead-hang", 4),
      points: [
        "바에 매달려 견갑을 안정화",
        "어깨가 귀로 올라가지 않게 내리기",
        "그립이 풀리기 전까지 버티기",
        "통증 있으면 즉시 중단",
      ],
      frameText: "* 전완/그립 최고 효율. 짧게 자주.",
      setScoreText: "5 세트 20~40초",
    },
    {
      levels: "advanced",
      label: "타월 풀업/타월 행잉(진행형)",
      labelEn: "Towel Hang / Towel Pull-up (Progression)",
      frames: f("forearm", "forearm-towel-hang", 4),
      points: [
        "수건을 바에 걸고 수건을 잡아 매달림",
        "그립 난이도가 크게 올라감",
        "스윙을 줄이고 견갑 안정 유지",
        "진행형: 매달림 → 니 레이즈 → 풀업",
      ],
      frameText: "* ‘쥐는 힘’ 극대화. 진행형 추천.",
      setScoreText: "4 세트 10~20초",
    },
    {
      levels: "advanced",
      label: "리버스 컬(바벨/EZ)",
      labelEn: "Reverse Curl (Barbell/EZ)",
      frames: f("forearm", "forearm-reverse-curl", 4),
      points: [
        "손등이 위로(오버그립) 바를 잡음",
        "팔꿈치를 고정하고 컬",
        "전완 신전근/상완요근까지 자극",
        "내릴 때 2~3초로 컨트롤",
      ],
      frameText: "* 전완 ‘앞쪽 라인’ 강화에 좋음.",
      setScoreText: "4 세트 8~10 회",
    },
  ] as const,
};

/** ✅ 한 번에 쓰기 편하게 묶음 export */
export const BODY_PART_MOTIONS = {
  upperArmFront: PART_UPPER_ARM_FRONT,
  trapsNeck: PART_TRAPS_NECK,
  upperAbs: PART_UPPER_ABS,
  shoulder: PART_SHOULDER,
  chest: PART_CHEST,
  oblique: PART_OBLIQUE,
  lowerAbs: PART_LOWER_ABS,
  neck: PART_NECK,
  forearm: PART_FOREARM,
} as const;