'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    CheckCircle,
    Download,
    Share2,
    ArrowRight,
    Mail,
    PartyPopper,
    FileText,
    Eye,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getLeadById } from '@/lib/storage';
import type { Lead } from '@/types';

export default function SuccessPage() {
    const router = useRouter();
    const params = useParams();
    const leadId = params.id as string;

    const [lead, setLead] = useState<Lead | null>(null);

    useEffect(() => {
        if (leadId) {
            const storedLead = getLeadById(leadId);
            setLead(storedLead);
        }
    }, [leadId]);

    return (
        <>
            <Header />

            <main style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'linear-gradient(180deg, var(--success-50) 0%, white 50%)',
                paddingBlock: 'var(--space-16)',
            }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    {/* Success Animation */}
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            margin: '0 auto var(--space-6)',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--success-400), var(--success-500))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: 'scaleIn 0.5s ease',
                            boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)',
                        }}>
                            <CheckCircle size={60} color="white" />
                        </div>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            padding: 'var(--space-2) var(--space-4)',
                            background: 'white',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: 'var(--space-4)',
                            boxShadow: 'var(--shadow-sm)',
                        }}>
                            <PartyPopper size={16} style={{ color: 'var(--warning-500)' }} />
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                                Glückwunsch!
                            </span>
                        </div>

                        <h1 className="heading-2" style={{ marginBottom: 'var(--space-3)' }}>
                            Bestellung erfolgreich!
                        </h1>
                        <p style={{
                            color: 'var(--muted)',
                            fontSize: 'var(--text-lg)',
                            lineHeight: 'var(--leading-relaxed)',
                        }}>
                            Ihre Stellenanzeige wird in Kürze veröffentlicht.
                            Sie erhalten eine Bestätigung per E-Mail.
                        </p>
                    </div>

                    {/* Order Details */}
                    <Card variant="elevated" padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                            Bestelldetails
                        </h3>

                        {lead && (
                            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--muted)' }}>Jobtitel</span>
                                    <span style={{ fontWeight: 500 }}>{lead.jobTitle}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--muted)' }}>Status</span>
                                    <span className="badge badge-success">Wird veröffentlicht</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--muted)' }}>Laufzeit</span>
                                    <span style={{ fontWeight: 500 }}>30 Tage</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingTop: 'var(--space-3)',
                                    borderTop: '1px solid var(--gray-200)',
                                }}>
                                    <span style={{ color: 'var(--muted)' }}>Betrag</span>
                                    <span style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>€355,81</span>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Actions */}
                    <Card padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                            Nächste Schritte
                        </h3>

                        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                            <Link href={`/preview/${leadId}`} style={{ textDecoration: 'none' }}>
                                <Button variant="primary" fullWidth leftIcon={Eye}>
                                    Stellenanzeige ansehen
                                </Button>
                            </Link>

                            <Button variant="secondary" fullWidth leftIcon={Download}>
                                Rechnung herunterladen
                            </Button>

                            <Button variant="ghost" fullWidth leftIcon={Share2}>
                                Anzeige teilen
                            </Button>
                        </div>
                    </Card>

                    {/* What's Next */}
                    <div style={{
                        padding: 'var(--space-6)',
                        background: 'var(--primary-50)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--primary-100)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                            <Mail size={24} style={{ color: 'var(--primary-600)' }} />
                            <h4 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--primary-700)' }}>
                                Bestätigung per E-Mail
                            </h4>
                        </div>
                        <p style={{ margin: 0, color: 'var(--primary-700)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                            Sie erhalten in Kürze eine E-Mail mit:
                        </p>
                        <ul style={{
                            margin: 0,
                            marginTop: 'var(--space-2)',
                            paddingLeft: 'var(--space-5)',
                            color: 'var(--primary-700)',
                            fontSize: 'var(--text-sm)',
                            lineHeight: 'var(--leading-relaxed)',
                        }}>
                            <li>Bestätigung Ihrer Bestellung</li>
                            <li>Link zu Ihrer Stellenanzeige</li>
                            <li>Rechnung als PDF</li>
                            <li>Kontaktdaten für Rückfragen</li>
                        </ul>
                    </div>

                    {/* Back to Home */}
                    <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Button variant="ghost" rightIcon={ArrowRight}>
                                Zurück zur Startseite
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
