'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

const contactSchema = z.object({
    name: z.string().min(2, 'Name ist erforderlich'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    company: z.string().optional(),
    phone: z.string().optional(),
    subject: z.string().min(1, 'Bitte wählen Sie ein Thema'),
    message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen haben'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactForm) => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        showToast({
            type: 'success',
            title: 'Nachricht gesendet!',
            message: 'Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
        });

        reset();
        setIsSubmitting(false);
    };

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
                        <h1 className="heading-1" style={{ marginBottom: 'var(--space-4)' }}>
                            Kontaktieren Sie uns
                        </h1>
                        <p style={{
                            color: 'var(--muted)',
                            fontSize: 'var(--text-xl)',
                            maxWidth: '600px',
                            marginInline: 'auto',
                        }}>
                            Haben Sie Fragen zu unseren Services? Wir sind für Sie da und antworten innerhalb von 24 Stunden.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section style={{ paddingBlock: 'var(--space-16)' }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 400px',
                            gap: 'var(--space-12)',
                            maxWidth: '1000px',
                            marginInline: 'auto',
                        }}>
                            {/* Form */}
                            <Card variant="elevated" padding="lg">
                                <h2 style={{ margin: 0, marginBottom: 'var(--space-6)', fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                                    Schreiben Sie uns
                                </h2>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                            <Input
                                                {...register('name')}
                                                label="Ihr Name"
                                                placeholder="Max Mustermann"
                                                error={errors.name?.message}
                                                isRequired
                                            />
                                            <Input
                                                {...register('email')}
                                                type="email"
                                                label="E-Mail"
                                                placeholder="max@beispiel.de"
                                                error={errors.email?.message}
                                                isRequired
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                            <Input
                                                {...register('company')}
                                                label="Unternehmen (optional)"
                                                placeholder="Ihre Firma GmbH"
                                                leftIcon={Building2}
                                            />
                                            <Input
                                                {...register('phone')}
                                                type="tel"
                                                label="Telefon (optional)"
                                                placeholder="+49 123 456 789"
                                                leftIcon={Phone}
                                            />
                                        </div>

                                        <Select
                                            {...register('subject')}
                                            label="Betreff"
                                            error={errors.subject?.message}
                                            isRequired
                                            options={[
                                                { value: '', label: 'Bitte wählen...' },
                                                { value: 'general', label: 'Allgemeine Anfrage' },
                                                { value: 'pricing', label: 'Preise & Pakete' },
                                                { value: 'enterprise', label: 'Enterprise Lösung' },
                                                { value: 'support', label: 'Technischer Support' },
                                                { value: 'partnership', label: 'Partnerschaft' },
                                            ]}
                                        />

                                        <Textarea
                                            {...register('message')}
                                            label="Ihre Nachricht"
                                            placeholder="Wie können wir Ihnen helfen?"
                                            error={errors.message?.message}
                                            isRequired
                                            style={{ minHeight: '150px' }}
                                        />

                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            size="lg"
                                            fullWidth
                                            isLoading={isSubmitting}
                                            leftIcon={Send}
                                        >
                                            Nachricht senden
                                        </Button>
                                    </div>
                                </form>
                            </Card>

                            {/* Contact Info */}
                            <div>
                                <Card style={{ marginBottom: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--primary-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Mail size={24} style={{ color: 'var(--primary-600)' }} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600 }}>E-Mail</h3>
                                            <a href="mailto:info@profilpro.de" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                                                info@profilpro.de
                                            </a>
                                        </div>
                                    </div>
                                </Card>

                                <Card style={{ marginBottom: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--primary-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Phone size={24} style={{ color: 'var(--primary-600)' }} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600 }}>Telefon</h3>
                                            <a href="tel:+4980225092122" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>
                                                +49 (0) 8022 509 2122
                                            </a>
                                        </div>
                                    </div>
                                </Card>

                                <Card style={{ marginBottom: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--primary-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <MapPin size={24} style={{ color: 'var(--primary-600)' }} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600 }}>Adresse</h3>
                                            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                                Gmund am Tegernsee<br />
                                                83703 Bayern, Deutschland
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card>
                                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--primary-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Clock size={24} style={{ color: 'var(--primary-600)' }} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600 }}>Geschäftszeiten</h3>
                                            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                                Mo - Fr: 9:00 - 18:00 Uhr<br />
                                                24/7 automatische Profilgenerierung
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
