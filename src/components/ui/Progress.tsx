'use client';

import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ProgressBarProps {
    value: number;
    max?: number;
    animated?: boolean;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ProgressBar({
    value,
    max = 100,
    animated = false,
    showLabel = false,
    size = 'md',
    className = '',
}: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100);

    const sizeHeights: Record<string, string> = {
        sm: '4px',
        md: '8px',
        lg: '12px',
    };

    return (
        <div className={className}>
            {showLabel && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                }}>
                    <span style={{ color: 'var(--muted)' }}>Fortschritt</span>
                    <span style={{ fontWeight: 600 }}>{Math.round(percentage)}%</span>
                </div>
            )}
            <div
                className={`progress-bar ${animated ? 'progress-animated' : ''}`}
                style={{ height: sizeHeights[size] }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

// Step indicator for multi-step processes
interface Step {
    id: string;
    label: string;
    description?: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export function StepIndicator({
    steps,
    currentStep,
    className = '',
    orientation = 'horizontal',
}: StepIndicatorProps) {
    const isVertical = orientation === 'vertical';

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                alignItems: isVertical ? 'flex-start' : 'center',
                gap: isVertical ? 'var(--space-1)' : 'var(--space-2)',
            }}
        >
            {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                const isPending = index > currentStep;

                return (
                    <React.Fragment key={step.id}>
                        <div
                            className={`step ${isComplete ? 'step-complete' : isActive ? 'step-active' : 'step-pending'}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-3)',
                                flexDirection: isVertical ? 'row' : 'column',
                            }}
                        >
                            <div className="step-circle">
                                {isComplete ? (
                                    <Check size={18} />
                                ) : isActive ? (
                                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div style={{
                                textAlign: isVertical ? 'left' : 'center',
                                minWidth: isVertical ? 'auto' : '80px',
                            }}>
                                <p style={{
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? 'var(--foreground)' : isPending ? 'var(--muted)' : 'var(--foreground)',
                                    margin: 0,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {step.label}
                                </p>
                                {step.description && isVertical && (
                                    <p style={{
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--muted)',
                                        margin: 0,
                                        marginTop: 'var(--space-1)',
                                    }}>
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`step-connector ${isComplete ? 'step-connector-active' : ''}`}
                                style={{
                                    flex: isVertical ? 'none' : 1,
                                    width: isVertical ? '2px' : 'auto',
                                    height: isVertical ? '24px' : '2px',
                                    marginLeft: isVertical ? '19px' : 0,
                                    minWidth: isVertical ? '2px' : '40px',
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// Processing Status Component with animation
interface ProcessingStatusProps {
    status: 'pending' | 'processing' | 'scraping' | 'analyzing' | 'generating' | 'complete' | 'failed';
    message: string;
    progress: number;
}

export function ProcessingStatus({ status, message, progress }: ProcessingStatusProps) {
    const steps = [
        { id: 'start', label: 'Start' },
        { id: 'scraping', label: 'Analyse' },
        { id: 'analyzing', label: 'Extraktion' },
        { id: 'generating', label: 'Erstellung' },
        { id: 'complete', label: 'Fertig' },
    ];

    const statusToStep: Record<string, number> = {
        pending: 0,
        processing: 0,
        scraping: 1,
        analyzing: 2,
        generating: 3,
        complete: 4,
        failed: -1,
    };

    const currentStep = statusToStep[status] ?? 0;

    const statusColors: Record<string, string> = {
        pending: 'var(--gray-500)',
        processing: 'var(--primary-500)',
        scraping: 'var(--primary-500)',
        analyzing: 'var(--primary-500)',
        generating: 'var(--primary-500)',
        complete: 'var(--success-500)',
        failed: 'var(--error-500)',
    };

    return (
        <div style={{ padding: 'var(--space-8)' }}>
            {status !== 'failed' && (
                <>
                    <StepIndicator
                        steps={steps}
                        currentStep={currentStep}
                    />
                    <div style={{ marginTop: 'var(--space-8)' }}>
                        <ProgressBar value={progress} animated showLabel />
                    </div>
                </>
            )}

            <div style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: status === 'failed' ? 'var(--error-50)' : 'var(--primary-50)',
                border: `1px solid ${status === 'failed' ? 'var(--error-200)' : 'var(--primary-200)'}`,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: statusColors[status],
                        animation: status !== 'complete' && status !== 'failed' ? 'pulse 2s infinite' : 'none',
                    }} />
                    <p style={{
                        margin: 0,
                        fontWeight: 500,
                        color: status === 'failed' ? 'var(--error-700)' : 'var(--primary-700)',
                    }}>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}
