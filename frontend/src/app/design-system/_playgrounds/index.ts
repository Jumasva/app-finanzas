import type { ComponentType } from 'react';
import { AmountPlayground } from './AmountPlayground';
import { AvatarPlayground } from './AvatarPlayground';
import { BadgePlayground } from './BadgePlayground';
import { ButtonPlayground } from './ButtonPlayground';
import { CategoryIconPlayground } from './CategoryIconPlayground';
import { CheckboxPlayground } from './CheckboxPlayground';
import { ChipPlayground } from './ChipPlayground';
import { DividerPlayground } from './DividerPlayground';
import { HelperTextPlayground } from './HelperTextPlayground';
import { IconsPlayground } from './IconsPlayground';
import { InputPlayground } from './InputPlayground';
import { LabelPlayground } from './LabelPlayground';
import { ProgressBarPlayground } from './ProgressBarPlayground';
import { RadioPlayground } from './RadioPlayground';
import { SkeletonPlayground } from './SkeletonPlayground';
import { SpinnerPlayground } from './SpinnerPlayground';
import { SwitchPlayground } from './SwitchPlayground';
import { TextLinkPlayground } from './TextLinkPlayground';
import { TooltipPlayground } from './TooltipPlayground';

// slug de la URL → playground del átomo (los slugs están en _data/atoms.ts)
export const playgrounds: Record<string, ComponentType> = {
  button: ButtonPlayground,
  'text-link': TextLinkPlayground,
  input: InputPlayground,
  label: LabelPlayground,
  'helper-text': HelperTextPlayground,
  checkbox: CheckboxPlayground,
  radio: RadioPlayground,
  switch: SwitchPlayground,
  badge: BadgePlayground,
  chip: ChipPlayground,
  avatar: AvatarPlayground,
  'category-icon': CategoryIconPlayground,
  amount: AmountPlayground,
  divider: DividerPlayground,
  tooltip: TooltipPlayground,
  'progress-bar': ProgressBarPlayground,
  spinner: SpinnerPlayground,
  skeleton: SkeletonPlayground,
  icons: IconsPlayground,
};
