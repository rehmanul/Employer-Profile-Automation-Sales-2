'use client';

import React from 'react';
import Link from 'next/link';
import {
    Briefcase,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Linkedin,
    Instagram,
} from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Funktionen', href: '/#features' },
            { name: 'Preise', href: '/#pricing' },
            { name: 'FAQ', href: '/#faq' },
            { name: 'Beispiele', href: '/#examples' },
        ],
        company: [
            { name: 'Über uns', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Karriere', href: '/careers' },
            { name: 'Partner', href: '/partners' },
        ],
        legal: [
            { name: 'Impressum', href: '/impressum' },
            { name: 'Datenschutz', href: '/datenschutz' },
            { name: 'AGB', href: '/agb' },
        ],
    };

    return (
        <footer style={{
            background: 'var(--gray-900)',
            color: 'white',
            paddingTop: 'var(--space-16)',
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-8)',
                    paddingBottom: 'var(--space-12)',
                }}>
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--primary-500), var(--accent-400))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Briefcase size={22} />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: 'var(--text-xl)',
                            }}>
                                ProfilPro
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--gray-400)',
                            fontSize: 'var(--text-sm)',
                            lineHeight: 'var(--leading-relaxed)',
                            marginBottom: 'var(--space-6)',
                        }}>
                            Automatisierte Unternehmensprofile und Stellenanzeigen
                            für professionelles Recruiting.
                        </p>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Linkedin, href: '#' },
                                { icon: Instagram, href: '#' },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--gray-800)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--gray-400)',
                                        transition: 'all var(--transition-fast)',
                                    }}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--space-4)',
                            color: 'var(--gray-300)',
                        }}>
                            Produkt
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.product.map(link => (
                                <li key={link.name} style={{ marginBottom: 'var(--space-2)' }}>
                                    <Link
                                        href={link.href}
                                        style={{
                                            color: 'var(--gray-400)',
                                            fontSize: 'var(--text-sm)',
                                            textDecoration: 'none',
                                            transition: 'color var(--transition-fast)',
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--space-4)',
                            color: 'var(--gray-300)',
                        }}>
                            Unternehmen
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.company.map(link => (
                                <li key={link.name} style={{ marginBottom: 'var(--space-2)' }}>
                                    <Link
                                        href={link.href}
                                        style={{
                                            color: 'var(--gray-400)',
                                            fontSize: 'var(--text-sm)',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--space-4)',
                            color: 'var(--gray-300)',
                        }}>
                            Kontakt
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                marginBottom: 'var(--space-3)',
                                color: 'var(--gray-400)',
                                fontSize: 'var(--text-sm)',
                            }}>
                                <Mail size={16} />
                                <span>info@profilpro.de</span>
                            </li>
                            <li style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                marginBottom: 'var(--space-3)',
                                color: 'var(--gray-400)',
                                fontSize: 'var(--text-sm)',
                            }}>
                                <Phone size={16} />
                                <span>+49 (0) 8022 509 2122</span>
                            </li>
                            <li style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'var(--space-2)',
                                color: 'var(--gray-400)',
                                fontSize: 'var(--text-sm)',
                            }}>
                                <MapPin size={16} style={{ marginTop: '2px' }} />
                                <span>Gmund am Tegernsee<br />Bayern, Deutschland</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid var(--gray-800)',
                    paddingBlock: 'var(--space-6)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                }}>
                    <p style={{
                        color: 'var(--gray-500)',
                        fontSize: 'var(--text-sm)',
                        margin: 0,
                    }}>
                        © {currentYear} ProfilPro. Alle Rechte vorbehalten.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                        {footerLinks.legal.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                style={{
                                    color: 'var(--gray-500)',
                                    fontSize: 'var(--text-sm)',
                                    textDecoration: 'none',
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
