<!-- src/routes/bodyparts/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { BODY_PARTS } from "$lib/bodyparts/parts";
  import muscleGrid from "$lib/assets/bodyparts/muscle-grid.png?url";

  const imgUrl = muscleGrid;

  function pos(row: number, col: number) {
    const x = col === 0 ? "0%" : col === 1 ? "50%" : "100%";
    const y = row === 0 ? "0%" : row === 1 ? "50%" : "100%";
    return { x, y };
  }
</script>

<svelte:head>
  <title>부위 선택</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-6">
  <div class="mb-4">
    <!-- 
    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
      원하는 부위를 선택해줘
    </h1> 
    -->
  </div>

  <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {#each BODY_PARTS as p}
      {@const xy = pos(p.row, p.col)}

      <button
        type="button"
        class="group relative w-full aspect-square overflow-hidden rounded-2xl
          ring-1 ring-neutral-200 shadow-sm
          hover:shadow-md hover:ring-neutral-300
          dark:ring-neutral-800 dark:hover:ring-neutral-700"
        on:click={() => goto(`/bodyparts/${p.id}`)}
        aria-label={`${p.label} 운동 보기`}
      >
        <!-- self-closing 금지: 반드시 닫기 -->
        <div
          class="absolute inset-0 z-0"
          style={`background-image:url(${imgUrl});
                 background-size:300% 300%;
                 background-position:${xy.x} ${xy.y};
                 background-repeat:no-repeat;`}
        ></div>

        <div class="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition"></div>

        <div class="absolute left-3 bottom-3 right-3 z-20 flex items-center justify-between">
          <span class={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${p.badgeClass}`}>
            {p.label}
          </span>

          <span class="rounded-full bg-white/80 px-2 py-1 text-[11px] font-medium text-neutral-800
                       dark:bg-neutral-950/70 dark:text-neutral-100">
            선택 →
          </span>
        </div>
      </button>
    {/each}
  </div>
<!-- 
  <div class="mt-6 rounded-2xl bg-white p-4 text-sm text-neutral-700 ring-1 ring-neutral-200
              dark:bg-neutral-950 dark:text-neutral-200 dark:ring-neutral-800">
    <p class="font-medium mb-1">다음 단계</p>
    <p class="text-neutral-600 dark:text-neutral-300">
      상세 화면에서 “루틴 시작”을 누르면, 기존 <code class="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900">WorkoutPlayerModal</code>로 재생까지 연결할 수 있어.
    </p>
  </div> 
-->
</div>
