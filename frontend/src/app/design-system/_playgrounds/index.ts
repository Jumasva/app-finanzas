import type { ComponentType } from 'react';
import { AlertPlayground } from './AlertPlayground';
import { AmountEntryPlayground } from './AmountEntryPlayground';
import { AmountPlayground } from './AmountPlayground';
import { AvatarPlayground } from './AvatarPlayground';
import { BadgePlayground } from './BadgePlayground';
import { BreadcrumbsPlayground } from './BreadcrumbsPlayground';
import { ButtonPlayground } from './ButtonPlayground';
import { CategoryIconPlayground } from './CategoryIconPlayground';
import { CheckboxPlayground } from './CheckboxPlayground';
import { ChipPlayground } from './ChipPlayground';
import { ConfirmDialogPlayground } from './ConfirmDialogPlayground';
import { DateFieldPlayground } from './DateFieldPlayground';
import { DatePickerPlayground } from './DatePickerPlayground';
import { DetailListPlayground } from './DetailListPlayground';
import { DialogPlayground } from './DialogPlayground';
import { DividerPlayground } from './DividerPlayground';
import { DropdownMenuPlayground } from './DropdownMenuPlayground';
import { EmptyStatePlayground } from './EmptyStatePlayground';
import { ErrorStatePlayground } from './ErrorStatePlayground';
import { FormFieldPlayground } from './FormFieldPlayground';
import { HelperTextPlayground } from './HelperTextPlayground';
import { IconsPlayground } from './IconsPlayground';
import { InputPlayground } from './InputPlayground';
import { LabelPlayground } from './LabelPlayground';
import { LegendItemPlayground } from './LegendItemPlayground';
import { NotificationButtonPlayground } from './NotificationButtonPlayground';
import { OptionCardPlayground } from './OptionCardPlayground';
import { PageHeaderPlayground } from './PageHeaderPlayground';
import { PaginationPlayground } from './PaginationPlayground';
import { PeriodSelectorPlayground } from './PeriodSelectorPlayground';
import { ProgressBarPlayground } from './ProgressBarPlayground';
import { RadioPlayground } from './RadioPlayground';
import { SearchBarPlayground } from './SearchBarPlayground';
import { SectionHeaderPlayground } from './SectionHeaderPlayground';
import { SegmentedControlPlayground } from './SegmentedControlPlayground';
import { SelectPlayground } from './SelectPlayground';
import { SettingRowPlayground } from './SettingRowPlayground';
import { SettingsGroupPlayground } from './SettingsGroupPlayground';
import { SkeletonPlayground } from './SkeletonPlayground';
import { SpinnerPlayground } from './SpinnerPlayground';
import { StatCardPlayground } from './StatCardPlayground';
import { SwitchPlayground } from './SwitchPlayground';
import { TabsPlayground } from './TabsPlayground';
import { TextLinkPlayground } from './TextLinkPlayground';
import { ToastPlayground } from './ToastPlayground';
import { TooltipPlayground } from './TooltipPlayground';

// slug de la URL → playground del componente (los slugs están en _data/catalog.ts)
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
  alert: AlertPlayground,
  'form-field': FormFieldPlayground,
  'search-bar': SearchBarPlayground,
  'segmented-control': SegmentedControlPlayground,
  tabs: TabsPlayground,
  'period-selector': PeriodSelectorPlayground,
  select: SelectPlayground,
  'dropdown-menu': DropdownMenuPlayground,
  'date-field': DateFieldPlayground,
  'amount-entry': AmountEntryPlayground,
  'option-card': OptionCardPlayground,
  'setting-row': SettingRowPlayground,
  'section-header': SectionHeaderPlayground,
  'stat-card': StatCardPlayground,
  pagination: PaginationPlayground,
  breadcrumbs: BreadcrumbsPlayground,
  'detail-list': DetailListPlayground,
  'legend-item': LegendItemPlayground,
  'empty-state': EmptyStatePlayground,
  toast: ToastPlayground,
  'notification-button': NotificationButtonPlayground,
  dialog: DialogPlayground,
  'confirm-dialog': ConfirmDialogPlayground,
  'date-picker': DatePickerPlayground,
  'page-header': PageHeaderPlayground,
  'error-state': ErrorStatePlayground,
  'settings-group': SettingsGroupPlayground,
};
