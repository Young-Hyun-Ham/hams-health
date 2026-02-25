<!-- src/routes/bodyparts/part/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import WorkoutPlayerModal from "$lib/components/WorkoutPlayerModal.svelte";
  import { getPart, type BodyPartId } from "$lib/bodyparts/parts";
  import { page } from "$app/stores";

  const fallbackImg = "/workouts/placeholder.png";

  type PlayerStep = {
    key: string;
    id: string;
    title: string;
    seconds: number;
    imgSrc: string;
    phase?: "warmup" | "main" | "finisher" | "cooldown";
  };

  // MVP용: 부위별 “샘플 루틴”
  // 나중에 여기만 너희 추천 엔진 결과로 교체하면 됨.
  const SAMPLE: Record<BodyPartId, { title: string; steps: PlayerStep[] }> = {
    upperArm: {
      title: "상완(팔) 집중 루틴",
      steps: [
        { key: "upperArm-1", id: "arm_warm", title: "팔/어깨 가동성 워밍업", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "upperArm-2", id: "triceps", title: "트라이셉스 익스텐션(맨몸/밴드)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "upperArm-3", id: "biceps", title: "바이셉스 컬(덤벨/밴드)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "upperArm-4", id: "cool", title: "팔 스트레칭", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    traps: {
      title: "승모/목덜미 이완 루틴",
      steps: [
        { key: "traps-1", id: "neck_mob", title: "목/흉추 가동성", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "traps-2", id: "shrug", title: "숄더 슈러그(가볍게)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "traps-3", id: "stretch", title: "승모근 스트레칭", seconds: 90, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    upperAbs: {
      title: "복부(상) 코어 루틴",
      steps: [
        { key: "upperAbs-1", id: "brace", title: "브레이싱 호흡", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "upperAbs-2", id: "crunch", title: "크런치(컨트롤)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "upperAbs-3", id: "plank", title: "플랭크", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "upperAbs-4", id: "cool", title: "복부 이완 호흡", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    shoulders: {
      title: "어깨 안정화 루틴",
      steps: [
        { key: "shoulders-1", id: "shoulder_mob", title: "어깨 서클/가동성", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "shoulders-2", id: "press", title: "숄더 프레스(가볍게)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "shoulders-3", id: "raise", title: "사이드 레이즈", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "shoulders-4", id: "cool", title: "어깨 스트레칭", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    chest: {
      title: "가슴 집중 루틴",
      steps: [
        { key: "chest-1", id: "chest_open", title: "가슴 열기 스트레칭", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "chest-2", id: "pushup", title: "푸시업(무릎 가능)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "chest-3", id: "hold", title: "푸시업 홀드", seconds: 45, imgSrc: fallbackImg, phase: "finisher" },
        { key: "chest-4", id: "cool", title: "가슴/어깨 이완", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    obliques: {
      title: "옆구리(사이드 코어) 루틴",
      steps: [
        { key: "obliques-1", id: "side_mob", title: "측면 스트레칭", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "obliques-2", id: "side_plank", title: "사이드 플랭크", seconds: 45, imgSrc: fallbackImg, phase: "main" },
        { key: "obliques-3", id: "twist", title: "러시안 트위스트(가볍게)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "obliques-4", id: "cool", title: "옆구리 이완", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    lowerAbs: {
      title: "하복부 루틴",
      steps: [
        { key: "lowerAbs-1", id: "pelvis", title: "골반 틸트", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "lowerAbs-2", id: "deadbug", title: "데드버그", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "lowerAbs-3", id: "legraise", title: "레그 레이즈(무리 X)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "lowerAbs-4", id: "cool", title: "허리/복부 이완", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    neck: {
      title: "목 컨디셔닝(주의) 루틴",
      steps: [
        { key: "neck-1", id: "neck_breath", title: "호흡 정리(긴장 풀기)", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "neck-2", id: "chin_tuck", title: "친턱(가볍게)", seconds: 45, imgSrc: fallbackImg, phase: "main" },
        { key: "neck-3", id: "neck_stretch", title: "목 스트레칭", seconds: 90, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
    forearms: {
      title: "전완(팔뚝) 루틴",
      steps: [
        { key: "forearms-1", id: "wrist_mob", title: "손목 가동성", seconds: 60, imgSrc: fallbackImg, phase: "warmup" },
        { key: "forearms-2", id: "wrist_curl", title: "손목 컬(가볍게)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "forearms-3", id: "reverse", title: "리버스 컬(가볍게)", seconds: 60, imgSrc: fallbackImg, phase: "main" },
        { key: "forearms-4", id: "cool", title: "전완 스트레칭", seconds: 60, imgSrc: fallbackImg, phase: "cooldown" },
      ],
    },
  };

  let playerOpen = false;
  let playerTitle = "";
  let playerSteps: PlayerStep[] = [];
  let playerWarnings: Array<{ tag: string; text: string }> = [];

  $: partId = $page.url.searchParams.get('part');
  $: part = getPart(partId ?? "");

  $: if (!part) {
    // 잘못된 진입이면 목록으로
    goto("/bodyparts", { replaceState: true });
  }

  function startRoutine() {
    if (!part) return;
    const data = SAMPLE[part.id as BodyPartId];

    playerTitle = data.title;
    playerSteps = data.steps;
    playerWarnings =
      part.id === "neck"
        ? [{ tag: "주의", text: "목 운동은 통증이 있으면 즉시 중단하고 무리하지 마세요." }]
        : [];

    playerOpen = true;
  }
</script>

<svelte:head>
  <title>{part ? `${part.label} 운동` : "운동"}</title>
</svelte:head>

{#if part}
  <div class="mx-auto max-w-3xl px-4 py-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">선택 부위</p>
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{part.label}</h1>
        <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          이 화면은 “부위 상세”의 MVP 버전이야. 다음 단계에서 추천 엔진 결과를 붙이면 완성.
        </p>
      </div>

      <button
        class="rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-neutral-200 bg-white hover:bg-neutral-50
               dark:bg-neutral-950 dark:ring-neutral-800 dark:hover:bg-neutral-900"
        on:click={() => goto("/bodyparts")}
      >
        ← 부위 다시 선택
      </button>
    </div>

    <div class="mt-5 rounded-2xl bg-white p-4 ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800">
      <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">오늘의 루틴</h2>
      <ul class="mt-3 space-y-2 text-sm">
        {#each SAMPLE[part.id as BodyPartId].steps as s}
          <li class="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 ring-1 ring-neutral-100
                     dark:bg-neutral-900/50 dark:ring-neutral-800">
            <span class="text-neutral-800 dark:text-neutral-100">{s.title}</span>
            <span class="text-neutral-500 dark:text-neutral-400">{s.seconds}s</span>
          </li>
        {/each}
      </ul>

      <div class="mt-4 flex gap-2">
        <button
          class="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white
                 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          on:click={startRoutine}
        >
          ▶ 루틴 시작
        </button>
      </div>

      {#if part.id === "neck"}
        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          * 목 부위는 특히 무리하지 말고, 통증/어지러움이 있으면 즉시 중단.
        </p>
      {/if}
    </div>
  </div>

  <WorkoutPlayerModal
    bind:open={playerOpen}
    title={playerTitle}
    warnings={playerWarnings}
    steps={playerSteps}
    onClose={() => (playerOpen = false)}
  />
{/if}
