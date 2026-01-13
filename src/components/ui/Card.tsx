'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'feature';
    className?: string;
    padding?: 'sm' | 'md' | 'lg' | 'none';
    onClick?: () => void;
    hoverable?: boolean;
    style?: React.CSSProperties;
}

export function Card({
    children,
    variant = 'default',
    className = '',
    padding = 'md',
    onClick,
    hoverable = false,
    style,
}: CardProps) {
    const variantClasses: Record<string, string> = {
        default: 'card',
        elevated: 'card card-elevated',
        glass: 'card card-glass',
        gradient: 'card card-gradient',
        feature: 'card card-feature',
    };

    const paddingStyles: Record<string, string> = {
        none: '0',
        sm: 'var(--space-4)',
        md: 'var(--space-6)',
        lg: 'var(--space-8)',
    };

    const classes = [
        variantClasses[variant],
        hoverable ? 'card-elevated' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classes}
            style={{
                padding: paddingStyles[padding],
                cursor: onClick ? 'pointer' : undefined,
                ...style,
            }}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}

// Card Header
interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export function CardHeader({ children, className = '', action }: CardHeaderProps) {
    return (
        <div
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-4)',
            }}
        >
            <div>{children}</div>
            {action && <div>{action}</div>}
        </div>
    );
}

// Card Title
interface CardTitleProps {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
}

export function CardTitle({ children, as: Component = 'h3', className = '' }: CardTitleProps) {
    return (
        <Component
            className={className}
            style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--foreground)',
                margin: 0,
            }}
        >
            {children}
        </Component>
    );
}

// Card Description
interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return (
        <p
            className={className}
            style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted)',
                margin: 0,
                marginTop: 'var(--space-1)',
            }}
        >
            {children}
        </p>
    );
}

// Card Content
interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={className}>{children}</div>;
}

// Card Footer
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'between';
}

export function CardFooter({ children, className = '', align = 'right' }: CardFooterProps) {
    const alignStyles: Record<string, string> = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
        between: 'space-between',
    };

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: alignStyles[align],
                gap: 'var(--space-3)',
                marginTop: 'var(--space-6)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--card-border)',
            }}
        >
            {children}
        </div>
    );
}

// Feature Card with Icon
interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className = '' }: FeatureCardProps) {
    return (
        <Card variant="feature" className={className} hoverable>
            <div className="feature-icon">
                <Icon size={28} />
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </Card>
    );
}

// Stat Card
interface StatCardProps {
    value: string | number;
    label: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function StatCard({ value, label, icon: Icon, trend, className = '' }: StatCardProps) {
    return (
        <Card className={className}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <p className="stat-value">{value}</p>
                    <p className="stat-label">{label}</p>
                    {trend && (
                        <p style={{
                            fontSize: 'var(--text-sm)',
                            marginTop: 'var(--space-2)',
                            color: trend.isPositive ? 'var(--success-500)' : 'var(--error-500)',
                        }}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </p>
                    )}
                </div>
                {Icon && (
                    <div style={{
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--primary-50)',
                        color: 'var(--primary-500)',
                    }}>
                        <Icon size={24} />
                    </div>
                )}
            </div>
        </Card>
    );
}
