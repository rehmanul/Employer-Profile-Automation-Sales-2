'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    Edit3,
    Download,
    Share2,
    Building2,
    MapPin,
    Mail,
    Phone,
    Globe,
    Clock,
    Users,
    Briefcase,
    CheckCircle,
    Star,
    Save,
    X,
    Upload,
    Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { getLeadById, saveLead, saveDraft } from '@/lib/storage';
import type { Lead } from '@/types';

export default function PreviewPage() {
    const router = useRouter();
    const params = useParams();
    const leadId = params.id as string;
    const { showToast } = useToast();

    const [lead, setLead] = useState<Lead | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editSection, setEditSection] = useState<'profile' | 'job' | null>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'job'>('profile');

    // Load lead data
    useEffect(() => {
        if (!leadId) {
            setIsLoading(false);
            return;
        }

        const storedLead = getLeadById(leadId);
        if (storedLead) {
            // If no profile data, create mock data for demonstration
            if (!storedLead.profile) {
                storedLead.profile = {
                    companyName: 'Recruiting Now GmbH',
                    logo: undefined,
                    aboutText: 'Wir sind ein innovatives Unternehmen mit Sitz in Gmund am Tegernsee und revolutionieren mit unseren digitalen Lösungen den Markt. Unser Team besteht aus leidenschaftlichen Experten, die gemeinsam wachsen und erfolgreich sind. Bei uns gibt es keine starren Strukturen – wir bieten dir die Freiheit, eigenverantwortlich zu arbeiten und deine Ideen einzubringen.',
                    brandColors: {
                        primary: '#0066CC',
                        secondary: '#00A3B8',
                    },
                    values: ['Innovation', 'Teamgeist', 'Eigenverantwortung', 'Wachstum'],
                    benefits: [
                        'Unbegrenztes Provisionsmodell',
                        '100% Homeoffice',
                        '4-Tage-Woche',
                        'Wachstumschancen',
                        'Freiraum für Eigeninitiative',
                    ],
                    contact: {
                        email: 'personal@recruiting-now.de',
                        phone: '08022 509 2122',
                        website: storedLead.companyUrl,
                    },
                    address: {
                        city: 'Gmund am Tegernsee',
                        country: 'Deutschland',
                        fullAddress: 'Gmund am Tegernsee, Bayern, Deutschland',
                    },
                    images: [],
                };
            }

            if (!storedLead.jobAdvert) {
                storedLead.jobAdvert = {
                    title: storedLead.jobTitle,
                    location: 'Gmund am Tegernsee',
                    employmentType: 'full-time',
                    introduction: `Bist du ein Vertriebsprofi mit Leidenschaft für digitale Lösungen? Dann haben wir genau den richtigen Job für dich! Bei uns kannst du in einem wachsenden digitalen Unternehmen dein Talent voll ausspielen – und das mit maximaler Flexibilität.`,
                    responsibilities: [
                        'Aktive Neukundenakquise und Leadgenerierung',
                        'Beratung von Kunden zu unseren SaaS-Produkten',
                        'Abschluss von Verträgen mit Entscheidern und Unternehmen',
                        'Entwicklung und Umsetzung eigener Akquisestrategien',
                        'Nutzung von CRM-Systemen zur optimalen Kundenbetreuung',
                    ],
                    requirements: [
                        'Erfahrung in der Akquise von erklärungsbedürftigen digitalen Produkten',
                        'Idealerweise Kenntnisse im Recruiting-Vertrieb oder Personalbranche',
                        'CRM-Systeme sind dir vertraut (kein Muss, aber ein Plus!)',
                        'Flexibilität und Veränderungsbereitschaft',
                    ],
                    niceToHave: [
                        'Branchenkenntnisse im HR-Tech Bereich',
                        'Erfahrung mit B2B-Sales',
                    ],
                    benefits: [
                        'Unbegrenztes Provisionsmodell – dein Erfolg bestimmt dein Einkommen!',
                        '100% Homeoffice – arbeite von dort, wo du am produktivsten bist!',
                        '4-Tage-Woche – mehr Freizeit, mehr Energie, mehr Motivation!',
                        'Wachstumschancen – entwickle dich weiter in einem expandierenden Unternehmen!',
                        'Freiraum für Eigeninitiative – deine Ideen sind bei uns willkommen!',
                    ],
                    applicationInfo: {
                        email: 'personal@recruiting-now.de',
                        phone: '08022 509 2122',
                    },
                };
            }

            setLead(storedLead);
        }
        setIsLoading(false);
    }, [leadId]);

    const handleProceedToPayment = () => {
        if (lead?.planType === 'premium') {
            router.push(`/order/${leadId}`);
        } else {
            showToast({
                type: 'info',
                title: 'Kostenloser Plan',
                message: 'Sie können Ihr Profil als PDF herunterladen.',
            });
        }
    };

    const handleDownloadPDF = () => {
        showToast({
            type: 'success',
            title: 'PDF wird erstellt',
            message: 'Ihr Profil wird als PDF generiert und heruntergeladen.',
        });
    };

    const handleSaveEdit = () => {
        if (lead) {
            saveLead(lead);
            showToast({
                type: 'success',
                title: 'Gespeichert',
                message: 'Ihre Änderungen wurden gespeichert.',
            });
        }
        setEditSection(null);
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Sparkles size={48} style={{ color: 'var(--primary-500)', animation: 'pulse 2s infinite' }} />
                        <p style={{ marginTop: 'var(--space-4)', color: 'var(--muted)' }}>Laden...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!lead) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card padding="lg" style={{ textAlign: 'center', maxWidth: '400px' }}>
                        <h2>Profil nicht gefunden</h2>
                        <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-4)' }}>
                            Das angeforderte Profil existiert nicht.
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

    const { profile, jobAdvert } = lead;

    return (
        <>
            <Header />

            <main style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'var(--gray-50)',
            }}>
                {/* Hero Banner */}
                <div style={{
                    background: `linear-gradient(135deg, ${profile?.brandColors?.primary || 'var(--primary-600)'}, ${profile?.brandColors?.secondary || 'var(--accent-500)'})`,
                    paddingTop: 'var(--space-8)',
                    paddingBottom: 'var(--space-16)',
                    position: 'relative',
                }}>
                    <div className="container">
                        {/* Back Link */}
                        <button
                            onClick={() => router.back()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'white',
                                fontSize: 'var(--text-sm)',
                                cursor: 'pointer',
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-full)',
                                marginBottom: 'var(--space-6)',
                            }}
                        >
                            <ArrowLeft size={16} />
                            Zurück
                        </button>

                        {/* Company Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', color: 'white' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: 'var(--radius-xl)',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'var(--shadow-lg)',
                            }}>
                                {profile?.logo ? (
                                    <img src={profile.logo} alt="Logo" style={{ maxWidth: '80%', maxHeight: '80%' }} />
                                ) : (
                                    <Building2 size={48} style={{ color: profile?.brandColors?.primary || 'var(--primary-500)' }} />
                                )}
                            </div>
                            <div>
                                <h1 style={{
                                    fontSize: 'var(--text-3xl)',
                                    fontWeight: 700,
                                    margin: 0,
                                    marginBottom: 'var(--space-2)',
                                }}>
                                    {profile?.companyName || 'Ihr Unternehmen'}
                                </h1>
                                {profile?.address && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', opacity: 0.9 }}>
                                        <MapPin size={16} />
                                        <span>{profile.address.fullAddress}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container" style={{ marginTop: '-80px', paddingBottom: 'var(--space-12)' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 360px',
                        gap: 'var(--space-6)',
                        alignItems: 'start',
                    }}>
                        {/* Main Content */}
                        <div>
                            {/* Tab Navigation */}
                            <Card padding="none" style={{ marginBottom: 'var(--space-6)' }}>
                                <div style={{
                                    display: 'flex',
                                    borderBottom: '1px solid var(--card-border)',
                                }}>
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        style={{
                                            flex: 1,
                                            padding: 'var(--space-4)',
                                            border: 'none',
                                            background: activeTab === 'profile' ? 'var(--primary-50)' : 'transparent',
                                            color: activeTab === 'profile' ? 'var(--primary-600)' : 'var(--muted)',
                                            fontWeight: activeTab === 'profile' ? 600 : 400,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 'var(--space-2)',
                                            borderBottom: activeTab === 'profile' ? '2px solid var(--primary-500)' : '2px solid transparent',
                                            marginBottom: '-1px',
                                        }}
                                    >
                                        <Building2 size={18} />
                                        Unternehmensprofil
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('job')}
                                        style={{
                                            flex: 1,
                                            padding: 'var(--space-4)',
                                            border: 'none',
                                            background: activeTab === 'job' ? 'var(--primary-50)' : 'transparent',
                                            color: activeTab === 'job' ? 'var(--primary-600)' : 'var(--muted)',
                                            fontWeight: activeTab === 'job' ? 600 : 400,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 'var(--space-2)',
                                            borderBottom: activeTab === 'job' ? '2px solid var(--primary-500)' : '2px solid transparent',
                                            marginBottom: '-1px',
                                        }}
                                    >
                                        <Briefcase size={18} />
                                        Stellenanzeige
                                    </button>
                                </div>

                                <div style={{ padding: 'var(--space-6)' }}>
                                    {activeTab === 'profile' ? (
                                        <div>
                                            {/* About Section */}
                                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                                                    <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                                                        Über uns
                                                    </h2>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        leftIcon={Edit3}
                                                        onClick={() => { setEditSection('profile'); setIsEditing(true); }}
                                                    >
                                                        Bearbeiten
                                                    </Button>
                                                </div>
                                                <p style={{ lineHeight: 'var(--leading-relaxed)', color: 'var(--gray-700)' }}>
                                                    {profile?.aboutText}
                                                </p>
                                            </div>

                                            {/* Values */}
                                            {profile?.values && profile.values.length > 0 && (
                                                <div style={{ marginBottom: 'var(--space-8)' }}>
                                                    <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                                        Unsere Werte
                                                    </h3>
                                                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                                        {profile.values.map((value, i) => (
                                                            <span key={i} style={{
                                                                padding: 'var(--space-2) var(--space-4)',
                                                                background: 'var(--primary-50)',
                                                                color: 'var(--primary-700)',
                                                                borderRadius: 'var(--radius-full)',
                                                                fontSize: 'var(--text-sm)',
                                                                fontWeight: 500,
                                                            }}>
                                                                {value}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Benefits */}
                                            {profile?.benefits && profile.benefits.length > 0 && (
                                                <div>
                                                    <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                                        Benefits
                                                    </h3>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                                                        {profile.benefits.map((benefit, i) => (
                                                            <div key={i} style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 'var(--space-3)',
                                                                padding: 'var(--space-3)',
                                                                background: 'var(--gray-50)',
                                                                borderRadius: 'var(--radius-lg)',
                                                            }}>
                                                                <CheckCircle size={18} style={{ color: 'var(--success-500)' }} />
                                                                <span style={{ fontSize: 'var(--text-sm)' }}>{benefit}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            {/* Job Title */}
                                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                                                            {jobAdvert?.title}
                                                        </h2>
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: 'var(--space-4)',
                                                            marginTop: 'var(--space-2)',
                                                            color: 'var(--muted)',
                                                            fontSize: 'var(--text-sm)',
                                                        }}>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                                                                <MapPin size={14} /> {jobAdvert?.location}
                                                            </span>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                                                                <Briefcase size={14} /> Vollzeit
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        leftIcon={Edit3}
                                                        onClick={() => { setEditSection('job'); setIsEditing(true); }}
                                                    >
                                                        Bearbeiten
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Introduction */}
                                            <p style={{
                                                fontSize: 'var(--text-lg)',
                                                lineHeight: 'var(--leading-relaxed)',
                                                marginBottom: 'var(--space-8)',
                                                color: 'var(--gray-700)',
                                            }}>
                                                {jobAdvert?.introduction}
                                            </p>

                                            {/* Responsibilities */}
                                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                                <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                                    Deine Aufgaben
                                                </h3>
                                                <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', lineHeight: 'var(--leading-relaxed)' }}>
                                                    {jobAdvert?.responsibilities.map((item, i) => (
                                                        <li key={i} style={{ marginBottom: 'var(--space-2)' }}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Requirements */}
                                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                                <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                                    Das bringst du mit
                                                </h3>
                                                <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', lineHeight: 'var(--leading-relaxed)' }}>
                                                    {jobAdvert?.requirements.map((item, i) => (
                                                        <li key={i} style={{ marginBottom: 'var(--space-2)' }}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Benefits */}
                                            <div>
                                                <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                                    Das bieten wir
                                                </h3>
                                                <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
                                                    {jobAdvert?.benefits.map((benefit, i) => (
                                                        <div key={i} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 'var(--space-3)',
                                                            padding: 'var(--space-3)',
                                                            background: 'var(--success-50)',
                                                            borderRadius: 'var(--radius-lg)',
                                                        }}>
                                                            <Star size={18} style={{ color: 'var(--warning-500)' }} />
                                                            <span>{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div style={{ position: 'sticky', top: '88px' }}>
                            {/* Actions Card */}
                            <Card variant="elevated" padding="lg" style={{ marginBottom: 'var(--space-4)' }}>
                                <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                    Aktionen
                                </h3>
                                <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                                    <Button
                                        variant="gradient"
                                        fullWidth
                                        size="lg"
                                        rightIcon={ArrowRight}
                                        onClick={handleProceedToPayment}
                                    >
                                        {lead.planType === 'premium' ? 'Zur Zahlung' : 'PDF herunterladen'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        fullWidth
                                        leftIcon={Download}
                                        onClick={handleDownloadPDF}
                                    >
                                        Als PDF speichern
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        fullWidth
                                        leftIcon={Share2}
                                    >
                                        Teilen
                                    </Button>
                                </div>
                            </Card>

                            {/* Contact Card */}
                            <Card>
                                <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                    Kontakt
                                </h3>
                                <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                                    {profile?.contact?.email && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <Mail size={18} style={{ color: 'var(--muted)' }} />
                                            <a href={`mailto:${profile.contact.email}`} style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                                                {profile.contact.email}
                                            </a>
                                        </div>
                                    )}
                                    {profile?.contact?.phone && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <Phone size={18} style={{ color: 'var(--muted)' }} />
                                            <a href={`tel:${profile.contact.phone}`} style={{ color: 'var(--foreground)', textDecoration: 'none' }}>
                                                {profile.contact.phone}
                                            </a>
                                        </div>
                                    )}
                                    {profile?.contact?.website && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <Globe size={18} style={{ color: 'var(--muted)' }} />
                                            <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                                                Website besuchen
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Plan Info */}
                            <div style={{
                                marginTop: 'var(--space-4)',
                                padding: 'var(--space-4)',
                                background: lead.planType === 'premium' ? 'var(--primary-50)' : 'var(--gray-100)',
                                borderRadius: 'var(--radius-lg)',
                                border: `1px solid ${lead.planType === 'premium' ? 'var(--primary-200)' : 'var(--gray-200)'}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                    <span className={`badge ${lead.planType === 'premium' ? 'badge-primary' : 'badge-neutral'}`}>
                                        {lead.planType === 'premium' ? 'Premium' : 'Kostenlos'}
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                                    {lead.planType === 'premium'
                                        ? 'Veröffentlichen Sie Ihre Stellenanzeige auf unserer Jobbörse.'
                                        : 'Laden Sie Ihr Profil als PDF herunter.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditing && editSection !== null}
                onClose={() => { setIsEditing(false); setEditSection(null); }}
                title={editSection === 'profile' ? 'Profil bearbeiten' : 'Stellenanzeige bearbeiten'}
                size="lg"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => { setIsEditing(false); setEditSection(null); }}>
                            Abbrechen
                        </Button>
                        <Button variant="primary" leftIcon={Save} onClick={handleSaveEdit}>
                            Speichern
                        </Button>
                    </>
                }
            >
                <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-4)' }}>
                    Bearbeiten Sie die generierten Inhalte nach Ihren Wünschen.
                </p>
                <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                    {editSection === 'profile' ? (
                        <>
                            <Input
                                label="Firmenname"
                                defaultValue={profile?.companyName}
                                onChange={(e) => {
                                    if (lead && profile) {
                                        setLead({
                                            ...lead,
                                            profile: { ...profile, companyName: e.target.value }
                                        });
                                    }
                                }}
                            />
                            <Textarea
                                label="Über uns"
                                defaultValue={profile?.aboutText}
                                style={{ minHeight: '150px' }}
                                onChange={(e) => {
                                    if (lead && profile) {
                                        setLead({
                                            ...lead,
                                            profile: { ...profile, aboutText: e.target.value }
                                        });
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                label="Jobtitel"
                                defaultValue={jobAdvert?.title}
                                onChange={(e) => {
                                    if (lead && jobAdvert) {
                                        setLead({
                                            ...lead,
                                            jobAdvert: { ...jobAdvert, title: e.target.value }
                                        });
                                    }
                                }}
                            />
                            <Textarea
                                label="Einleitung"
                                defaultValue={jobAdvert?.introduction}
                                style={{ minHeight: '100px' }}
                            />
                        </>
                    )}
                </div>
            </Modal>

            <Footer />
        </>
    );
}
