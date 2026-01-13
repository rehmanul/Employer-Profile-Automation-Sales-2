'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu,
    X,
    Briefcase,
    Settings,
    LogOut,
    ChevronDown,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
    isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: 'Startseite', href: '/' },
        { name: 'Profil erstellen', href: '/create' },
        { name: 'Preise', href: '/#pricing' },
        { name: 'Kontakt', href: '/#contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 'var(--z-sticky)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--card-border)',
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '72px',
                }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--primary-600), var(--accent-500))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                            }}>
                                <Briefcase size={22} />
                            </div>
                            <div>
                                <span style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: 'var(--text-xl)',
                                    color: 'var(--foreground)',
                                }}>
                                    ProfilPro
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hide-mobile" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-8)',
                    }}>
                        {navigation.map(item => (
                            <Link
                                key={item.name}
                                href={item.href}
                                style={{
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 500,
                                    color: isActive(item.href) ? 'var(--primary-600)' : 'var(--muted)',
                                    textDecoration: 'none',
                                    transition: 'color var(--transition-fast)',
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        {isAdmin ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <Link href="/admin" style={{ textDecoration: 'none' }}>
                                    <Button variant="ghost" leftIcon={Settings}>
                                        Admin
                                    </Button>
                                </Link>
                                <Button variant="ghost" leftIcon={LogOut}>
                                    Abmelden
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link href="/admin" style={{ textDecoration: 'none' }}>
                                    <Button variant="ghost">
                                        Admin Login
                                    </Button>
                                </Link>
                                <Link href="/create" style={{ textDecoration: 'none' }}>
                                    <Button variant="gradient">
                                        Jetzt starten
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="hide-desktop"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 'var(--space-2)',
                            cursor: 'pointer',
                            color: 'var(--foreground)',
                        }}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        className="hide-desktop"
                        style={{
                            paddingBlock: 'var(--space-4)',
                            borderTop: '1px solid var(--card-border)',
                        }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                            {navigation.map(item => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        padding: 'var(--space-3) var(--space-4)',
                                        fontSize: 'var(--text-base)',
                                        fontWeight: isActive(item.href) ? 600 : 400,
                                        color: isActive(item.href) ? 'var(--primary-600)' : 'var(--foreground)',
                                        textDecoration: 'none',
                                        borderRadius: 'var(--radius-lg)',
                                        background: isActive(item.href) ? 'var(--primary-50)' : 'transparent',
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div style={{
                                marginTop: 'var(--space-4)',
                                paddingTop: 'var(--space-4)',
                                borderTop: '1px solid var(--card-border)',
                            }}>
                                <Link href="/create" style={{ textDecoration: 'none', display: 'block' }}>
                                    <Button variant="gradient" fullWidth>
                                        Jetzt starten
                                    </Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
