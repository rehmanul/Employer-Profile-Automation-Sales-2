'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, Sparkles, Building2, FileText, Users, Star } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const plans = [
    {
        name: 'Kostenlos',
        price: '€0',
        period: 'einmalig',
        description: 'Perfekt zum Ausprobieren und für kleine Unternehmen',
        features: [
            { text: 'Unternehmensprofil erstellen', included: true },
            { text: 'KI-generierte Texte', included: true },
            { text: 'Logo & Farben Erkennung', included: true },
            { text: 'PDF-Download', included: true },
            { text: 'Stellenanzeige erstellen', included: false },
            { text: 'Veröffentlichung auf Jobbörse', included: false },
            { text: 'Bewerber-Management', included: false },
            { text: 'Premium Support', included: false },
        ],
        cta: 'Kostenlos starten',
        popular: false,
        href: '/create?plan=free',
    },
    {
        name: 'Premium',
        price: '€299',
        period: 'pro Stellenanzeige',
        description: 'Vollständige Lösung für aktives Recruiting',
        features: [
            { text: 'Unternehmensprofil erstellen', included: true },
            { text: 'KI-generierte Texte', included: true },
            { text: 'Logo & Farben Erkennung', included: true },
            { text: 'PDF-Download', included: true },
            { text: 'Stellenanzeige erstellen', included: true },
            { text: 'Veröffentlichung auf Jobbörse (30 Tage)', included: true },
            { text: 'Bewerber-Management', included: true },
            { text: 'E-Mail Support', included: true },
        ],
        cta: 'Jetzt buchen',
        popular: true,
        href: '/create?plan=premium',
    },
    {
        name: 'Enterprise',
        price: 'Individuell',
        period: 'auf Anfrage',
        description: 'Maßgeschneiderte Lösungen für große Unternehmen',
        features: [
            { text: 'Unbegrenzte Stellenanzeigen', included: true },
            { text: 'Eigenes Branding', included: true },
            { text: 'API-Zugang', included: true },
            { text: 'White-Label Option', included: true },
            { text: 'Dedicated Account Manager', included: true },
            { text: 'SLA & Priority Support', included: true },
            { text: 'Custom Integrationen', included: true },
            { text: 'On-Premise Option', included: true },
        ],
        cta: 'Kontakt aufnehmen',
        popular: false,
        href: '/kontakt',
    },
];

const faqs = [
    {
        question: 'Wie funktioniert die automatische Profilerstellung?',
        answer: 'Unsere KI analysiert Ihre Unternehmenswebsite und extrahiert relevante Informationen wie Logo, Farben, Texte und Bilder. Daraus wird automatisch ein professionelles Unternehmensprofil erstellt.',
    },
    {
        question: 'Wie lange dauert die Erstellung?',
        answer: 'Die automatische Erstellung dauert in der Regel nur 1-2 Minuten. Sie erhalten eine Benachrichtigung per E-Mail, sobald Ihr Profil fertig ist.',
    },
    {
        question: 'Kann ich die generierten Texte bearbeiten?',
        answer: 'Ja, Sie können alle generierten Inhalte vor der Veröffentlichung individuell anpassen und bearbeiten.',
    },
    {
        question: 'Wie lange läuft eine Premium-Stellenanzeige?',
        answer: 'Eine Premium-Stellenanzeige ist 30 Tage auf unserer Jobbörse sichtbar. Sie können die Laufzeit bei Bedarf verlängern.',
    },
];

export default function PricingPage() {
    return (
        <>
            <Header />

            <main>
                {/* Hero */}
                <section style={{
                    background: 'linear-gradient(180deg, var(--gray-50) 0%, white 100%)',
                    paddingBlock: 'var(--space-16)',
                    textAlign: 'center',
                }}>
                    <div className="container">
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            padding: 'var(--space-2) var(--space-4)',
                            background: 'var(--primary-50)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: 'var(--space-4)',
                        }}>
                            <Sparkles size={16} style={{ color: 'var(--primary-500)' }} />
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--primary-700)' }}>
                                Transparente Preise
                            </span>
                        </div>

                        <h1 className="heading-1" style={{ marginBottom: 'var(--space-4)' }}>
                            Wählen Sie Ihren Plan
                        </h1>
                        <p style={{
                            color: 'var(--muted)',
                            fontSize: 'var(--text-xl)',
                            maxWidth: '600px',
                            marginInline: 'auto',
                        }}>
                            Starten Sie kostenlos oder wählen Sie Premium für maximale Reichweite bei der Kandidatensuche.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section style={{ paddingBlock: 'var(--space-16)', marginTop: '-60px' }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 'var(--space-6)',
                            maxWidth: '1100px',
                            marginInline: 'auto',
                        }}>
                            {plans.map((plan, i) => (
                                <Card
                                    key={i}
                                    variant={plan.popular ? 'gradient' : 'elevated'}
                                    padding="lg"
                                    style={{
                                        position: 'relative',
                                        transform: plan.popular ? 'scale(1.05)' : 'none',
                                        zIndex: plan.popular ? 1 : 0,
                                    }}
                                >
                                    {plan.popular && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                                            color: 'white',
                                            padding: 'var(--space-1) var(--space-4)',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: 'var(--text-xs)',
                                            fontWeight: 600,
                                        }}>
                                            BELIEBTESTE WAHL
                                        </div>
                                    )}

                                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                                        <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, margin: 0 }}>
                                            {plan.name}
                                        </h3>
                                        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', margin: 'var(--space-2) 0' }}>
                                            {plan.description}
                                        </p>
                                        <div style={{ marginTop: 'var(--space-4)' }}>
                                            <span style={{
                                                fontSize: 'var(--text-4xl)',
                                                fontWeight: 800,
                                                fontFamily: 'var(--font-display)',
                                            }}>
                                                {plan.price}
                                            </span>
                                            <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                                {' '}{plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 'var(--space-6)' }}>
                                        {plan.features.map((feature, j) => (
                                            <li key={j} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-3)',
                                                padding: 'var(--space-2) 0',
                                                color: feature.included ? 'var(--foreground)' : 'var(--muted)',
                                            }}>
                                                {feature.included ? (
                                                    <Check size={18} style={{ color: 'var(--success-500)' }} />
                                                ) : (
                                                    <X size={18} style={{ color: 'var(--gray-300)' }} />
                                                )}
                                                <span style={{ fontSize: 'var(--text-sm)' }}>{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={plan.href}>
                                        <Button
                                            variant={plan.popular ? 'gradient' : 'secondary'}
                                            fullWidth
                                            size="lg"
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section style={{
                    paddingBlock: 'var(--space-12)',
                    background: 'var(--gray-50)',
                }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 'var(--space-8)',
                            textAlign: 'center',
                        }}>
                            {[
                                { value: '500+', label: 'Erstellte Profile' },
                                { value: '2 Min', label: 'Durchschnittliche Erstellzeit' },
                                { value: '98%', label: 'Kundenzufriedenheit' },
                                { value: '24/7', label: 'Automatisierung' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p style={{
                                        fontSize: 'var(--text-4xl)',
                                        fontWeight: 800,
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--primary-600)',
                                        margin: 0,
                                    }}>
                                        {stat.value}
                                    </p>
                                    <p style={{ color: 'var(--muted)', margin: 0, marginTop: 'var(--space-1)' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ paddingBlock: 'var(--space-16)' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>
                        <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                            Häufige Fragen
                        </h2>

                        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                            {faqs.map((faq, i) => (
                                <Card key={i}>
                                    <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                                        {faq.question}
                                    </h3>
                                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 'var(--leading-relaxed)' }}>
                                        {faq.answer}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{
                    paddingBlock: 'var(--space-16)',
                    background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                    color: 'white',
                    textAlign: 'center',
                }}>
                    <div className="container">
                        <h2 style={{
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 700,
                            fontFamily: 'var(--font-display)',
                            margin: 0,
                            marginBottom: 'var(--space-4)',
                        }}>
                            Bereit loszulegen?
                        </h2>
                        <p style={{ opacity: 0.9, marginBottom: 'var(--space-6)', maxWidth: '500px', marginInline: 'auto' }}>
                            Erstellen Sie jetzt Ihr erstes Unternehmensprofil – kostenlos und in nur 2 Minuten.
                        </p>
                        <Link href="/create">
                            <Button variant="secondary" size="lg" rightIcon={ArrowRight}>
                                Kostenlos testen
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
