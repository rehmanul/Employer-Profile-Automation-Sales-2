'use client';

import React, { forwardRef } from 'react';
import { LucideIcon, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    inputSize?: 'sm' | 'md' | 'lg';
    isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    hint,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    inputSize = 'md',
    isRequired = false,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses: Record<string, string> = {
        sm: '',
        md: '',
        lg: 'form-input-lg',
    };

    const inputClasses = [
        'form-input',
        sizeClasses[inputSize],
        error ? 'form-input-error' : '',
        LeftIcon ? 'pl-12' : '',
        RightIcon ? 'pr-12' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className="form-group">
            {label && (
                <label
                    htmlFor={inputId}
                    className={`form-label ${isRequired ? 'form-label-required' : ''}`}
                >
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                {LeftIcon && (
                    <div style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--muted)',
                        pointerEvents: 'none',
                    }}>
                        <LeftIcon size={18} />
                    </div>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={inputClasses}
                    style={LeftIcon ? { paddingLeft: '3rem' } : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    {...props}
                />
                {RightIcon && !error && (
                    <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--muted)',
                        pointerEvents: 'none',
                    }}>
                        <RightIcon size={18} />
                    </div>
                )}
                {error && (
                    <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--error-500)',
                    }}>
                        <AlertCircle size={18} />
                    </div>
                )}
            </div>
            {error && (
                <p id={`${inputId}-error`} className="form-error" role="alert">
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={`${inputId}-hint`} className="form-help">
                    {hint}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

// Textarea component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    isRequired?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    label,
    error,
    hint,
    isRequired = false,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const textareaClasses = [
        'form-input',
        error ? 'form-input-error' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className="form-group">
            {label && (
                <label
                    htmlFor={inputId}
                    className={`form-label ${isRequired ? 'form-label-required' : ''}`}
                >
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                id={inputId}
                className={textareaClasses}
                style={{ minHeight: '120px', resize: 'vertical' }}
                aria-invalid={error ? 'true' : 'false'}
                {...props}
            />
            {error && (
                <p className="form-error" role="alert">{error}</p>
            )}
            {hint && !error && (
                <p className="form-help">{hint}</p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

// Select component
interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    isRequired?: boolean;
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    hint,
    options,
    isRequired = false,
    placeholder,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const selectClasses = [
        'form-input',
        error ? 'form-input-error' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className="form-group">
            {label && (
                <label
                    htmlFor={inputId}
                    className={`form-label ${isRequired ? 'form-label-required' : ''}`}
                >
                    {label}
                </label>
            )}
            <select
                ref={ref}
                id={inputId}
                className={selectClasses}
                aria-invalid={error ? 'true' : 'false'}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="form-error" role="alert">{error}</p>
            )}
            {hint && !error && (
                <p className="form-help">{hint}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';
