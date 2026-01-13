'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (toast: Omit<Toast, 'id'>) => void;
    dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };

        setToasts(prev => [...prev, newToast]);

        // Auto-dismiss after duration
        const duration = toast.duration ?? 5000;
        if (duration > 0) {
            setTimeout(() => {
                dismissToast(id);
            }, duration);
        }
    }, []);

    const dismissToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

// Toast Container
interface ToastContainerProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

// Individual Toast
interface ToastItemProps {
    toast: Toast;
    onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
    const icons: Record<ToastType, React.ReactNode> = {
        success: <CheckCircle size={20} style={{ color: 'var(--success-500)' }} />,
        error: <AlertCircle size={20} style={{ color: 'var(--error-500)' }} />,
        warning: <AlertTriangle size={20} style={{ color: 'var(--warning-500)' }} />,
        info: <Info size={20} style={{ color: 'var(--primary-500)' }} />,
    };

    const borderColors: Record<ToastType, string> = {
        success: 'var(--success-500)',
        error: 'var(--error-500)',
        warning: 'var(--warning-500)',
        info: 'var(--primary-500)',
    };

    return (
        <div
            className="toast"
            style={{ borderLeftColor: borderColors[toast.type] }}
            role="alert"
        >
            {icons[toast.type]}
            <div style={{ flex: 1 }}>
                <p style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                }}>
                    {toast.title}
                </p>
                {toast.message && (
                    <p style={{
                        margin: 0,
                        marginTop: 'var(--space-1)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted)',
                    }}>
                        {toast.message}
                    </p>
                )}
            </div>
            <button
                onClick={() => onDismiss(toast.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 'var(--space-1)',
                    cursor: 'pointer',
                    color: 'var(--muted)',
                    borderRadius: 'var(--radius-sm)',
                }}
                aria-label="Dismiss"
            >
                <X size={16} />
            </button>
        </div>
    );
}

// Convenience hook for common toast types
export function useToastHelpers() {
    const { showToast } = useToast();

    return {
        success: (title: string, message?: string) =>
            showToast({ type: 'success', title, message }),
        error: (title: string, message?: string) =>
            showToast({ type: 'error', title, message, duration: 8000 }),
        warning: (title: string, message?: string) =>
            showToast({ type: 'warning', title, message }),
        info: (title: string, message?: string) =>
            showToast({ type: 'info', title, message }),
    };
}
