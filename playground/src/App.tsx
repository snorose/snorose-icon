import {
  IconArrowLeft,
  IconArrowCornerDownRight,
  IconBell,
  IconBellFill,
  IconBook,
  IconBookFill,
  IconBookmark,
  IconBookmarkFill,
  IconBuilding,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronUpRight,
  IconClapperboard,
  IconCommentFill,
  IconEye,
  IconEyeFill,
  IconFile,
  IconGripHorizontal,
  IconHamburgerMenu,
  IconHashtag,
  IconHeart,
  IconHeartFill,
  IconHomeFill,
  IconImage,
  IconImageFill,
  IconInstagramFill,
  IconLocation,
  IconMultiBadgeBlue,
  IconMultiBadgePink,
  IconMultiBellBlue,
  IconMultiBellOff,
  IconMultiBellPink,
  IconMultiCamera,
  IconMultiCheckPinkCircle,
  IconMultiClipboardBlue,
  IconMultiClipboardWhite,
  IconMultiCloudBlack,
  IconMultiCommentX,
  IconMultiDollarCircle,
  IconMultiFlag,
  IconMultiGestureHand,
  IconMultiHeartMinusCircle,
  IconMultiHeartPlusCircle,
  IconMultiImage,
  IconMultiMessageAlert,
  IconMultiPointCircle,
  IconMultiQuestionCircle,
  IconMultiSadFace,
  IconMultiShare,
  IconMultiShieldOff,
  IconMultiSkull,
  IconMultiUserQuestion,
  IconMultiVideo,
  IconMultiWarningCone,
  IconMypage,
  IconMypageFill,
  IconPencilFill,
  IconPencilUnderline,
  IconPerson,
  IconPersonFill,
  IconPointCircle,
  IconRefresh,
  IconSearch,
  IconTextAlign,
  IconTrashcanFill,
  IconVideo,
  IconX,
  IllustrationBellEmpty,
  IllustrationBooksCap,
  IllustrationBoxStarsCircle,
  IllustrationBoxStarsOpen,
  IllustrationCalendarEmpty,
  IllustrationClipboardSearch,
  IllustrationCommentEmpty,
  IllustrationEmailCheck,
  IllustrationFlag,
  IllustrationFolderSearch,
  IllustrationMegaphone,
  IllustrationMegaphoneBlue,
  IllustrationMicrophone,
  IllustrationNoSales,
  IllustrationNoTicketTransfer,
  IllustrationNotFound,
  IllustrationPadlock,
  IllustrationPostEmpty,
  IllustrationScrapPostEmpty,
  IllustrationSnowGround,
  IllustrationSnowGroundCircle,
  IllustrationSnowMountain,
  IllustrationSnowMountainCircle,
  IllustrationSnowfall,
  IllustrationSnowfallCircle,
  IllustrationStarHonorBoard,
  IllustrationTaskComplete,
  IllustrationTaskFailed,
} from '@snorose/icons';
import type { ComponentType, SVGProps } from 'react';

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconItem = {
  name: string;
  Component: SvgComponent;
};

const basicIcons = [
  { name: 'IconArrowCornerDownRight', Component: IconArrowCornerDownRight },
  { name: 'IconArrowLeft', Component: IconArrowLeft },
  { name: 'IconBell', Component: IconBell },
  { name: 'IconBellFill', Component: IconBellFill },
  { name: 'IconBook', Component: IconBook },
  { name: 'IconBookFill', Component: IconBookFill },
  { name: 'IconBookmark', Component: IconBookmark },
  { name: 'IconBookmarkFill', Component: IconBookmarkFill },
  { name: 'IconBuilding', Component: IconBuilding },
  { name: 'IconCheck', Component: IconCheck },
  { name: 'IconChevronDown', Component: IconChevronDown },
  { name: 'IconChevronLeft', Component: IconChevronLeft },
  { name: 'IconChevronRight', Component: IconChevronRight },
  { name: 'IconChevronUp', Component: IconChevronUp },
  { name: 'IconChevronUpRight', Component: IconChevronUpRight },
  { name: 'IconClapperboard', Component: IconClapperboard },
  { name: 'IconCommentFill', Component: IconCommentFill },
  { name: 'IconEye', Component: IconEye },
  { name: 'IconEyeFill', Component: IconEyeFill },
  { name: 'IconFile', Component: IconFile },
  { name: 'IconGripHorizontal', Component: IconGripHorizontal },
  { name: 'IconHamburgerMenu', Component: IconHamburgerMenu },
  { name: 'IconHashtag', Component: IconHashtag },
  { name: 'IconHeart', Component: IconHeart },
  { name: 'IconHeartFill', Component: IconHeartFill },
  { name: 'IconHomeFill', Component: IconHomeFill },
  { name: 'IconImage', Component: IconImage },
  { name: 'IconImageFill', Component: IconImageFill },
  { name: 'IconInstagramFill', Component: IconInstagramFill },
  { name: 'IconLocation', Component: IconLocation },
  { name: 'IconMypage', Component: IconMypage },
  { name: 'IconMypageFill', Component: IconMypageFill },
  { name: 'IconPencilFill', Component: IconPencilFill },
  { name: 'IconPencilUnderline', Component: IconPencilUnderline },
  { name: 'IconPerson', Component: IconPerson },
  { name: 'IconPersonFill', Component: IconPersonFill },
  { name: 'IconPointCircle', Component: IconPointCircle },
  { name: 'IconRefresh', Component: IconRefresh },
  { name: 'IconSearch', Component: IconSearch },
  { name: 'IconTextAlign', Component: IconTextAlign },
  { name: 'IconTrashcanFill', Component: IconTrashcanFill },
  { name: 'IconVideo', Component: IconVideo },
  { name: 'IconX', Component: IconX },
] satisfies IconItem[];

const multiIcons = [
  { name: 'IconMultiBadgeBlue', Component: IconMultiBadgeBlue },
  { name: 'IconMultiBadgePink', Component: IconMultiBadgePink },
  { name: 'IconMultiBellBlue', Component: IconMultiBellBlue },
  { name: 'IconMultiBellOff', Component: IconMultiBellOff },
  { name: 'IconMultiBellPink', Component: IconMultiBellPink },
  { name: 'IconMultiCamera', Component: IconMultiCamera },
  { name: 'IconMultiCheckPinkCircle', Component: IconMultiCheckPinkCircle },
  { name: 'IconMultiClipboardBlue', Component: IconMultiClipboardBlue },
  { name: 'IconMultiClipboardWhite', Component: IconMultiClipboardWhite },
  { name: 'IconMultiCloudBlack', Component: IconMultiCloudBlack },
  { name: 'IconMultiCommentX', Component: IconMultiCommentX },
  { name: 'IconMultiDollarCircle', Component: IconMultiDollarCircle },
  { name: 'IconMultiFlag', Component: IconMultiFlag },
  { name: 'IconMultiGestureHand', Component: IconMultiGestureHand },
  { name: 'IconMultiHeartMinusCircle', Component: IconMultiHeartMinusCircle },
  { name: 'IconMultiHeartPlusCircle', Component: IconMultiHeartPlusCircle },
  { name: 'IconMultiImage', Component: IconMultiImage },
  { name: 'IconMultiMessageAlert', Component: IconMultiMessageAlert },
  { name: 'IconMultiPointCircle', Component: IconMultiPointCircle },
  { name: 'IconMultiQuestionCircle', Component: IconMultiQuestionCircle },
  { name: 'IconMultiSadFace', Component: IconMultiSadFace },
  { name: 'IconMultiShare', Component: IconMultiShare },
  { name: 'IconMultiShieldOff', Component: IconMultiShieldOff },
  { name: 'IconMultiSkull', Component: IconMultiSkull },
  { name: 'IconMultiUserQuestion', Component: IconMultiUserQuestion },
  { name: 'IconMultiVideo', Component: IconMultiVideo },
  { name: 'IconMultiWarningCone', Component: IconMultiWarningCone },
] satisfies IconItem[];

const illustrations = [
  { name: 'IllustrationBellEmpty', Component: IllustrationBellEmpty },
  { name: 'IllustrationBooksCap', Component: IllustrationBooksCap },
  { name: 'IllustrationBoxStarsCircle', Component: IllustrationBoxStarsCircle },
  { name: 'IllustrationBoxStarsOpen', Component: IllustrationBoxStarsOpen },
  { name: 'IllustrationCalendarEmpty', Component: IllustrationCalendarEmpty },
  {
    name: 'IllustrationClipboardSearch',
    Component: IllustrationClipboardSearch,
  },
  { name: 'IllustrationCommentEmpty', Component: IllustrationCommentEmpty },
  { name: 'IllustrationEmailCheck', Component: IllustrationEmailCheck },
  { name: 'IllustrationFlag', Component: IllustrationFlag },
  { name: 'IllustrationFolderSearch', Component: IllustrationFolderSearch },
  { name: 'IllustrationMegaphone', Component: IllustrationMegaphone },
  { name: 'IllustrationMegaphoneBlue', Component: IllustrationMegaphoneBlue },
  { name: 'IllustrationMicrophone', Component: IllustrationMicrophone },
  { name: 'IllustrationNoSales', Component: IllustrationNoSales },
  {
    name: 'IllustrationNoTicketTransfer',
    Component: IllustrationNoTicketTransfer,
  },
  { name: 'IllustrationNotFound', Component: IllustrationNotFound },
  { name: 'IllustrationPadlock', Component: IllustrationPadlock },
  { name: 'IllustrationPostEmpty', Component: IllustrationPostEmpty },
  { name: 'IllustrationScrapPostEmpty', Component: IllustrationScrapPostEmpty },
  { name: 'IllustrationSnowGround', Component: IllustrationSnowGround },
  {
    name: 'IllustrationSnowGroundCircle',
    Component: IllustrationSnowGroundCircle,
  },
  { name: 'IllustrationSnowMountain', Component: IllustrationSnowMountain },
  {
    name: 'IllustrationSnowMountainCircle',
    Component: IllustrationSnowMountainCircle,
  },
  { name: 'IllustrationSnowfall', Component: IllustrationSnowfall },
  { name: 'IllustrationSnowfallCircle', Component: IllustrationSnowfallCircle },
  { name: 'IllustrationStarHonorBoard', Component: IllustrationStarHonorBoard },
  { name: 'IllustrationTaskComplete', Component: IllustrationTaskComplete },
  { name: 'IllustrationTaskFailed', Component: IllustrationTaskFailed },
] satisfies IconItem[];

export function App() {
  return (
    <main>
      <section>
        <h1>Basic Icon</h1>
        <div>
          {basicIcons.map(({ name, Component }) => (
            <Component key={name} aria-label={name} width={24} height={24} />
          ))}
        </div>
      </section>

      <section>
        <h1>Multi Icon</h1>
        <div>
          {multiIcons.map(({ name, Component }) => (
            <Component key={name} aria-label={name} width={24} height={24} />
          ))}
        </div>
      </section>

      <section>
        <h1>Illustration</h1>
        <div>
          {illustrations.map(({ name, Component }) => (
            <Component key={name} aria-label={name} width={80} height={80} />
          ))}
        </div>
      </section>
    </main>
  );
}
