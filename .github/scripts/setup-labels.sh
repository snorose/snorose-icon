trap 'echo; read -r -p "스크립트가 종료되었습니다. Enter 키를 누르면 창이 닫힙니다."' EXIT

# Git 저장소 내부인지 확인
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Git 저장소 내부에서 실행해 주세요."
  exit 1
fi

# 현재 연결된 GitHub 저장소 확인
REPOSITORY=$(gh repo view --json nameWithOwner --jq '.nameWithOwner')

if [ -z "$REPOSITORY" ]; then
  echo "❌ GitHub 저장소 정보를 확인할 수 없습니다."
  exit 1
fi

echo "📦 대상 저장소: $REPOSITORY"
echo

gh label list \
  --limit 1000 \
  --json name \
  --jq '.[].name' |
while IFS= read -r label; do
  gh label delete "$label" --yes
done

label_specs=(
  '✨ Feature|B0F207|새로운 기능 추가'
  '🐞 BugFix|D73A4A|버그, 에러 수정'
  '📄 Docs|0075CA|문서 수정'
  '🧹 Chore|A85C44|빌드, 패키지 관리 등'
  '🪄 Modify|74D1BC|기능의 수정이나 사소한 변경 사항'
  '🎨 UI|FEF2C0|UI/UX, 스타일링 등 디자인 관련 작업'
  '🧚 Style|006B75|코드 스타일 관련 작업'
  '❄️ Release|87BDD8|버전 배포 또는 릴리즈 관련'
  '⚙️ Setting|BFD4F2|설정 파일 변경'
  '🛠️ Refactor|0AC3B0|코드 리팩토링'
  '⚡ API|D4C5F9|API 관련 작업'
  '🙏 Next|FFFF00|리뷰만 먼저 해주세요! 다음 릴리즈 전까지 merge는 잠시 보류'
  '🚧 Not Ready for Review|8D42A3|작업 중인 PR입니다. 완료 후 리뷰 부탁드려요.'
)

for spec in "${label_specs[@]}"; do
  IFS='|' read -r name color description <<< "$spec"

  gh label create "$name" \
    --color "$color" \
    --description "$description" \
    --force
done

echo
echo "✅ $REPOSITORY 저장소에 GitHub 라벨 적용이 완료되었습니다."