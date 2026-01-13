'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    footer?: React.ReactNode;
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    footer,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Size mappings
    const sizeWidths: Record<string, string> = {
        sm: '400px',
        md: '500px',
        lg: '700px',
        xl: '900px',
        full: '95vw',
    };

    // Handle escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Focus management
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement;
            modalRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            previousActiveElement.current?.focus();
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="overlay"
            onClick={closeOnOverlayClick ? onClose : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
        >
            <div
                ref={modalRef}
                className="modal"
                style={{ maxWidth: sizeWidths[size] }}
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
            >
                {(title || showCloseButton) && (
                    <div className="modal-header">
                        <div>
                            {title && (
                                <h2
                                    id="modal-title"
                                    style={{
                                        fontSize: 'var(--text-xl)',
                                        fontWeight: 600,
                                        margin: 0,
                                    }}
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p
                                    id="modal-description"
                                    style={{
                                        fontSize: 'var(--text-sm)',
                                        color: 'var(--muted)',
                                        margin: 0,
                                        marginTop: 'var(--space-1)',
                                    }}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 'var(--space-2)',
                                    cursor: 'pointer',
                                    color: 'var(--muted)',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'all var(--transition-fast)',
                                }}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                <div className="modal-body">
                    {children}
                </div>

                {footer && (
                    <div className="modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

// Confirmation Modal
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    isLoading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Bestätigen',
    cancelText = 'Abbrechen',
    variant = 'primary',
    isLoading = false,
}: ConfirmModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </Button>
                </>
            }
        >
            <p style={{ color: 'var(--muted)', margin: 0 }}>{message}</p>
        </Modal>
    );
}
