'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowLeft,
    CreditCard,
    FileText,
    Building2,
    Check,
    Shield,
    Lock,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { billingFormSchema, type BillingFormSchema } from '@/lib/validation';
import { getLeadById, saveLead } from '@/lib/storage';
import type { Lead } from '@/types';

export default function OrderPage() {
    const router = useRouter();
    const params = useParams();
    const leadId = params.id as string;
    const { showToast } = useToast();

    const [lead, setLead] = useState<Lead | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'invoice'>('card');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BillingFormSchema>({
        resolver: zodResolver(billingFormSchema),
        defaultValues: {
            country: 'Deutschland',
        },
    });

    // Load lead data
    useEffect(() => {
        if (!leadId) {
            setIsLoading(false);
            return;
        }

        const storedLead = getLeadById(leadId);
        if (storedLead) {
            setLead(storedLead);
        }
        setIsLoading(false);
    }, [leadId]);

    const onSubmit = async (data: BillingFormSchema) => {
        setIsSubmitting(true);

        try {
            // In production, this would create a Stripe checkout session
            // or process the invoice request

            await new Promise(resolve => setTimeout(resolve, 2000));

            if (lead) {
                const updatedLead: Lead = {
                    ...lead,
                    payment: {
                        status: paymentMethod === 'card' ? 'processing' : 'pending',
                        amount: 299,
                        currency: 'EUR',
                        method: paymentMethod === 'card' ? 'stripe' : 'invoice',
                    },
                };
                saveLead(updatedLead);
            }

            showToast({
                type: 'success',
                title: paymentMethod === 'card' ? 'Zahlung erfolgreich!' : 'Rechnung wird erstellt',
                message: paymentMethod === 'card'
                    ? 'Ihre Stellenanzeige wird veröffentlicht.'
                    : 'Sie erhalten die Rechnung per E-Mail.',
            });

            router.push(`/success/${leadId}`);

        } catch (error) {
            console.error('Payment error:', error);
            showToast({
                type: 'error',
                title: 'Fehler',
                message: 'Die Zahlung konnte nicht verarbeitet werden.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !lead) {
        return (
            <>
                <Header />
                <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Laden...</p>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'var(--gray-50)',
                paddingBlock: 'var(--space-12)',
            }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
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
                        Zurück zur Vorschau
                    </button>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 400px',
                        gap: 'var(--space-8)',
                        alignItems: 'start',
                    }}>
                        {/* Form */}
                        <div>
                            <h1 className="heading-3" style={{ marginBottom: 'var(--space-2)' }}>
                                Bestellung abschließen
                            </h1>
                            <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-8)' }}>
                                Geben Sie Ihre Rechnungsdaten ein, um die Stellenanzeige zu veröffentlichen.
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Billing Info */}
                                <Card padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                                        <Building2 size={24} style={{ color: 'var(--primary-500)' }} />
                                        <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                            Rechnungsadresse
                                        </h2>
                                    </div>

                                    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                                        <Input
                                            {...register('companyName')}
                                            label="Firmenname"
                                            placeholder="Ihre Firma GmbH"
                                            error={errors.companyName?.message}
                                            isRequired
                                        />

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                            <Input
                                                {...register('vatId')}
                                                label="USt-IdNr. (optional)"
                                                placeholder="DE123456789"
                                                error={errors.vatId?.message}
                                                hint="Für Rechnungsstellung mit USt-Ausweis"
                                            />
                                            <Input
                                                {...register('email')}
                                                type="email"
                                                label="E-Mail für Rechnung"
                                                placeholder="buchhaltung@firma.de"
                                                error={errors.email?.message}
                                                isRequired
                                            />
                                        </div>

                                        <Input
                                            {...register('street')}
                                            label="Straße und Hausnummer"
                                            placeholder="Musterstraße 123"
                                            error={errors.street?.message}
                                            isRequired
                                        />

                                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 'var(--space-4)' }}>
                                            <Input
                                                {...register('postalCode')}
                                                label="PLZ"
                                                placeholder="12345"
                                                error={errors.postalCode?.message}
                                                isRequired
                                            />
                                            <Input
                                                {...register('city')}
                                                label="Stadt"
                                                placeholder="München"
                                                error={errors.city?.message}
                                                isRequired
                                            />
                                            <Select
                                                {...register('country')}
                                                label="Land"
                                                error={errors.country?.message}
                                                isRequired
                                                options={[
                                                    { value: 'Deutschland', label: 'Deutschland' },
                                                    { value: 'Österreich', label: 'Österreich' },
                                                    { value: 'Schweiz', label: 'Schweiz' },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </Card>

                                {/* Payment Method */}
                                <Card padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                                        <CreditCard size={24} style={{ color: 'var(--primary-500)' }} />
                                        <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                            Zahlungsmethode
                                        </h2>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('card')}
                                            style={{
                                                padding: 'var(--space-4)',
                                                borderRadius: 'var(--radius-lg)',
                                                border: `2px solid ${paymentMethod === 'card' ? 'var(--primary-500)' : 'var(--gray-200)'}`,
                                                background: paymentMethod === 'card' ? 'var(--primary-50)' : 'white',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <CreditCard size={24} style={{ color: paymentMethod === 'card' ? 'var(--primary-600)' : 'var(--gray-400)' }} />
                                                <div>
                                                    <p style={{ margin: 0, fontWeight: 600 }}>Kreditkarte</p>
                                                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                                                        Sofortige Veröffentlichung
                                                    </p>
                                                </div>
                                                {paymentMethod === 'card' && (
                                                    <Check size={20} style={{ marginLeft: 'auto', color: 'var(--primary-500)' }} />
                                                )}
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('invoice')}
                                            style={{
                                                padding: 'var(--space-4)',
                                                borderRadius: 'var(--radius-lg)',
                                                border: `2px solid ${paymentMethod === 'invoice' ? 'var(--primary-500)' : 'var(--gray-200)'}`,
                                                background: paymentMethod === 'invoice' ? 'var(--primary-50)' : 'white',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <FileText size={24} style={{ color: paymentMethod === 'invoice' ? 'var(--primary-600)' : 'var(--gray-400)' }} />
                                                <div>
                                                    <p style={{ margin: 0, fontWeight: 600 }}>Rechnung</p>
                                                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                                                        Zahlungsziel 14 Tage
                                                    </p>
                                                </div>
                                                {paymentMethod === 'invoice' && (
                                                    <Check size={20} style={{ marginLeft: 'auto', color: 'var(--primary-500)' }} />
                                                )}
                                            </div>
                                        </button>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <div style={{
                                            marginTop: 'var(--space-6)',
                                            padding: 'var(--space-6)',
                                            background: 'var(--gray-50)',
                                            borderRadius: 'var(--radius-lg)',
                                            textAlign: 'center',
                                        }}>
                                            <Lock size={24} style={{ color: 'var(--muted)', marginBottom: 'var(--space-2)' }} />
                                            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                                Sichere Zahlung über Stripe. Nach Klick auf "Jetzt bezahlen"
                                                werden Sie zum Zahlungsformular weitergeleitet.
                                            </p>
                                        </div>
                                    )}
                                </Card>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="xl"
                                    fullWidth
                                    isLoading={isSubmitting}
                                >
                                    {paymentMethod === 'card' ? 'Jetzt bezahlen - €299' : 'Auf Rechnung bestellen - €299'}
                                </Button>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 'var(--space-2)',
                                    marginTop: 'var(--space-4)',
                                    color: 'var(--muted)',
                                    fontSize: 'var(--text-sm)',
                                }}>
                                    <Shield size={16} />
                                    <span>SSL-verschlüsselt · DSGVO-konform</span>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div style={{ position: 'sticky', top: '88px' }}>
                            <Card variant="elevated" padding="lg">
                                <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                    Bestellübersicht
                                </h3>

                                <div style={{
                                    padding: 'var(--space-4)',
                                    background: 'var(--gray-50)',
                                    borderRadius: 'var(--radius-lg)',
                                    marginBottom: 'var(--space-4)',
                                }}>
                                    <p style={{ margin: 0, fontWeight: 600 }}>{lead.jobTitle}</p>
                                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                                        Stellenanzeige · 30 Tage Laufzeit
                                    </p>
                                </div>

                                <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                                        <span style={{ color: 'var(--muted)' }}>Stellenanzeige</span>
                                        <span>€299,00</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                                        <span style={{ color: 'var(--muted)' }}>MwSt. (19%)</span>
                                        <span>€56,81</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: 'var(--space-3)',
                                        borderTop: '1px solid var(--gray-200)',
                                        fontWeight: 700,
                                        fontSize: 'var(--text-lg)',
                                    }}>
                                        <span>Gesamt</span>
                                        <span>€355,81</span>
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: 'var(--space-6)',
                                    padding: 'var(--space-4)',
                                    background: 'var(--success-50)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--success-200)',
                                }}>
                                    <h4 style={{ margin: 0, marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--success-700)' }}>
                                        Inklusive
                                    </h4>
                                    <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--success-700)' }}>
                                        <li>Unternehmensprofil</li>
                                        <li>Stellenanzeige für 30 Tage</li>
                                        <li>Bewerber-Benachrichtigungen</li>
                                        <li>Statistiken & Analytics</li>
                                    </ul>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
