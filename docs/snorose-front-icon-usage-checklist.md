# snorose-front 아이콘 교체 체크리스트

조사 기준일: 2026-08-29

## 확인 요약

- `snorose-front`에는 `@snorose/icons`가 dependency로 등록되어 있지만, 현재 소스에서 직접 import하는 사용처는 없습니다.
- 실제 화면에서는 `snorose-front/src/assets/icon.svg` 스프라이트와 `src/shared/component/Icon/Icon.jsx`의 `<Icon id="..." />` 패턴을 사용합니다.
- 아래 체크박스는 아이콘 교체 완료 여부를 표시하기 위한 것입니다.
- "프론트 id"는 현재 `snorose-front`에서 쓰는 스프라이트 symbol id입니다.
- "후보" 표시는 `snorose-icon`의 파일명과 프론트 id가 1:1로 완전히 같지는 않지만, 의미상 교체 후보로 보이는 항목입니다.

## Basic icons

- [ ] `ic-basic-arrow-left.svg` / `IconArrowLeft`
  - 프론트 id: `arrow-left`
  - 사용처:
    - [ ] `src/feature/account/component/TermModal/TermModal.jsx`
    - [ ] `src/shared/component/layout/BackAppBar/BackAppBar.jsx`

- [ ] `ic-basic-arrow-corner-down-right.svg` / `IconArrowCornerDownRight`
  - 프론트 id 후보: `nested-arrow`
  - 사용처:
    - [ ] `src/feature/comment/component/NestedComment/NestedComment.jsx`

- [ ] `ic-basic-bell.svg` / `IconBell`
  - 프론트 id: `bell`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 알림 탭 기본 상태

- [ ] `ic-basic-bell-fill.svg` / `IconBellFill`
  - 프론트 id: `bell-fill`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 알림 탭 활성 상태

- [ ] `ic-basic-book.svg` / `IconBook`
  - 프론트 id 후보: `board`, `test`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 게시판/시험후기 탭 기본 상태

- [ ] `ic-basic-book-fill.svg` / `IconBookFill`
  - 프론트 id 후보: `board-fill`, `test-fill`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 게시판/시험후기 탭 활성 상태

- [ ] `ic-basic-bookmark.svg` / `IconBookmark`
  - 프론트 id 후보: `scrap-stroke`
  - 사용처:
    - [ ] `src/feature/board/component/PostActionBar/PostActionBar.jsx`
    - [ ] `src/feature/board/component/PostBar/PostBar.jsx`
    - [ ] `src/page/event/EventPage/EventPage.jsx`
    - [ ] `src/page/exam/ExamReviewPage/ExamReviewPage.jsx`

- [ ] `ic-basic-bookmark-fill.svg` / `IconBookmarkFill`
  - 프론트 id: `bookmark-fill`
  - 사용처:
    - [ ] `src/feature/board/component/NoticeBar/NoticeBar.jsx`

- [ ] `ic-basic-check.svg` / `IconCheck`
  - 프론트 id: `check`
  - 사용처:
    - [ ] `src/shared/component/dropdown/DropdownList/DropdownList.jsx`

- [ ] `ic-basic-check-circle.svg` / `IconCheckCircle`
  - 프론트 id: `check-circle`
  - 사용처:
    - [ ] `src/feature/exam/component/ConfirmedIcon/ConfirmedIcon.tsx`

- [ ] `ic-basic-chevron-down.svg` / `IconChevronDown`
  - 프론트 id 후보: `angle-down`, `angle-down-blue`, `arrow-down`
  - 사용처:
    - [ ] `src/page/board/EditPostPage/EditPostPage.jsx`
    - [ ] `src/page/board/WritePostPage/WritePostPage.jsx`
    - [ ] `src/page/event/WriteEventPage/WriteEventPage.jsx`
    - [ ] `src/feature/home/component/Accordion/Accordion.jsx`
    - [ ] `src/feature/board/component/AccordianBoards/AccordianBoards.jsx`
    - [ ] `src/feature/editor/component/FixedMenuEditor/FixedMenuEditor.jsx`
    - [ ] `src/shared/component/dropdown/SelectedItem/SelectedItem.jsx`

- [ ] `ic-basic-chevron-right.svg` / `IconChevronRight`
  - 프론트 id: `chevron-right`
  - 사용처:
    - [ ] `src/feature/account/component/signUpStep/UserInfoStep/UserInfoStep.jsx`
    - [ ] `src/feature/home/component/ListHeader/ListHeader.jsx`
    - [ ] `src/page/account/FindIdPage/FindIdPage.jsx`

- [ ] `ic-basic-chevron-up.svg` / `IconChevronUp`
  - 프론트 id 후보: `angle-up-blue`
  - 사용처:
    - [ ] `src/feature/exam/component/Filter/Filter.jsx`

- [ ] `ic-basic-clapperboard.svg` / `IconClapperboard`
  - 프론트 id 후보: `movie`
  - 사용처:
    - [ ] `src/page/event/EventPage/EventPage.jsx`

- [ ] `ic-basic-comment-fill.svg` / `IconCommentFill`
  - 프론트 id 후보: `comment`, `comment-stroke`
  - 사용처:
    - [ ] `src/shared/constant/board.js`
    - [ ] `src/feature/board/component/PostActionBar/PostActionBar.jsx`
    - [ ] `src/feature/board/component/PostBar/PostBar.jsx`
    - [ ] `src/feature/comment/component/Comment/Comment.jsx`
    - [ ] `src/page/event/EventPage/EventPage.jsx`
    - [ ] `src/page/exam/ExamReviewPage/ExamReviewPage.jsx`

- [ ] `ic-basic-eye.svg` / `IconEye`
  - 프론트 id 후보: `closed-eye`
  - 사용처:
    - [ ] `src/shared/component/form/input/PasswordInput.jsx`

- [ ] `ic-basic-eye-fill.svg` / `IconEyeFill`
  - 프론트 id 후보: `opened-eye`
  - 사용처:
    - [ ] `src/shared/component/form/input/PasswordInput.jsx`

- [ ] `ic-basic-file.svg` / `IconFile`
  - 프론트 id: `file`
  - 사용처:
    - [ ] `src/feature/exam/component/ReviewDownload/ReviewDownload.jsx`
    - [ ] `src/feature/exam/component/ReviewDownload/ReviewDownload.stories.jsx`

- [ ] `ic-basic-hamburger-menu.svg` / `IconHamburgerMenu`
  - 프론트 id: `hamburger`
  - 사용처:
    - [ ] `src/shared/component/MenuIcon/MenuIcon.jsx`

- [ ] `ic-basic-hashtag.svg` / `IconHashtag`
  - 프론트 id: `hashtag`, `hashtag-fill`
  - 사용처:
    - [ ] `src/feature/board/component/AttachmentBar/AttachmentBar.jsx`

- [ ] `ic-basic-heart.svg` / `IconHeart`
  - 프론트 id 후보: `like-stroke`
  - 사용처:
    - [ ] `src/feature/board/component/PostActionBar/PostActionBar.jsx`
    - [ ] `src/feature/board/component/PostBar/PostBar.jsx`
    - [ ] `src/feature/comment/component/Comment/Comment.jsx`
    - [ ] `src/feature/comment/component/NestedComment/NestedComment.jsx`
    - [ ] `src/page/event/EventPage/EventPage.jsx`

- [ ] `ic-basic-heart-fill.svg` / `IconHeartFill`
  - 프론트 id 후보: `like`
  - 사용처:
    - [ ] `src/feature/board/component/NoticeBar/NoticeBar.jsx`

- [ ] `ic-basic-home-fill.svg` / `IconHomeFill`
  - 프론트 id: `home-fill`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 메인홈 활성 상태

- [ ] `ic-basic-image.svg` / `IconImage`
  - 프론트 id: `image`
  - 사용처:
    - [ ] `src/feature/board/component/AttachmentBar/AttachmentBar.jsx`

- [ ] `ic-basic-image-fill.svg` / `IconImageFill`
  - 프론트 id: `image-fill`
  - 사용처:
    - [ ] `src/feature/board/component/AttachmentBar/AttachmentBar.jsx`

- [ ] `ic-basic-instagram-fill.svg` / `IconInstagramFill`
  - 프론트 id: `instagram`
  - 사용처:
    - [ ] `src/shared/constant/footerData.js`
    - [ ] `src/shared/component/layout/Footer/Footer.jsx`

- [ ] `ic-basic-location.svg` / `IconLocation`
  - 프론트 id: `location`
  - 사용처:
    - [ ] `src/page/event/EventPage/EventPage.jsx`

- [ ] `ic-basic-mypage.svg` / `IconMypage`
  - 프론트 id: `mypage`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 내정보 기본 상태

- [ ] `ic-basic-mypage-fill.svg` / `IconMypageFill`
  - 프론트 id: `mypage-fill`
  - 사용처:
    - [ ] `src/shared/component/layout/Navbar/Navbar.jsx` 에서 내정보 활성 상태

- [ ] `ic-basic-pencil-fill.svg` / `IconPencilFill`
  - 프론트 id 후보: `pencil`, `pencil-blue`
  - 사용처:
    - [ ] `src/shared/component/button/WriteButton/WriteButton.jsx`
    - [ ] `src/shared/constant/modalOptions.js`
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-basic-pencil-underline.svg` / `IconPencilUnderline`
  - 프론트 id: `pencil-underline`
  - 사용처:
    - [ ] `src/feature/my/component/TopOverlay/TopOverlay.jsx`

- [ ] `ic-basic-person.svg` / `IconPerson`
  - 프론트 id: `person`
  - 사용처:
    - [ ] `src/page/event/EventPage/EventPage.jsx`

- [ ] `ic-basic-point-circle.svg` / `IconPointCircle`
  - 프론트 id: `point-circle`
  - 사용처:
    - [ ] `src/feature/my/component/MyInfo/MyInfo.jsx`
    - [ ] `src/page/home/AttendancePage/AttendancePage.jsx`

- [ ] `ic-basic-search.svg` / `IconSearch`
  - 프론트 id: `search`
  - 사용처:
    - [ ] `src/feature/search/component/Search/Search.jsx`

- [ ] `ic-basic-trashcan-fill.svg` / `IconTrashcanFill`
  - 프론트 id 후보: `trash`, `trashcan`
  - 사용처:
    - [ ] `src/shared/constant/modalOptions.js`
    - [ ] `src/shared/constant/modalText.js`
    - [ ] `src/page/board/EditPostPage/EditPostPage.jsx`
    - [ ] `src/page/board/WritePostPage/WritePostPage.jsx`

- [ ] `ic-basic-video.svg` / `IconVideo`
  - 프론트 id: `video`, `video-fill`
  - 사용처:
    - [ ] `src/feature/board/component/AttachmentBar/AttachmentBar.jsx`

- [ ] `ic-basic-x.svg` / `IconX`
  - 프론트 id: `x`
  - 사용처:
    - [ ] `src/feature/event/component/GuideModal/GuideModal.jsx`
    - [ ] `src/shared/component/layout/CloseAppBar/CloseAppBar.jsx`

## Multi icons

- [ ] `ic-multi-badge-blue.svg` / `IconMultiBadgeBlue`
  - 프론트 직접 SVG 후보: `src/assets/images/officialBadge.svg`
  - 사용처:
    - [ ] `src/shared/component/Badge/Badge.jsx`

- [ ] `ic-multi-badge-pink.svg` / `IconMultiBadgePink`
  - 프론트 직접 SVG 후보: `src/assets/images/adminBadge.svg`
  - 사용처:
    - [ ] `src/shared/component/Badge/Badge.jsx`

- [ ] `ic-multi-bell-blue.svg` / `IconMultiBellBlue`
  - 프론트 id 후보: `notice-bell`, `comment-bell`
  - 사용처:
    - [ ] `src/page/alert/AlertPage/AlertPage.jsx`
    - [ ] `src/page/board/PostListPage/PostListPage.jsx`
    - [ ] `src/page/event/EventListPage/EventListPage.jsx`
    - [ ] `src/page/exam/ExamReviewListPage/ExamReviewListPage.jsx`
    - [ ] `src/feature/alert/component/BellIcon/BellIcon.jsx`

- [ ] `ic-multi-bell-pink.svg` / `IconMultiBellPink`
  - 프론트 id 후보: `comment-bell-fill`
  - 사용처:
    - [ ] `src/feature/alert/component/BellIcon/BellIcon.jsx`

- [ ] `ic-multi-camera.svg` / `IconMultiCamera`
  - 프론트 id 후보: `camera`, `camera-blue-stroke`, `blue-camera`
  - 사용처:
    - [ ] `src/shared/constant/board.js`
    - [ ] `src/shared/constant/modalText.js`
    - [ ] `src/page/user/EditProfilePage/EditProfilePage.jsx`

- [ ] `ic-multi-check-pink-circle.svg` / `IconMultiCheckPinkCircle`
  - 프론트 id 후보: `active-check-circle`, `active-check-circle-outline`, `check-circle-fill`
  - 사용처:
    - [ ] `src/page/account/LoginPage/LoginPage.jsx`
    - [ ] `src/shared/component/Toast/Toast.jsx`
    - [ ] `src/feature/attendance/component/Calendar/Calendar.jsx`

- [ ] `ic-multi-clipboard-blue.svg` / `IconMultiClipboardBlue`
  - 프론트 id 후보: `clip-board-list`
  - 사용처:
    - [ ] `src/page/board/EditPostPage/EditPostPage.jsx`
    - [ ] `src/page/board/WritePostPage/WritePostPage.jsx`
    - [ ] `src/page/event/EditEventPage/EditEventPage.jsx`
    - [ ] `src/page/event/WriteEventPage/WriteEventPage.jsx`
    - [ ] `src/page/exam/WriteExamReviewPage/WriteExamReviewPage.jsx`

- [ ] `ic-multi-clipboard-white.svg` / `IconMultiClipboardWhite`
  - 프론트 id 후보: `clip-board-list`
  - 사용처:
    - [ ] 위와 동일. 일부 사용처에서 `fill="white"`로 렌더링합니다.

- [ ] `ic-multi-cloud-black.svg` / `IconMultiCloudBlack`
  - 프론트 직접 SVG 후보: `src/assets/images/blackCloudLogo.svg`
  - 사용처:
    - [ ] `src/feature/home/component/AccordionListItem/AccordionListItem.jsx`

- [ ] `ic-multi-comment-x.svg` / `IconMultiCommentX`
  - 프론트 id 후보: `list-x-circle`, `report-comment`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-dollar-circle.svg` / `IconMultiDollarCircle`
  - 프론트 id: `dollar-circle`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-flag.svg` / `IconMultiFlag`
  - 프론트 id 후보: `flag`, `flag-pink`
  - 사용처:
    - [ ] `src/shared/constant/board.js`
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-gesture-hand.svg` / `IconMultiGestureHand`
  - 프론트 id 후보: `hand-stop`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-heart-minus-circle.svg` / `IconMultiHeartMinusCircle`
  - 프론트 직접 SVG 후보: `src/assets/images/heartMinus.svg`
  - 사용처:
    - [ ] `src/feature/my/component/PointLog/PointLog.jsx`

- [ ] `ic-multi-heart-plus-circle.svg` / `IconMultiHeartPlusCircle`
  - 프론트 직접 SVG 후보: `src/assets/images/heartPlus.svg`
  - 사용처:
    - [ ] `src/feature/my/component/PointLog/PointLog.jsx`

- [ ] `ic-multi-message-alert.svg` / `IconMultiMessageAlert`
  - 프론트 id 후보: `comment-exclamation-question-mark`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-point-circle.svg` / `IconMultiPointCircle`
  - 프론트 id 후보: `point-circle`, `point-circle-blue`
  - 사용처:
    - [ ] `src/feature/my/component/MyInfo/MyInfo.jsx`
    - [ ] `src/page/home/AttendancePage/AttendancePage.jsx`
    - [ ] `src/page/user/PointLogListPage/PointLogListPage.jsx`

- [ ] `ic-multi-question-circle.svg` / `IconMultiQuestionCircle`
  - 프론트 id 후보: `question-mark-circle`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-sad-face.svg` / `IconMultiSadFace`
  - 프론트 id: `sad-face`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-share.svg` / `IconMultiShare`
  - 프론트 id: `share`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-shield-off.svg` / `IconMultiShieldOff`
  - 프론트 id 후보: `x-shield`, `ban`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`
    - [ ] `src/shared/constant/board.js`

- [ ] `ic-multi-skull.svg` / `IconMultiSkull`
  - 프론트 id 후보: `skull-face`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-user-question.svg` / `IconMultiUserQuestion`
  - 프론트 id 후보: `user-question-mark`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

- [ ] `ic-multi-video.svg` / `IconMultiVideo`
  - 프론트 id 후보: `video`, `video-fill`, `video-opaque`
  - 사용처:
    - [ ] `src/feature/board/component/AttachmentBar/AttachmentBar.jsx`
    - [ ] `src/shared/component/AttachmentList/AttachmentList.jsx`
    - [ ] `src/shared/component/AttachmentSwiper/AttachmentSwiper.jsx`

- [ ] `ic-multi-warning-cone.svg` / `IconMultiWarningCone`
  - 프론트 id 후보: `traffic-cone`
  - 사용처:
    - [ ] `src/shared/constant/modalText.js`

## Illustrations

- [ ] `il-bell-empty.svg` / `IllustrationBellEmpty`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/noAlertIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js` 를 통해 no alert 상태에서 사용 가능

- [ ] `il-comment-empty.svg` / `IllustrationCommentEmpty`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/noCommentedPostsIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js` 를 통해 댓글 없음 상태에서 사용 가능

- [ ] `il-email-check.svg` / `IllustrationEmailCheck`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/emailSendIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js` 를 통해 이메일 발송/확인 상태에서 사용 가능

- [ ] `il-megaphone.svg` / `IllustrationMegaphone`
  - 프론트 직접 SVG 후보: `src/assets/images/megaphone.svg`
  - 사용처:
    - [ ] `src/feature/home/component/HomeCard/HomeCard.jsx` 에서 `require("@/assets/images/${icon.id}.svg")` 패턴으로 사용

- [ ] `il-megaphone-blue.svg` / `IllustrationMegaphoneBlue`
  - 프론트 직접 SVG 후보: `src/assets/images/blueMegaphone.svg`
  - 사용처:
    - [ ] `src/feature/home/component/HomeCard/HomeCard.jsx` 에서 `require("@/assets/images/${icon.id}.svg")` 패턴으로 사용

- [ ] `il-padlock.svg` / `IllustrationPadlock`
  - 프론트 직접 SVG 후보: `src/assets/images/lock.svg`
  - 사용처:
    - [ ] `src/feature/home/component/HomeBoardCard/HomeBoardCard.jsx`

- [ ] `il-post-empty.svg` / `IllustrationPostEmpty`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/noPostsIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js` 를 통해 게시글 없음 상태에서 사용 가능

- [ ] `il-scrap-post-empty.svg` / `IllustrationScrapPostEmpty`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/noScrapedPostsIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js` 를 통해 스크랩 없음 상태에서 사용 가능

- [ ] `il-flag.svg` / `IllustrationFlag`
  - 프론트 직접 SVG 후보: `src/assets/images/flag.svg`
  - 사용처:
    - [ ] `src/feature/home/component/HomeCard/HomeCard.jsx` 에서 `require("@/assets/images/${icon.id}.svg")` 패턴으로 사용

- [ ] `il-box-stars-open.svg` / `IllustrationBoxStarsOpen`
  - 프론트 직접 SVG 후보: 현재 명확한 대응 없음
  - 사용처:
    - [ ] 현재 import 사용처는 확인되지 않음

- [ ] `il-no-sales.svg` / `IllustrationNoSales`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/noSellIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js`
    - [ ] `src/feature/event/constant/guideModalOption.js`

- [ ] `il-no-ticket-transfer.svg` / `IllustrationNoTicketTransfer`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/noTransferIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js`
    - [ ] `src/feature/event/constant/guideModalOption.js`

- [ ] `il-not-found.svg` / `IllustrationNotFound`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/notFoundIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js`
    - [ ] `src/page/etc/NotFoundPage/NotFoundPage.jsx`

- [ ] `il-star-honor-board.svg` / `IllustrationStarHonorBoard`
  - 프론트 직접 SVG 후보: `src/assets/images/hallOfFame.svg`
  - 사용처:
    - [ ] `src/page/snorose/AboutPage/AboutPage.jsx`

- [ ] `il-task-complete.svg` / `IllustrationTaskComplete`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/taskCompleteIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js`
    - [ ] `src/page/account/SignUpSuccessPage/SignUpSuccessPage.jsx`
    - [ ] `src/feature/account/component/snoroseVerifyStep/CompleteStep/CompleteStep.jsx`

- [ ] `il-task-failed.svg` / `IllustrationTaskFailed`
  - 프론트 직접 SVG 후보: `src/assets/illustrations/taskFailedIllustration.svg`
  - 사용처:
    - [ ] `src/assets/illustrations/index.js`
    - [ ] `src/page/account/SignUpFailure/SignUpFailurePage.jsx`
    - [ ] `src/page/account/NotFoundIdPage/NotFoundIdPage.jsx`
    - [ ] `src/page/account/NotFoundPwPage/NotFoundPwPage.jsx`

- [ ] `il-folder-search.svg` / `IllustrationFolderSearch`
  - 프론트 직접 SVG 후보: 현재 명확한 대응 없음
  - 사용처:
    - [ ] 현재 import 사용처는 확인되지 않음

## 현재 snorose-front 사용 확인 안 됨

아래 항목은 `snorose-front/src`에서 직접 import, `@snorose/icons` import, 명확한 스프라이트 id 대응을 확인하지 못했습니다. 새 디자인에서 추가 사용될 수 있으니 교체 필요 여부를 별도로 결정하세요.

- [ ] `ic-basic-building.svg` / `IconBuilding`
- [ ] `ic-basic-chevron-left.svg` / `IconChevronLeft`
- [ ] `ic-basic-grip-horizontal.svg` / `IconGripHorizontal`
- [ ] `ic-basic-person-fill.svg` / `IconPersonFill`
- [ ] `ic-basic-refresh.svg` / `IconRefresh`
- [ ] `ic-basic-text-align.svg` / `IconTextAlign`
- [ ] `ic-multi-bell-off.svg` / `IconMultiBellOff`
- [ ] `ic-multi-image.svg` / `IconMultiImage`
- [ ] `il-calendar-empty.svg` / `IllustrationCalendarEmpty`
- [ ] `il-microphone.svg` / `IllustrationMicrophone`
- [ ] `il-clipboard-search.svg` / `IllustrationClipboardSearch`
- [ ] `il-snow-ground.svg` / `IllustrationSnowGround`
- [ ] `il-snow-ground-circle.svg` / `IllustrationSnowGroundCircle`
- [ ] `il-snow-mountain.svg` / `IllustrationSnowMountain`
- [ ] `il-snow-mountain-circle.svg` / `IllustrationSnowMountainCircle`
- [ ] `il-snowfall.svg` / `IllustrationSnowfall`
- [ ] `il-snowfall-circle.svg` / `IllustrationSnowfallCircle`
- [ ] `il-box-stars-circle.svg` / `IllustrationBoxStarsCircle`
- [ ] `il-books-cap.svg` / `IllustrationBooksCap`

## 추가로 교체 검토가 필요한 프론트 전용 아이콘 id

이 항목들은 현재 `snorose-icon` export와 이름상 직접 대응되는 파일을 찾지 못했지만, `snorose-front`의 `icon.svg`에서 실제 사용 중입니다. 레거시 스프라이트를 제거하려면 별도 신규 아이콘을 만들거나 기존 아이콘 중 대응할 항목을 정해야 합니다.

- [ ] `about-logo`: `src/page/snorose/AboutPage/AboutPage.jsx`
- [ ] `active-check-circle`, `inactive-check-circle`: `src/page/account/LoginPage/LoginPage.jsx`
- [ ] `bg-color`, `font-color`, `bold`, `underline`, `strikethrough`, `list-bullet`, `list-ordered`, `no-color`: `src/feature/editor/component/FixedMenuEditor/FixedMenuEditor.jsx`
- [ ] `calendar-next`, `calendar-prev`, `calendar-stroke`: `src/feature/attendance/component/Calendar/Calendar.jsx`, `src/page/event/EventPage/EventPage.jsx`
- [ ] `checkbox-blue`, `checkbox-grey`: `src/feature/account/component/signUpStep/UserInfoStep/UserInfoStep.jsx`, `src/shared/component/form/CheckBox/CheckBox.jsx`
- [ ] `check-circle-blue`, `check-circle-grey`: `src/page/board/EditPostPage/EditPostPage.jsx`, `src/page/board/WritePostPage/WritePostPage.jsx`
- [ ] `check-editor`: `src/shared/component/modal/LinkAlertModal/LinkAlertModal.jsx`
- [ ] `google-form`: `src/page/account/FindIdPage/FindIdPage.jsx`, `src/page/account/FindPwPage/FindPwPage.jsx`
- [ ] `host`: `src/page/event/EventPage/EventPage.jsx`
- [ ] `image-select-bar`: `src/shared/component/AttachmentList/AttachmentList.jsx`
- [ ] `info-circle`, `info-triangle`: `src/page/account/FindIdPage/FindIdPage.jsx`, `src/page/account/FindPwPage/FindPwPage.jsx`, `src/shared/component/Toast/Toast.jsx`
- [ ] `logo`: `src/page/maintenance/MaintenancePage/MaintenancePage.jsx`, `src/shared/component/layout/Footer/Footer.jsx`, `src/shared/component/layout/Header/Header.jsx`, `src/shared/component/layout/Sidebar/Sidebar.jsx`
- [ ] `meat-ball`: `src/feature/board/ui/PostDetailView.jsx`, `src/feature/comment/component/Comment/Comment.jsx`, `src/feature/comment/component/NestedComment/NestedComment.jsx`, `src/page/event/EventPage/EventPage.jsx`, `src/page/exam/ExamReviewPage/ExamReviewPage.jsx`
- [ ] `middle-dot`: `src/feature/my/component/MyInfo/MyInfo.jsx`, `src/page/user/DeleteAccountPage/DeleteAccountPage.jsx`
- [ ] `open-editor`, `open-editor-fill`: `src/feature/board/component/AttachmentBar/AttachmentBar.jsx`
- [ ] `report-user`, `abuse-comment`, `adult`, `horizontal-dot3`, `user-disgust`, `user-stranger`, `user-sunglasses`: `src/shared/constant/board.js`, `src/shared/constant/modalText.js`
- [ ] `save-image`: `src/feature/board/component/FullScreenAttachment/FullScreenAttachment.jsx`
- [ ] `search-thick`: `src/shared/component/layout/BackAppBar/BackAppBar.jsx`
- [ ] `setting`: `src/page/alert/AlertPage/AlertPage.jsx`
- [ ] `star`, `star-circle`: `src/feature/board/component/BoardBar/BoardBar.jsx`
- [ ] `trash`: `src/shared/constant/modalOptions.js`, `src/shared/constant/modalText.js`
- [ ] `trashcan`: `src/page/board/EditPostPage/EditPostPage.jsx`, `src/page/board/WritePostPage/WritePostPage.jsx`
