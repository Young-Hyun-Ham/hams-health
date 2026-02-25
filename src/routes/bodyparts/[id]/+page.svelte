<!-- src/routes/bodyparts/[id]/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { BODY_PART_MOTIONS } from "$lib/bodyparts/motions.data";
  import { getPart } from "$lib/bodyparts/parts";
  import { onDestroy, onMount } from "svelte";

  const id = $page.params.id;
  const part = getPart(id ?? "");

  type LevelKey = "beginner" | "intermediate" | "advanced";
  const LEVEL_LABEL: Record<LevelKey, string> = {
    beginner: "초급",
    intermediate: "중급",
    advanced: "고급",
  };

  const motionsData = BODY_PART_MOTIONS;
  const motions = motionsData[id as keyof typeof motionsData].motions as any ?? [] as const;

  const headerImg = `/bodyparts/${motionsData[id as keyof typeof motionsData].id}/main.png`;

  type Motion = (typeof motions)[number];

  // 레벨/운동 선택 상태
  let level: LevelKey = "beginner";
  $: motionsByLevel = motions.filter((m: any) => m.levels === level) as Motion[];

  // 레벨 안에서 '운동명(좌측 내용)'은 label+labelEn 기준으로 unique 처리
  $: motionOptions = Array.from(
    new Map(motionsByLevel.map((m) => [`${m.label}__${m.labelEn}`, m] as const)).values()
  ) as Motion[];

  // 현재 선택된 운동(좌측 표시)
  let selectedKey = "";
  $: if (!selectedKey || !motionOptions.some((m) => `${m.label}__${m.labelEn}` === selectedKey)) {
    selectedKey = motionOptions.length ? `${motionOptions[0].label}__${motionOptions[0].labelEn}` : "";
  }
  $: selectedMotion =
    motionOptions.find((m) => `${m.label}__${m.labelEn}` === selectedKey) ?? null;

  // 우측 3개 카드에 보여줄 motions (해당 레벨의 앞 3개)
  // $: rightMotions = motionsByLevel.slice(0, 3);

  // 애니메이션 상태(전체 motions 길이 만큼 유지)
  type MotionState = {
    frameIndex: number;
    img: string;
    timer: ReturnType<typeof setInterval> | null;
  };
  let motionStates: MotionState[] = motions.map((m: any) => ({
    frameIndex: 0,
    img: m.frames[0] ?? headerImg,
    timer: null,
  }));

  function stopAnim(i: number) {
    const t = motionStates[i]?.timer;
    if (t) {
      clearInterval(t);
      motionStates[i].timer = null;
    }
  }

  function startAnim(i: number) {
    stopAnim(i);
    motionStates[i].timer = setInterval(() => {
      const frames = motions[i].frames;
      const next = (motionStates[i].frameIndex + 1) % frames.length;
      motionStates[i].frameIndex = next;
      motionStates[i].img = frames[next];
      motionStates = motionStates; // reactivity
    }, 1000);
  }

  onMount(() => {
    for (let i = 0; i < motions.length; i++) startAnim(i);
  });

  onDestroy(() => {
    for (let i = 0; i < motions.length; i++) stopAnim(i);
  });

  // 모바일: 동작 카드 클릭 시 모달로 크게 보기
  let modalOpen = false;
  let modalIdx = 0;

  function openMotionModal(idx: number) {
    modalIdx = idx;
    modalOpen = true;
    // body 스크롤 잠금(모바일에서 특히 중요)
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }

  function closeMotionModal() {
    modalOpen = false;
    if (typeof document !== "undefined") document.body.style.overflow = "";
  }


  // ✅ 우측 카드: 화면폭에 따라 3/2/1개씩 "페이지"로 보여주기
  let rightStart = 0; // 현재 페이지 시작 index
  let rightPageSize = 3; // 1024↑:3, 640↑:2, 640미만:1

  // 레벨이 바뀌면 우측 페이지는 항상 처음으로
  let _prevLevel: LevelKey = level;
  $: if (level !== _prevLevel) {
    rightStart = 0;
    _prevLevel = level;
  }

  // 화면폭에 따라 rightPageSize 자동 변경
  // - >=1024px : 3개
  // - >=640px  : 2개
  // - <640px   : 1개
  onMount(() => {
    const mq3 = window.matchMedia("(min-width: 1024px)");
    const mq2 = window.matchMedia("(min-width: 640px)");

    const apply = () => {
      const nextSize = mq3.matches ? 3 : mq2.matches ? 2 : 1;

      if (rightPageSize !== nextSize) {
        rightPageSize = nextSize;

        // ✅ pageSize가 바뀌면 현재 위치를 "페이지 경계"에 맞춰 보정
        // 예: 3개 보다가 2개로 바뀌어도 어색하게 중간부터 보이지 않게
        rightStart = Math.floor(rightStart / rightPageSize) * rightPageSize;
      }
    };

    apply();

    const handler = () => apply();
    if (mq3.addEventListener) {
      mq3.addEventListener("change", handler);
      mq2.addEventListener("change", handler);
    } else {
      // @ts-ignore (구형 브라우저)
      mq3.addListener(handler);
      // @ts-ignore
      mq2.addListener(handler);
    }

    return () => {
      if (mq3.removeEventListener) {
        mq3.removeEventListener("change", handler);
        mq2.removeEventListener("change", handler);
      } else {
        // @ts-ignore
        mq3.removeListener(handler);
        // @ts-ignore
        mq2.removeListener(handler);
      }
    };
  });

  // ✅ pageSize 기준으로 paging 계산
  $: rightMaxStart = Math.max(0, motionsByLevel.length - rightPageSize);
  $: rightHasPaging = motionsByLevel.length > rightPageSize;

  // ✅ 현재 페이지에서 보여줄 카드들
  $: rightMotions = motionsByLevel.slice(rightStart, rightStart + rightPageSize);

  function nextRight() {
    if (!rightHasPaging) return;
    rightStart = Math.min(rightMaxStart, rightStart + rightPageSize);
  }

  function prevRight() {
    if (!rightHasPaging) return;
    rightStart = Math.max(0, rightStart - rightPageSize);
  }
  
</script>

<svelte:head>
  <title>{part?.label ?? "상세"}</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-4">
  <button
    type="button"
    class="mb-6 text-sm text-neutral-600 hover:underline dark:text-neutral-300"
    on:click={() => goto("/bodyparts")}
  >
    ← 부위 선택으로
  </button>

  <!-- 한 로우 4칸: lg에서 4컬럼 -->
  <div
  class="grid gap-4 lg:grid-cols-4 lg:items-stretch
         lg:[--card-h:min(86dvh,820px)]"
>
    <!-- 1) LEFT -->
    <section
      class="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800
            flex flex-col h-[var(--card-h)]"
    >
      <div class="overflow-hidden rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-800">
        <img
          src={headerImg}
          alt="등 운동"
          class="block w-full object-contain bg-white dark:bg-neutral-950"
          loading="eager"
        />
      </div>

      <div class="mt-3 grid gap-2">
        <label class="text-[11px] font-medium text-neutral-500 dark:text-neutral-300">
          <select
            class="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-[12px] text-neutral-800 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-neutral-300
                   dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-700"
            bind:value={level}
          >
            <option value="beginner">단계) 초급</option>
            <option value="intermediate">단계) 중급</option>
            <option value="advanced">단계) 고급</option>
          </select>
        </label>

        <label class="text-[11px] font-medium text-neutral-500 dark:text-neutral-300">
          <select
            class="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-[12px] text-neutral-800 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-neutral-300
                   dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-700"
            bind:value={selectedKey}
            disabled={!motionOptions.length}
          >
            {#each motionOptions as m}
              <option value={`${m.label}__${m.labelEn}`}>운동) {m.label}</option>
            {/each}
          </select>
        </label>
      </div>

      {#if selectedMotion}
        <!-- points 영역: 남은 높이만 사용 + 필요할 때만 스크롤 -->
        <div class="mt-4 flex-1 min-h-0 overflow-hidden">
          <div class="h-full overflow-auto pr-1 custom-scroll">
            <div class="prose prose-sm prose-neutral max-w-none dark:prose-invert prose-tight">
              <ul class="points-ul">
                {#each selectedMotion.points as p}
                  <li>{p}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {:else}
        <p class="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          선택 가능한 운동이 없습니다.
        </p>
      {/if}
    </section>

    <!-- ✅ RIGHT: 3칸 영역(내부 그리드) + 좌/우 투명 버튼 -->
    <div class="relative lg:col-span-3">
      <!-- 내부 3칸 그리드 -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each rightMotions as m}
          {@const idx = motions.indexOf(m)}
          <section
            class="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800
                  flex flex-col lg:h-[var(--card-h)]"
          >
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">{m.levels}</h2>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">{m.label}</span>
            </div>

            <button
              type="button"
              class="mt-3 block w-full overflow-hidden rounded-xl bg-white ring-1 ring-neutral-200
                    focus:outline-none focus:ring-2 focus:ring-neutral-300
                    dark:bg-neutral-950 dark:ring-neutral-800 dark:focus:ring-neutral-700
                    flex flex-col
                    h-[420px] sm:h-[460px] lg:h-[520px]"
              on:click={() => openMotionModal(idx)}
              aria-label="{m.label} 크게 보기"
            >
              <div class="relative w-full flex-1 overflow-hidden bg-white dark:bg-neutral-950">
                <img
                  src={motionStates[idx].img}
                  alt=""
                  aria-hidden="true"
                  class="absolute inset-0 h-full w-full object-cover blur-2xl opacity-20 scale-110"
                  draggable="false"
                />

                <div class="relative z-10 flex h-full w-full items-start justify-center pt-3">
                  <img
                    src={motionStates[idx].img}
                    class="max-h-full w-auto object-contain"
                    loading="eager"
                    draggable="false"
                    alt="{m.label} 동작"
                  />
                </div>

                <div
                  class="pointer-events-none absolute inset-x-0 bottom-0 h-16
                        bg-gradient-to-t from-white to-transparent
                        dark:from-neutral-950 dark:to-transparent"
                />
              </div>

              <div class="w-full px-3 py-2">
                <div class="mt-1 text-center text-[12px] font-semibold text-neutral-800 dark:text-neutral-100">
                  {m.setScoreText}
                </div>

                <p class="text-center text-[11px] leading-tight text-neutral-500 dark:text-neutral-300">
                  {m.frameText}
                </p>
              </div>
            </button>
          </section>
        {/each}
      </div>

      <!-- ✅ 좌/우 투명 네비 버튼: 3개 초과일 때만 표시 -->
      {#if rightHasPaging}
        <!-- LEFT -->
        <button
          type="button"
          class="nav-hit left-0"
          on:click={prevRight}
          disabled={rightStart === 0}
          aria-label="이전 운동 보기"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M14.5 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>

        <!-- RIGHT -->
        <button
          type="button"
          class="nav-hit right-0"
          on:click={nextRight}
          disabled={rightStart >= rightMaxStart}
          aria-label="다음 운동 보기"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9.5 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      {/if}
    </div>
  </div>
</div>

<!-- modal popup (모바일에서 화면 높이에 딱 맞게) -->
{#if modalOpen}
  <div
    class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-3"
    role="dialog"
    aria-modal="true"
    on:click|self={closeMotionModal}
  >
    <div
      class="w-full max-w-md rounded-2xl bg-white ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800
             overflow-hidden"
      style="max-height: calc(100dvh - 24px);"
    >
      <div class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div class="min-w-0">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {motions[modalIdx].label}
          </div>
          <div class="text-[11px] text-neutral-500 dark:text-neutral-400">
            {LEVEL_LABEL[motions[modalIdx].levels as LevelKey]}
          </div>
        </div>

        <button
          type="button"
          class="rounded-lg px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100
                 dark:text-neutral-300 dark:hover:bg-neutral-900"
          on:click={closeMotionModal}
        >
          닫기
        </button>
      </div>

      <!-- 모달 본문: 남은 높이만큼 꽉 채우고 이미지 중앙 정렬 -->
      <div class="p-3" style="height: calc(100dvh - 24px - 52px);">
        <div class="h-full w-full overflow-hidden rounded-xl bg-white ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800">
          <img
            src={motionStates[modalIdx].img}
            alt="{motions[modalIdx].label} 동작"
            class="h-full w-full object-contain"
            draggable="false"
          />
        </div>

        <p class="mt-2 text-[10px] leading-tight text-neutral-400 dark:text-neutral-200">
          ${motions[modalIdx].frameText}
        </p>
      </div>
    </div>
  </div>
{/if}

<style>
  /* prose가 만드는 ul 여백 때문에 1~2px 오버플로우가 자주 발생함 */
  .prose-tight :global(ul) {
    margin: 0 !important;
    padding-left: 1.1rem; /* 불릿 들여쓰기는 유지(원하면 0도 가능) */
  }

  /* points 목록 자체도 한번 더 고정 (prose 영향 차단) */
  .points-ul {
    margin: 0;
  }

  /* ===== Minimal scrollbar (Chrome/Edge/Safari) ===== */
  .custom-scroll::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.12);
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  .custom-scroll:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.22);
  }

  /* ===== Dark mode ===== */
  :global(html.dark) .custom-scroll::-webkit-scrollbar-thumb,
  :global(.dark) .custom-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.14);
  }
  :global(html.dark) .custom-scroll:hover::-webkit-scrollbar-thumb,
  :global(.dark) .custom-scroll:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.26);
  }

  /* ===== Firefox ===== */
  .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.22) transparent;
  }
  :global(html.dark) .custom-scroll,
  :global(.dark) .custom-scroll {
    scrollbar-color: rgba(255, 255, 255, 0.26) transparent;
  }

  /* ===== RIGHT paging button (더 또렷하게) ===== */

.nav-hit {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.18),
    rgba(0,0,0,0.05),
    transparent
  );
  cursor: pointer;
  z-index: 30;
  transition: background .2s ease;
}

.nav-hit.right-0 {
  background: linear-gradient(
    to left,
    rgba(0,0,0,0.18),
    rgba(0,0,0,0.05),
    transparent
  );
}

.nav-hit:hover {
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.35),
    rgba(0,0,0,0.12),
    transparent
  );
}

.nav-hit.right-0:hover {
  background: linear-gradient(
    to left,
    rgba(0,0,0,0.35),
    rgba(0,0,0,0.12),
    transparent
  );
}

/* 아이콘 */

.nav-icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(8px);
  transition: transform .15s ease, background .15s ease;
}

.nav-hit:hover .nav-icon {
  transform: scale(1.08);
  background: rgba(0,0,0,0.65);
}

.nav-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

/* disabled */
.nav-hit:disabled {
  pointer-events: none;
  opacity: 0;
}

/* ===== Dark mode 조정 ===== */

:global(html.dark) .nav-hit,
:global(.dark) .nav-hit {
  background: linear-gradient(
    to right,
    rgba(255,255,255,0.08),
    rgba(255,255,255,0.03),
    transparent
  );
}

:global(html.dark) .nav-hit.right-0,
:global(.dark) .nav-hit.right-0 {
  background: linear-gradient(
    to left,
    rgba(255,255,255,0.08),
    rgba(255,255,255,0.03),
    transparent
  );
}

:global(html.dark) .nav-icon,
:global(.dark) .nav-icon {
  background: rgba(255,255,255,0.18);
}


</style>
