'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    Loader2,
    ArrowRight,
    AlertCircle,
    Globe,
    Palette,
    FileText,
    Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar, StepIndicator, ProcessingStatus } from '@/components/ui/Progress';
import { useToast } from '@/components/ui/Toast';
import { getLeadById, updateLeadStatus } from '@/lib/storage';
import { getStatusDisplayInfo } from '@/lib/makecom';
import type { Lead, LeadStatus } from '@/types';

export default function StatusPage() {
    const router = useRouter();
    const params = useParams();
    const leadId = params.id as string;
    const { showToast } = useToast();

    const [lead, setLead] = useState<Lead | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulated status progression for demo
    // In production, this would come from Make.com webhooks
    const [simulatedStatus, setSimulatedStatus] = useState<LeadStatus>('pending');
    const [simulatedProgress, setSimulatedProgress] = useState(0);

    // Load lead data
    useEffect(() => {
        if (!leadId) {
            setError('Keine Lead-ID angegeben');
            setIsLoading(false);
            return;
        }

        const storedLead = getLeadById(leadId);
        if (storedLead) {
            setLead(storedLead);
            setSimulatedStatus(storedLead.status);
        } else {
            setError('Lead nicht gefunden');
        }
        setIsLoading(false);
    }, [leadId]);

    // Simulate status progression
    // In production, this would be replaced by webhook updates
    useEffect(() => {
        if (!lead || lead.status === 'complete' || lead.status === 'failed') return;

        const statusSequence: LeadStatus[] = [
            'pending',
            'processing',
            'scraping',
            'analyzing',
            'generating',
            'complete',
        ];

        const progressValues: Record<LeadStatus, number> = {
            pending: 5,
            processing: 15,
            scraping: 35,
            analyzing: 55,
            generating: 80,
            complete: 100,
            published: 100,
            failed: 0,
        };

        let currentIndex = statusSequence.indexOf(simulatedStatus);

        const interval = setInterval(() => {
            if (currentIndex < statusSequence.length - 1) {
                currentIndex++;
                const newStatus = statusSequence[currentIndex];
                setSimulatedStatus(newStatus);
                setSimulatedProgress(progressValues[newStatus]);

                // Update lead in storage
                updateLeadStatus(leadId, newStatus);

                if (newStatus === 'complete') {
                    // Generate mock profile data
                    const updatedLead = getLeadById(leadId);
                    if (updatedLead) {
                        setLead({
                            ...updatedLead,
                            status: 'complete',
                            profile: {
                                companyName: 'Beispiel GmbH',
                                aboutText: 'Wir sind ein innovatives Unternehmen mit Sitz in Bayern und revolutionieren mit unseren digitalen Lösungen den Markt.',
                                values: ['Innovation', 'Teamgeist', 'Qualität', 'Nachhaltigkeit'],
                                benefits: ['Flexible Arbeitszeiten', 'Homeoffice möglich', '30 Tage Urlaub', 'Weiterbildung'],
                                brandColors: {
                                    primary: '#0066CC',
                                    secondary: '#00A3B8',
                                },
                                contact: {
                                    website: updatedLead.companyUrl,
                                },
                                images: [],
                            },
                            jobAdvert: {
                                title: updatedLead.jobTitle,
                                location: 'Bayern, Deutschland',
                                employmentType: 'full-time',
                                introduction: 'Wir suchen engagierte Talente für unser wachsendes Team.',
                                responsibilities: [
                                    'Aktive Neukundenakquise und Leadgenerierung',
                                    'Beratung von Kunden zu unseren Produkten',
                                    'Entwicklung und Umsetzung eigener Strategien',
                                ],
                                requirements: [
                                    'Erfahrung im relevanten Bereich',
                                    'Kommunikationsstärke und Teamfähigkeit',
                                    'Selbstständige Arbeitsweise',
                                ],
                                benefits: [
                                    'Attraktives Gehalt',
                                    'Flexible Arbeitszeiten',
                                    'Moderne Arbeitsumgebung',
                                ],
                                applicationInfo: {
                                    email: updatedLead.contactEmail,
                                },
                            },
                        });
                    }

                    showToast({
                        type: 'success',
                        title: 'Profil fertig!',
                        message: 'Ihr Profil wurde erfolgreich erstellt.',
                    });
                }
            }
        }, 2500); // Progress every 2.5 seconds

        return () => clearInterval(interval);
    }, [lead, simulatedStatus, leadId, showToast]);

    const handleRetry = useCallback(() => {
        if (!lead) return;

        setSimulatedStatus('processing');
        setSimulatedProgress(10);
        updateLeadStatus(leadId, 'processing');

        showToast({
            type: 'info',
            title: 'Wird wiederholt',
            message: 'Die Verarbeitung wird neu gestartet.',
        });
    }, [lead, leadId, showToast]);

    const handleViewPreview = useCallback(() => {
        router.push(`/preview/${leadId}`);
    }, [router, leadId]);

    if (isLoading) {
        return (
            <>
                <Header />
                <main style={{
                    minHeight: 'calc(100vh - 72px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Loader2 size={48} style={{ color: 'var(--primary-500)', animation: 'spin 1s linear infinite' }} />
                </main>
                <Footer />
            </>
        );
    }

    if (error || !lead) {
        return (
            <>
                <Header />
                <main style={{
                    minHeight: 'calc(100vh - 72px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-8)',
                }}>
                    <Card padding="lg" style={{ textAlign: 'center', maxWidth: '400px' }}>
                        <XCircle size={48} style={{ color: 'var(--error-500)', marginBottom: 'var(--space-4)' }} />
                        <h2 style={{ marginBottom: 'var(--space-2)' }}>Fehler</h2>
                        <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-6)' }}>
                            {error || 'Lead nicht gefunden'}
                        </p>
                        <Button variant="primary" onClick={() => router.push('/create')}>
                            Neues Profil erstellen
                        </Button>
                    </Card>
                </main>
                <Footer />
            </>
        );
    }

    const statusInfo = getStatusDisplayInfo(simulatedStatus);
    const isComplete = simulatedStatus === 'complete';
    const isFailed = simulatedStatus === 'failed';

    return (
        <>
            <Header />

            <main style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'linear-gradient(180deg, var(--gray-50) 0%, white 100%)',
                paddingBlock: 'var(--space-12)',
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    {/* Back Link */}
                    <button
                        onClick={() => router.push('/')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--muted)',
                            fontSize: 'var(--text-sm)',
                            cursor: 'pointer',
                            marginBottom: 'var(--space-6)',
                        }}
                    >
                        <ArrowLeft size={16} />
                        Zur Startseite
                    </button>

                    {/* Status Header */}
                    <Card variant="elevated" padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                            {isComplete ? (
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto var(--space-4)',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--success-400), var(--success-500))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'scaleIn 0.3s ease',
                                }}>
                                    <CheckCircle size={40} color="white" />
                                </div>
                            ) : isFailed ? (
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto var(--space-4)',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--error-400), var(--error-500))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <XCircle size={40} color="white" />
                                </div>
                            ) : (
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto var(--space-4)',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary-400), var(--primary-500))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'pulse 2s infinite',
                                }}>
                                    <Loader2 size={40} color="white" style={{ animation: 'spin 1s linear infinite' }} />
                                </div>
                            )}

                            <h1 className="heading-3" style={{ marginBottom: 'var(--space-2)' }}>
                                {statusInfo.label}
                            </h1>
                            <p style={{ color: 'var(--muted)', margin: 0 }}>
                                {statusInfo.description}
                            </p>
                        </div>

                        {/* Progress */}
                        {!isComplete && !isFailed && (
                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <ProgressBar
                                    value={simulatedProgress}
                                    animated
                                    showLabel
                                    size="lg"
                                />

                                {/* Step details */}
                                <div style={{
                                    marginTop: 'var(--space-8)',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: 'var(--space-4)',
                                }}>
                                    {[
                                        { id: 'scraping', label: 'Website-Analyse', icon: Globe, status: simulatedStatus },
                                        { id: 'analyzing', label: 'Marken-Erkennung', icon: Palette, status: simulatedStatus },
                                        { id: 'generating', label: 'Text-Erstellung', icon: Sparkles, status: simulatedStatus },
                                        { id: 'complete', label: 'Fertigstellung', icon: FileText, status: simulatedStatus },
                                    ].map((step, index) => {
                                        const statusOrder = ['pending', 'processing', 'scraping', 'analyzing', 'generating', 'complete'];
                                        const currentIndex = statusOrder.indexOf(simulatedStatus);
                                        const stepIndex = statusOrder.indexOf(step.id);
                                        const isStepComplete = stepIndex < currentIndex;
                                        const isStepActive = stepIndex === currentIndex;

                                        return (
                                            <div key={step.id} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    margin: '0 auto var(--space-2)',
                                                    borderRadius: 'var(--radius-lg)',
                                                    background: isStepComplete
                                                        ? 'var(--success-100)'
                                                        : isStepActive
                                                            ? 'var(--primary-100)'
                                                            : 'var(--gray-100)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: isStepComplete
                                                        ? 'var(--success-600)'
                                                        : isStepActive
                                                            ? 'var(--primary-600)'
                                                            : 'var(--gray-400)',
                                                    transition: 'all var(--transition-base)',
                                                }}>
                                                    {isStepComplete ? (
                                                        <CheckCircle size={24} />
                                                    ) : isStepActive ? (
                                                        <step.icon size={24} style={{ animation: 'pulse 1.5s infinite' }} />
                                                    ) : (
                                                        <step.icon size={24} />
                                                    )}
                                                </div>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: 'var(--text-xs)',
                                                    fontWeight: isStepActive ? 600 : 400,
                                                    color: isStepActive ? 'var(--foreground)' : 'var(--muted)',
                                                }}>
                                                    {step.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        {isComplete && (
                            <div style={{
                                marginTop: 'var(--space-6)',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 'var(--space-4)',
                            }}>
                                <Button
                                    variant="gradient"
                                    size="lg"
                                    rightIcon={ArrowRight}
                                    onClick={handleViewPreview}
                                >
                                    Profil ansehen
                                </Button>
                            </div>
                        )}

                        {isFailed && (
                            <div style={{
                                marginTop: 'var(--space-6)',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 'var(--space-4)',
                            }}>
                                <Button
                                    variant="secondary"
                                    leftIcon={RefreshCw}
                                    onClick={handleRetry}
                                >
                                    Erneut versuchen
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => router.push('/create')}
                                >
                                    Neues Profil
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Lead Info */}
                    <Card>
                        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Ihre Anfrage
                        </h3>
                        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--muted)' }}>Website:</span>
                                <span style={{ fontWeight: 500 }}>{lead.companyUrl}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--muted)' }}>Jobtitel:</span>
                                <span style={{ fontWeight: 500 }}>{lead.jobTitle}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--muted)' }}>E-Mail:</span>
                                <span style={{ fontWeight: 500 }}>{lead.contactEmail}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--muted)' }}>Plan:</span>
                                <span className={`badge ${lead.planType === 'premium' ? 'badge-primary' : 'badge-neutral'}`}>
                                    {lead.planType === 'premium' ? 'Stellenanzeige' : 'Kostenlos'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--muted)' }}>Erstellt:</span>
                                <span style={{ fontWeight: 500 }}>
                                    {new Date(lead.createdAt).toLocaleString('de-DE')}
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Help Section */}
                    {!isComplete && !isFailed && (
                        <div style={{
                            marginTop: 'var(--space-6)',
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--primary-50)',
                            border: '1px solid var(--primary-100)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                        }}>
                            <Clock size={20} style={{ color: 'var(--primary-600)' }} />
                            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--primary-700)' }}>
                                Die Verarbeitung dauert in der Regel 1-2 Minuten. Sie können diese Seite geöffnet lassen
                                oder später über den Link in Ihrer E-Mail zurückkehren.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
