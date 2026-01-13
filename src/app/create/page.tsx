'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Globe,
    Briefcase,
    Mail,
    Phone,
    ArrowRight,
    ArrowLeft,
    Check,
    Sparkles,
    Building2,
    FileText,
    Loader2,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { leadFormSchema, type LeadFormSchema, normalizeUrl } from '@/lib/validation';
import { submitLeadToMake, generateLeadId } from '@/lib/makecom';
import { saveLead } from '@/lib/storage';
import type { Lead } from '@/types';

// Inner component that uses useSearchParams
function CreateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();

    const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>(
        (searchParams.get('plan') as 'free' | 'premium') || 'free'
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LeadFormSchema>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            companyUrl: '',
            jobTitle: '',
            contactEmail: '',
            contactPhone: '',
            planType: selectedPlan,
        },
    });

    // Update form when plan changes
    useEffect(() => {
        setValue('planType', selectedPlan);
    }, [selectedPlan, setValue]);

    const onSubmit = async (data: LeadFormSchema) => {
        setIsSubmitting(true);

        try {
            // Generate lead ID
            const leadId = generateLeadId();

            // Normalize URL
            const normalizedUrl = normalizeUrl(data.companyUrl);

            // Create lead object
            const lead: Lead = {
                id: leadId,
                companyUrl: normalizedUrl,
                jobTitle: data.jobTitle,
                contactEmail: data.contactEmail,
                contactPhone: data.contactPhone,
                planType: data.planType,
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Save to local storage
            saveLead(lead);

            // Submit to Make.com webhook
            const result = await submitLeadToMake({
                id: leadId,
                companyUrl: normalizedUrl,
                jobTitle: data.jobTitle,
                contactEmail: data.contactEmail,
                contactPhone: data.contactPhone,
                planType: data.planType,
            });

            if (!result.success) {
                // Even if webhook fails, we saved locally - continue to status page
                console.warn('Make.com webhook failed:', result.error);
            }

            showToast({
                type: 'success',
                title: 'Anfrage gesendet!',
                message: 'Wir beginnen mit der Analyse Ihrer Website.',
            });

            // Navigate to status page
            router.push(`/status/${leadId}`);

        } catch (error) {
            console.error('Error submitting lead:', error);
            showToast({
                type: 'error',
                title: 'Fehler',
                message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            {/* Back Link */}
            <button
                onClick={() => router.back()}
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
                Zurück
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
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
                        KI-gestützte Erstellung
                    </span>
                </div>
                <h1 className="heading-2">
                    Ihr Profil erstellen
                </h1>
                <p style={{
                    color: 'var(--muted)',
                    fontSize: 'var(--text-lg)',
                    marginTop: 'var(--space-3)',
                    maxWidth: '600px',
                    marginInline: 'auto',
                }}>
                    Geben Sie Ihre Unternehmenswebsite ein und lassen Sie unsere KI
                    ein professionelles Profil für Sie erstellen.
                </p>
            </div>

            {/* Plan Selection */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-8)',
            }}>
                <button
                    type="button"
                    onClick={() => setSelectedPlan('free')}
                    style={{
                        padding: 'var(--space-5)',
                        borderRadius: 'var(--radius-xl)',
                        border: `2px solid ${selectedPlan === 'free' ? 'var(--primary-500)' : 'var(--gray-200)'}`,
                        background: selectedPlan === 'free' ? 'var(--primary-50)' : 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-lg)',
                            background: selectedPlan === 'free' ? 'var(--primary-100)' : 'var(--gray-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Building2 size={20} style={{ color: selectedPlan === 'free' ? 'var(--primary-600)' : 'var(--gray-500)' }} />
                        </div>
                        <div>
                            <p style={{
                                margin: 0,
                                fontWeight: 600,
                                color: selectedPlan === 'free' ? 'var(--primary-700)' : 'var(--foreground)',
                            }}>
                                Profil Vorschau
                            </p>
                            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                                Kostenlos
                            </p>
                        </div>
                        {selectedPlan === 'free' && (
                            <Check size={20} style={{ marginLeft: 'auto', color: 'var(--primary-500)' }} />
                        )}
                    </div>
                    <p style={{
                        margin: 0,
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted)',
                        marginTop: 'var(--space-2)',
                    }}>
                        Erstellen Sie ein Unternehmensprofil und laden Sie es als PDF herunter.
                    </p>
                </button>

                <button
                    type="button"
                    onClick={() => setSelectedPlan('premium')}
                    style={{
                        padding: 'var(--space-5)',
                        borderRadius: 'var(--radius-xl)',
                        border: `2px solid ${selectedPlan === 'premium' ? 'var(--primary-500)' : 'var(--gray-200)'}`,
                        background: selectedPlan === 'premium' ? 'var(--primary-50)' : 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)',
                        position: 'relative',
                    }}
                >
                    <span style={{
                        position: 'absolute',
                        top: '-10px',
                        right: 'var(--space-4)',
                        background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                        color: 'white',
                        padding: 'var(--space-1) var(--space-3)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                    }}>
                        EMPFOHLEN
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-lg)',
                            background: selectedPlan === 'premium' ? 'var(--primary-100)' : 'var(--gray-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FileText size={20} style={{ color: selectedPlan === 'premium' ? 'var(--primary-600)' : 'var(--gray-500)' }} />
                        </div>
                        <div>
                            <p style={{
                                margin: 0,
                                fontWeight: 600,
                                color: selectedPlan === 'premium' ? 'var(--primary-700)' : 'var(--foreground)',
                            }}>
                                Stellenanzeige veröffentlichen
                            </p>
                            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                                €299
                            </p>
                        </div>
                        {selectedPlan === 'premium' && (
                            <Check size={20} style={{ marginLeft: 'auto', color: 'var(--primary-500)' }} />
                        )}
                    </div>
                    <p style={{
                        margin: 0,
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted)',
                        marginTop: 'var(--space-2)',
                    }}>
                        Profil + Stellenanzeige erstellen und auf der Jobbörse veröffentlichen.
                    </p>
                </button>
            </div>

            {/* Form Card */}
            <Card variant="elevated" padding="lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
                        {/* Company URL */}
                        <Input
                            {...register('companyUrl')}
                            label="Unternehmenswebsite"
                            placeholder="www.ihr-unternehmen.de"
                            leftIcon={Globe}
                            error={errors.companyUrl?.message}
                            isRequired
                            inputSize="lg"
                            hint="Wir analysieren Ihre Website, um Logo, Texte und Informationen zu extrahieren."
                        />

                        {/* Job Title */}
                        <Input
                            {...register('jobTitle')}
                            label="Jobtitel"
                            placeholder="z.B. Vertriebsmitarbeiter (m/w/d)"
                            leftIcon={Briefcase}
                            error={errors.jobTitle?.message}
                            isRequired
                            inputSize="lg"
                        />

                        {/* Contact Email */}
                        <Input
                            {...register('contactEmail')}
                            type="email"
                            label="Ihre E-Mail-Adresse"
                            placeholder="name@unternehmen.de"
                            leftIcon={Mail}
                            error={errors.contactEmail?.message}
                            isRequired
                            inputSize="lg"
                            hint="Hierhin senden wir Ihnen den Link zu Ihrem fertigen Profil."
                        />

                        {/* Contact Phone (Optional) */}
                        <Input
                            {...register('contactPhone')}
                            type="tel"
                            label="Telefonnummer (optional)"
                            placeholder="+49 123 456 789"
                            leftIcon={Phone}
                            error={errors.contactPhone?.message}
                            inputSize="lg"
                        />

                        {/* Hidden plan field */}
                        <input type="hidden" {...register('planType')} />

                        {/* Submit Button */}
                        <div style={{
                            marginTop: 'var(--space-4)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-4)',
                        }}>
                            <Button
                                type="submit"
                                variant="gradient"
                                size="xl"
                                fullWidth
                                isLoading={isSubmitting}
                                rightIcon={ArrowRight}
                            >
                                {isSubmitting ? 'Wird bearbeitet...' : 'Profil erstellen'}
                            </Button>

                            <p style={{
                                textAlign: 'center',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--muted)',
                                margin: 0,
                            }}>
                                Mit dem Absenden stimmen Sie unseren{' '}
                                <a href="/agb" style={{ color: 'var(--primary-500)' }}>AGB</a> und{' '}
                                <a href="/datenschutz" style={{ color: 'var(--primary-500)' }}>Datenschutzbestimmungen</a> zu.
                            </p>
                        </div>
                    </div>
                </form>
            </Card>

            {/* Features Reminder */}
            <div style={{
                marginTop: 'var(--space-8)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-4)',
            }}>
                {[
                    { icon: Sparkles, text: 'KI-generierte Texte' },
                    { icon: Building2, text: 'Logo & Farben Erkennung' },
                    { icon: Check, text: 'In unter 2 Minuten fertig' },
                ].map((feature, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-3)',
                        color: 'var(--muted)',
                        fontSize: 'var(--text-sm)',
                    }}>
                        <feature.icon size={16} style={{ color: 'var(--primary-500)' }} />
                        <span>{feature.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Loading fallback component
function CreateFormLoading() {
    return (
        <div className="container" style={{
            maxWidth: '900px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
        }}>
            <div style={{ textAlign: 'center' }}>
                <Loader2 size={40} style={{ color: 'var(--primary-500)', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: 'var(--muted)', marginTop: 'var(--space-4)' }}>Wird geladen...</p>
            </div>
        </div>
    );
}

// Main page component with Suspense boundary
export default function CreatePage() {
    return (
        <>
            <Header />

            <main style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'linear-gradient(180deg, var(--gray-50) 0%, white 100%)',
                paddingBlock: 'var(--space-12)',
            }}>
                <Suspense fallback={<CreateFormLoading />}>
                    <CreateForm />
                </Suspense>
            </main>

            <Footer />
        </>
    );
}
