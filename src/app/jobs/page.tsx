'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    MapPin,
    Briefcase,
    Clock,
    Building2,
    Filter,
    ArrowRight,
    Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Sample job listings for demo
const sampleJobs = [
    {
        id: 'job-1',
        title: 'Senior Vertriebsmitarbeiter (m/w/d)',
        company: 'Recruiting Now GmbH',
        location: 'Gmund am Tegernsee',
        type: 'Vollzeit',
        posted: 'Vor 2 Tagen',
        logo: null,
        featured: true,
        benefits: ['Homeoffice', '4-Tage-Woche', 'Unbegrenzte Provision'],
    },
    {
        id: 'job-2',
        title: 'Frontend Developer React (m/w/d)',
        company: 'TechStart GmbH',
        location: 'München',
        type: 'Vollzeit',
        posted: 'Vor 3 Tagen',
        logo: null,
        featured: false,
        benefits: ['Remote', 'Flexible Zeiten', 'Weiterbildung'],
    },
    {
        id: 'job-3',
        title: 'Marketing Manager (m/w/d)',
        company: 'Digital Solutions AG',
        location: 'Berlin',
        type: 'Vollzeit',
        posted: 'Vor 5 Tagen',
        logo: null,
        featured: true,
        benefits: ['Hybrides Arbeiten', 'Firmenwagen', '30 Tage Urlaub'],
    },
    {
        id: 'job-4',
        title: 'Kundenberater im Außendienst (m/w/d)',
        company: 'Alpen Services',
        location: 'Rosenheim',
        type: 'Vollzeit',
        posted: 'Vor 1 Woche',
        logo: null,
        featured: false,
        benefits: ['Firmenwagen', 'Provision', 'Homeoffice'],
    },
    {
        id: 'job-5',
        title: 'Projektmanager IT (m/w/d)',
        company: 'Innovation Hub',
        location: 'Hamburg',
        type: 'Vollzeit',
        posted: 'Vor 1 Woche',
        logo: null,
        featured: false,
        benefits: ['Remote möglich', 'Bonus', 'Weiterbildung'],
    },
    {
        id: 'job-6',
        title: 'HR Business Partner (m/w/d)',
        company: 'People First GmbH',
        location: 'Frankfurt',
        type: 'Teilzeit',
        posted: 'Vor 2 Wochen',
        logo: null,
        featured: false,
        benefits: ['30 Stunden/Woche', 'Remtote', 'Flexible Zeiten'],
    },
];

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const filteredJobs = sampleJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = !locationFilter ||
            job.location.toLowerCase().includes(locationFilter.toLowerCase());
        return matchesSearch && matchesLocation;
    });

    return (
        <>
            <Header />

            <main>
                {/* Hero with Search */}
                <section style={{
                    background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                    color: 'white',
                    paddingBlock: 'var(--space-16)',
                }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                            <h1 style={{
                                fontSize: 'var(--text-4xl)',
                                fontWeight: 800,
                                fontFamily: 'var(--font-display)',
                                margin: 0,
                                marginBottom: 'var(--space-3)',
                            }}>
                                Stellenangebote
                            </h1>
                            <p style={{ opacity: 0.9, fontSize: 'var(--text-lg)' }}>
                                Finden Sie Ihren Traumjob bei Top-Arbeitgebern
                            </p>
                        </div>

                        {/* Search Bar */}
                        <Card padding="md" style={{ maxWidth: '800px', marginInline: 'auto' }}>
                            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                <div style={{ flex: 2, position: 'relative' }}>
                                    <Search
                                        size={20}
                                        style={{
                                            position: 'absolute',
                                            left: 'var(--space-3)',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--muted)',
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Job suchen..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="form-input"
                                        style={{ paddingLeft: 'var(--space-10)', height: '48px' }}
                                    />
                                </div>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <MapPin
                                        size={20}
                                        style={{
                                            position: 'absolute',
                                            left: 'var(--space-3)',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--muted)',
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ort..."
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                        className="form-input"
                                        style={{ paddingLeft: 'var(--space-10)', height: '48px' }}
                                    />
                                </div>
                                <Button variant="gradient" size="lg">
                                    Suchen
                                </Button>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Job Listings */}
                <section style={{ paddingBlock: 'var(--space-12)', background: 'var(--gray-50)' }}>
                    <div className="container">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--space-6)',
                        }}>
                            <p style={{ margin: 0, color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--foreground)' }}>{filteredJobs.length}</strong> Stellenangebote gefunden
                            </p>
                            <Button variant="ghost" leftIcon={Filter}>
                                Filter
                            </Button>
                        </div>

                        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                            {filteredJobs.map((job) => (
                                <Card
                                    key={job.id}
                                    variant={job.featured ? 'elevated' : 'default'}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderLeft: job.featured ? '4px solid var(--primary-500)' : undefined,
                                    }}
                                >
                                    {job.featured && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 'var(--space-3)',
                                            right: 'var(--space-3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-1)',
                                            padding: 'var(--space-1) var(--space-2)',
                                            background: 'var(--warning-100)',
                                            color: 'var(--warning-700)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: 'var(--text-xs)',
                                            fontWeight: 600,
                                        }}>
                                            <Star size={12} fill="currentColor" />
                                            Featured
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                        {/* Company Logo */}
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--primary-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Building2 size={28} style={{ color: 'var(--primary-600)' }} />
                                        </div>

                                        {/* Job Details */}
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                margin: 0,
                                                marginBottom: 'var(--space-1)',
                                                fontSize: 'var(--text-lg)',
                                                fontWeight: 600,
                                            }}>
                                                {job.title}
                                            </h3>
                                            <p style={{ margin: 0, color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
                                                {job.company}
                                            </p>

                                            <div style={{
                                                display: 'flex',
                                                gap: 'var(--space-4)',
                                                marginBottom: 'var(--space-3)',
                                                fontSize: 'var(--text-sm)',
                                                color: 'var(--muted)',
                                            }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                                                    <MapPin size={14} /> {job.location}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                                                    <Briefcase size={14} /> {job.type}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                                                    <Clock size={14} /> {job.posted}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                                {job.benefits.map((benefit, i) => (
                                                    <span key={i} style={{
                                                        padding: 'var(--space-1) var(--space-2)',
                                                        background: 'var(--gray-100)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--gray-700)',
                                                    }}>
                                                        {benefit}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link href={`/jobs/${job.id}`}>
                                                <Button variant="primary" rightIcon={ArrowRight}>
                                                    Bewerben
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredJobs.length === 0 && (
                            <Card style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
                                <Search size={48} style={{ color: 'var(--muted)', marginBottom: 'var(--space-4)' }} />
                                <h3 style={{ margin: 0, marginBottom: 'var(--space-2)' }}>Keine Ergebnisse</h3>
                                <p style={{ margin: 0, color: 'var(--muted)' }}>
                                    Versuchen Sie andere Suchbegriffe oder Filter.
                                </p>
                            </Card>
                        )}
                    </div>
                </section>

                {/* CTA for Employers */}
                <section style={{ paddingBlock: 'var(--space-12)' }}>
                    <div className="container">
                        <Card variant="gradient" padding="lg" style={{ textAlign: 'center' }}>
                            <h2 style={{ margin: 0, marginBottom: 'var(--space-2)', fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                                Sie suchen Mitarbeiter?
                            </h2>
                            <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-6)', maxWidth: '500px', marginInline: 'auto' }}>
                                Erstellen Sie in 2 Minuten Ihr Unternehmensprofil und veröffentlichen Sie Ihre Stellenanzeige.
                            </p>
                            <Link href="/create?plan=premium">
                                <Button variant="gradient" size="lg" rightIcon={ArrowRight}>
                                    Jetzt Stellenanzeige schalten
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
