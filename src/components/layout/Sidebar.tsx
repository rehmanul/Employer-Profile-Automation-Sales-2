'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    CreditCard,
    BarChart3,
    Bell,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    LogOut,
    HelpCircle,
} from 'lucide-react';

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Leads', href: '/admin/leads', icon: Users },
        { name: 'Anzeigen', href: '/admin/jobs', icon: FileText },
        { name: 'Zahlungen', href: '/admin/payments', icon: CreditCard },
        { name: 'Statistiken', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Benachrichtigungen', href: '/admin/notifications', icon: Bell },
    ];

    const bottomNavigation = [
        { name: 'Einstellungen', href: '/admin/settings', icon: Settings },
        { name: 'Hilfe', href: '/admin/help', icon: HelpCircle },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <aside style={{
            width: isCollapsed ? '72px' : '260px',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            background: 'var(--gray-900)',
            borderRight: '1px solid var(--gray-800)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width var(--transition-base)',
            zIndex: 'var(--z-sticky)',
        }}>
            {/* Logo */}
            <div style={{
                padding: 'var(--space-4)',
                borderBottom: '1px solid var(--gray-800)',
            }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'linear-gradient(135deg, var(--primary-500), var(--accent-400))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0,
                        }}>
                            <Briefcase size={22} />
                        </div>
                        {!isCollapsed && (
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: 'var(--text-lg)',
                                color: 'white',
                            }}>
                                ProfilPro
                            </span>
                        )}
                    </div>
                </Link>
            </div>

            {/* Main Navigation */}
            <nav style={{
                flex: 1,
                padding: 'var(--space-4)',
                overflowY: 'auto',
            }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {navigation.map(item => (
                        <li key={item.name} style={{ marginBottom: 'var(--space-1)' }}>
                            <Link
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: isCollapsed ? 'var(--space-3)' : 'var(--space-3) var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    textDecoration: 'none',
                                    color: isActive(item.href) ? 'white' : 'var(--gray-400)',
                                    background: isActive(item.href)
                                        ? 'linear-gradient(135deg, var(--primary-600), var(--primary-700))'
                                        : 'transparent',
                                    transition: 'all var(--transition-fast)',
                                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                                }}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <item.icon size={20} style={{ flexShrink: 0 }} />
                                {!isCollapsed && (
                                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <div style={{
                padding: 'var(--space-4)',
                borderTop: '1px solid var(--gray-800)',
            }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {bottomNavigation.map(item => (
                        <li key={item.name} style={{ marginBottom: 'var(--space-1)' }}>
                            <Link
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: isCollapsed ? 'var(--space-3)' : 'var(--space-3) var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    textDecoration: 'none',
                                    color: 'var(--gray-400)',
                                    transition: 'all var(--transition-fast)',
                                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                                }}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <item.icon size={20} style={{ flexShrink: 0 }} />
                                {!isCollapsed && (
                                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}

                    {/* Logout */}
                    <li>
                        <button
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-3)',
                                padding: isCollapsed ? 'var(--space-3)' : 'var(--space-3) var(--space-4)',
                                borderRadius: 'var(--radius-lg)',
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--gray-400)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                justifyContent: isCollapsed ? 'center' : 'flex-start',
                            }}
                            title={isCollapsed ? 'Abmelden' : undefined}
                        >
                            <LogOut size={20} style={{ flexShrink: 0 }} />
                            {!isCollapsed && <span>Abmelden</span>}
                        </button>
                    </li>
                </ul>
            </div>

            {/* Collapse Toggle */}
            {onToggle && (
                <button
                    onClick={onToggle}
                    style={{
                        position: 'absolute',
                        right: '-12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '1px solid var(--gray-700)',
                        background: 'var(--gray-800)',
                        color: 'var(--gray-400)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                    }}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            )}
        </aside>
    );
}
