import { AlertIcon, InfoIcon, OkIcon, type IconComponent } from '@/components/ui/atoms/icons';
import { cn } from '@/lib/cn';

type Variant = 'info' | 'error' | 'success';

type HelperTextProps = React.ComponentProps<'p'> & {
    variant?: Variant;
};

const variants: Record<Variant, string> = {
    info: 'text-content-secondary',
    error: 'text-danger',
    success: 'text-success',
};

const icons: Record<Variant, IconComponent> = {
    info: InfoIcon,
    error: AlertIcon,
    success: OkIcon,
};


export function HelperText({ variant = 'info', className, children, ...props }: HelperTextProps) {
    
    const Icon = icons[variant];

    return (
        <p
            
            aria-live={variant === 'error' ? 'polite' : undefined}
            className={cn('flex items-start gap-1.5 text-body-sm', variants[variant], className)}
            {...props}
        >
        
            <Icon className="mt-px size-3.5" />
            {children}
        </p>
    );
}