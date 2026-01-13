'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Target, Award, Zap, Heart, Globe } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, FeatureCard } from '@/components/ui/Card';

const values = [
    {
        icon: Zap,
        title: 'Innovation',
        description: 'Wir nutzen modernste KI-Technologie, um Recruiting einfacher und effizienter zu machen.',
    },
    {
        icon: Users,
        title: 'Kundenorientierung',
        description: 'Der Erfolg unserer Kunden steht im Mittelpunkt all unserer Entscheidungen.',
    },
    {
        icon: Award,
        title: 'Qualität',
        description: 'Wir liefern nur Ergebnisse, die höchsten Ansprüchen genügen.',
    },
    {
        icon: Heart,
        title: 'Leidenschaft',
        description: 'Wir lieben was wir tun und das spiegelt sich in jedem Produkt wider.',
    },
];

const team = [
    { name: 'Thomas Müller', role: 'Gründer & CEO', image: null },
    { name: 'Sarah Schmidt', role: 'CTO', image: null },
    { name: 'Michael Weber', role: 'Head of Sales', image: null },
    { name: 'Lisa Hoffmann', role: 'Customer Success', image: null },
];

export default function AboutPage() {
    return (
        <>
            <Header />

            <main>
                {/* Hero */}
                <section style={{
                    background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                    color: 'white',
                    paddingBlock: 'var(--space-20)',
                    textAlign: 'center',
                }}>
                    <div className="container">
                        <h1 style={{
                            fontSize: 'var(--text-5xl)',
                            fontWeight: 800,
                            fontFamily: 'var(--font-display)',
                            margin: 0,
                            marginBottom: 'var(--space-4)',
                        }}>
                            Über ProfilPro
                        </h1>
                        <p style={{
                            opacity: 0.9,
                            fontSize: 'var(--text-xl)',
                            maxWidth: '700px',
                            marginInline: 'auto',
                            lineHeight: 'var(--leading-relaxed)',
                        }}>
                            Wir revolutionieren die Art und Weise, wie Unternehmen sich präsentieren und Talente finden –
                            mit der Kraft von Künstlicher Intelligenz.
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section style={{ paddingBlock: 'var(--space-16)' }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--space-12)',
                            alignItems: 'center',
                            maxWidth: '1000px',
                            marginInline: 'auto',
                        }}>
                            <div>
                                <span className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>
                                    Unsere Mission
                                </span>
                                <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                                    Recruiting einfach machen
                                </h2>
                                <p style={{ color: 'var(--muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
                                    Viele Unternehmen haben großartige Jobs zu bieten, aber keine Zeit, professionelle
                                    Stellenanzeigen zu erstellen. Das ändern wir.
                                </p>
                                <p style={{ color: 'var(--muted)', lineHeight: 'var(--leading-relaxed)' }}>
                                    Mit ProfilPro können Sie in wenigen Minuten ein komplettes Unternehmensprofil und
                                    ansprechende Stellenanzeigen erstellen – ganz automatisch, dank KI.
                                </p>
                            </div>

                            <Card variant="gradient" padding="lg">
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 'var(--space-6)',
                                }}>
                                    {[
                                        { value: '2022', label: 'Gegründet' },
                                        { value: '500+', label: 'Erstellte Profile' },
                                        { value: '98%', label: 'Zufriedenheit' },
                                        { value: '24/7', label: 'Verfügbar' },
                                    ].map((stat, i) => (
                                        <div key={i} style={{ textAlign: 'center' }}>
                                            <p style={{
                                                fontSize: 'var(--text-3xl)',
                                                fontWeight: 800,
                                                fontFamily: 'var(--font-display)',
                                                color: 'var(--primary-600)',
                                                margin: 0,
                                            }}>
                                                {stat.value}
                                            </p>
                                            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section style={{
                    paddingBlock: 'var(--space-16)',
                    background: 'var(--gray-50)',
                }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                            <h2 className="heading-2">Unsere Werte</h2>
                            <p style={{ color: 'var(--muted)', maxWidth: '600px', marginInline: 'auto' }}>
                                Diese Prinzipien leiten uns bei allem, was wir tun.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 'var(--space-6)',
                        }}>
                            {values.map((value, i) => (
                                <FeatureCard
                                    key={i}
                                    icon={value.icon}
                                    title={value.title}
                                    description={value.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section style={{ paddingBlock: 'var(--space-16)' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                            <h2 className="heading-2">Unser Team</h2>
                            <p style={{ color: 'var(--muted)', maxWidth: '600px', marginInline: 'auto' }}>
                                Die Menschen hinter ProfilPro.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 'var(--space-6)',
                            maxWidth: '900px',
                            marginInline: 'auto',
                        }}>
                            {team.map((member, i) => (
                                <Card key={i} style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--primary-400), var(--accent-400))',
                                        margin: '0 auto var(--space-4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: 'var(--text-2xl)',
                                        fontWeight: 700,
                                    }}>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                        {member.name}
                                    </h3>
                                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                        {member.role}
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
                            Bereit, loszulegen?
                        </h2>
                        <p style={{ opacity: 0.9, marginBottom: 'var(--space-6)', maxWidth: '500px', marginInline: 'auto' }}>
                            Erstellen Sie jetzt Ihr erstes Unternehmensprofil – kostenlos und unverbindlich.
                        </p>
                        <Link href="/create">
                            <Button variant="secondary" size="lg" rightIcon={ArrowRight}>
                                Jetzt starten
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
