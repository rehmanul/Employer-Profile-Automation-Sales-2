'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
    isLoading?: boolean;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseClass = 'btn';

    const variantClasses: Record<string, string> = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost',
        gradient: 'btn-gradient',
        danger: 'btn-primary',
    };

    const sizeClasses: Record<string, string> = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
        xl: 'btn-xl',
        icon: 'btn-icon',
    };

    const classes = [
        baseClass,
        variantClasses[variant],
        sizeClasses[size],
        isLoading ? 'btn-loading' : '',
        fullWidth ? 'w-full' : '',
        className,
    ].filter(Boolean).join(' ');

    const iconSize = size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 20 : 16;

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            style={fullWidth ? { width: '100%' } : undefined}
            {...props}
        >
            {!isLoading && LeftIcon && <LeftIcon size={iconSize} />}
            {!isLoading && children}
            {!isLoading && RightIcon && <RightIcon size={iconSize} />}
        </button>
    );
}

// Link-styled button for navigation
interface LinkButtonProps extends ButtonProps {
    href?: string;
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
    if (href) {
        return (
            <a href={href} style={{ textDecoration: 'none' }}>
                <Button {...props}>{children}</Button>
            </a>
        );
    }
    return <Button {...props}>{children}</Button>;
}
