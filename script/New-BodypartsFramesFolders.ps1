# scripts/New-BodypartsFramesFolders.ps1
# 실행: pwsh ./scripts/New-BodypartsFramesFolders.ps1
# 루트 기준 static/bodyparts/... 생성

$ErrorActionPreference = "Stop"

$root = Join-Path (Get-Location) "static\bodyparts"
New-Item -ItemType Directory -Force -Path $root | Out-Null

# partId / slug 목록 (현재 motions.data.ts 기준)
$items = @(
  # 1) upperArmFront
  @{ part="upperArmFront"; slug="biceps-dumbbell-curl" },
  @{ part="upperArmFront"; slug="biceps-hammer-curl" },
  @{ part="upperArmFront"; slug="biceps-cable-curl" },
  @{ part="upperArmFront"; slug="biceps-incline-dumbbell-curl" },
  @{ part="upperArmFront"; slug="biceps-concentration-curl" },
  @{ part="upperArmFront"; slug="biceps-barbell-curl" },
  @{ part="upperArmFront"; slug="biceps-chinup" },
  @{ part="upperArmFront"; slug="biceps-drag-curl" },
  @{ part="upperArmFront"; slug="biceps-spider-curl" },

  # 2) trapsNeck
  @{ part="trapsNeck"; slug="traps-dumbbell-shrug" },
  @{ part="trapsNeck"; slug="traps-band-face-pull" },
  @{ part="trapsNeck"; slug="traps-scapular-control" },
  @{ part="trapsNeck"; slug="traps-barbell-shrug" },
  @{ part="trapsNeck"; slug="traps-upright-row" },
  @{ part="trapsNeck"; slug="traps-cable-high-pull" },
  @{ part="trapsNeck"; slug="traps-snatchgrip-shrug" },
  @{ part="trapsNeck"; slug="traps-farmers-carry" },
  @{ part="trapsNeck"; slug="traps-front-rack-carry" },

  # 3) upperAbs
  @{ part="upperAbs"; slug="abs-crunch" },
  @{ part="upperAbs"; slug="abs-dead-bug" },
  @{ part="upperAbs"; slug="abs-plank" },
  @{ part="upperAbs"; slug="abs-cable-crunch" },
  @{ part="upperAbs"; slug="abs-reverse-crunch-controlled" },
  @{ part="upperAbs"; slug="abs-hollow-hold" },
  @{ part="upperAbs"; slug="abs-v-up" },
  @{ part="upperAbs"; slug="abs-toes-to-bar" },
  @{ part="upperAbs"; slug="abs-abwheel-rollout" },

  # 4) shoulder
  @{ part="shoulder"; slug="shoulder-dumbbell-press" },
  @{ part="shoulder"; slug="shoulder-lateral-raise" },
  @{ part="shoulder"; slug="shoulder-front-raise" },
  @{ part="shoulder"; slug="shoulder-arnold-press" },
  @{ part="shoulder"; slug="shoulder-rear-delt-fly" },
  @{ part="shoulder"; slug="shoulder-cable-lateral-raise" },
  @{ part="shoulder"; slug="shoulder-push-press" },
  @{ part="shoulder"; slug="shoulder-handstand-pushup" },
  @{ part="shoulder"; slug="shoulder-y-raise" },

  # 5) chest
  @{ part="chest"; slug="chest-pushup" },
  @{ part="chest"; slug="chest-dumbbell-floor-press" },
  @{ part="chest"; slug="chest-dumbbell-fly" },
  @{ part="chest"; slug="chest-dumbbell-bench-press" },
  @{ part="chest"; slug="chest-incline-dumbbell-press" },
  @{ part="chest"; slug="chest-dips" },
  @{ part="chest"; slug="chest-barbell-bench-press" },
  @{ part="chest"; slug="chest-cable-crossover" },
  @{ part="chest"; slug="chest-fly-to-press-combo" },

  # 6) oblique
  @{ part="oblique"; slug="oblique-side-plank" },
  @{ part="oblique"; slug="oblique-standing-side-crunch" },
  @{ part="oblique"; slug="oblique-knee-to-elbow" },
  @{ part="oblique"; slug="oblique-russian-twist" },
  @{ part="oblique"; slug="oblique-cable-woodchopper" },
  @{ part="oblique"; slug="oblique-pallof-press" },
  @{ part="oblique"; slug="oblique-windshield-wipers" },
  @{ part="oblique"; slug="oblique-hanging-knee-raise-twist" },
  @{ part="oblique"; slug="oblique-side-plank-hip-dips" },

  # 7) lowerAbs
  @{ part="lowerAbs"; slug="lowerabs-bent-knee-leg-raise" },
  @{ part="lowerAbs"; slug="lowerabs-reverse-crunch" },
  @{ part="lowerAbs"; slug="lowerabs-mountain-climber" },
  @{ part="lowerAbs"; slug="lowerabs-straight-leg-raise" },
  @{ part="lowerAbs"; slug="lowerabs-flutter-kicks" },
  @{ part="lowerAbs"; slug="lowerabs-hanging-knee-raise" },
  @{ part="lowerAbs"; slug="lowerabs-hanging-leg-raise" },
  @{ part="lowerAbs"; slug="lowerabs-l-sit" },
  @{ part="lowerAbs"; slug="lowerabs-dragon-flag" },

  # 8) neck
  @{ part="neck"; slug="neck-chin-tuck" },
  @{ part="neck"; slug="neck-isometrics-hand" },
  @{ part="neck"; slug="neck-mobility-slow" },
  @{ part="neck"; slug="neck-band-resistance" },
  @{ part="neck"; slug="neck-scapular-retraction" },
  @{ part="neck"; slug="neck-lateral-isometrics" },
  @{ part="neck"; slug="neck-4way-isometric-circuit" },
  @{ part="neck"; slug="neck-band-rotation" },
  @{ part="neck"; slug="neck-scap-stability-combo" },

  # 9) forearm
  @{ part="forearm"; slug="forearm-wrist-curl" },
  @{ part="forearm"; slug="forearm-reverse-wrist-curl" },
  @{ part="forearm"; slug="forearm-grip-squeeze" },
  @{ part="forearm"; slug="forearm-hammer-curl-tempo" },
  @{ part="forearm"; slug="forearm-farmers-hold" },
  @{ part="forearm"; slug="forearm-plate-pinch-hold" },
  @{ part="forearm"; slug="forearm-dead-hang" },
  @{ part="forearm"; slug="forearm-towel-hang" },
  @{ part="forearm"; slug="forearm-reverse-curl" }
)

# 기본: 1~4 프레임 placeholder 생성
$frameMax = 4

$createdFolders = 0
$createdFiles = 0

foreach ($it in $items) {
  $dir = Join-Path $root (Join-Path $it.part $it.slug)
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    $createdFolders++
  }

  for ($i = 1; $i -le $frameMax; $i++) {
    $p = Join-Path $dir "$i.png"
    if (-not (Test-Path $p)) {
      # 빈 파일 생성(placeholder). 나중에 실제 PNG로 덮어쓰기 하면 됨.
      New-Item -ItemType File -Force -Path $p | Out-Null
      $createdFiles++
    }
  }
}

Write-Host "✅ Done"
Write-Host " - Root: $root"
Write-Host " - Created folders: $createdFolders"
Write-Host " - Created files:   $createdFiles"