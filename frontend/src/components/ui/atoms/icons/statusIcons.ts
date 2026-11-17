import { AlertIcon } from './AlertIcon';
import type { IconComponent } from './Icon';
import { InfoIcon } from './InfoIcon';
import { OkIcon } from './OkIcon';

export type Status = 'info' | 'success' | 'warning' | 'danger';

// El ícono de cada estado (Figma color/semantic): lo comparten Alert, Helper text y Toast
export const statusIcons: Record<Status, IconComponent> = {
  info: InfoIcon,
  success: OkIcon,
  warning: AlertIcon,
  danger: AlertIcon,
};
