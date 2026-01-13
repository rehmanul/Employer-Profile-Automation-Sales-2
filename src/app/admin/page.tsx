'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    FileText,
    Euro,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    Eye,
    MoreVertical,
    Search,
    Filter,
    Download,
    RefreshCw,
    Plus,
    Building2,
    ArrowUpRight,
    Loader2,
} from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { Card, StatCard } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { getStoredLeads } from '@/lib/storage';
import type { Lead, LeadStatus } from '@/types';

export default function AdminDashboard() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

    // Load leads
    useEffect(() => {
        const storedLeads = getStoredLeads();
        // Sort by created date, newest first
        storedLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLeads(storedLeads);
    }, []);

    // Calculate stats
    const stats = {
        totalLeads: leads.length,
        processing: leads.filter(l => ['processing', 'scraping', 'analyzing', 'generating'].includes(l.status)).length,
        completed: leads.filter(l => l.status === 'complete').length,
        published: leads.filter(l => l.status === 'published').length,
        revenue: leads.filter(l => l.planType === 'premium' && l.status === 'published').length * 299,
        conversionRate: leads.length > 0
            ? Math.round((leads.filter(l => l.planType === 'premium').length / leads.length) * 100)
            : 0,
    };

    // Filter leads
    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.companyUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Status badge component
    const StatusBadge = ({ status }: { status: LeadStatus }) => {
        const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
            pending: { label: 'Ausstehend', className: 'badge-neutral' },
            processing: { label: 'Wird verarbeitet', className: 'badge-primary' },
            scraping: { label: 'Analyse', className: 'badge-primary' },
            analyzing: { label: 'Extraktion', className: 'badge-primary' },
            generating: { label: 'Erstellung', className: 'badge-primary' },
            complete: { label: 'Fertig', className: 'badge-success' },
            published: { label: 'Veröffentlicht', className: 'badge-success' },
            failed: { label: 'Fehler', className: 'badge-error' },
        };

        const config = statusConfig[status];

        return (
            <span className={`badge ${config.className}`}>
                {['processing', 'scraping', 'analyzing', 'generating'].includes(status) && (
                    <Loader2 size={12} style={{ animation: 'spin 1s linear infinite', marginRight: '4px' }} />
                )}
                {config.label}
            </span>
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
            <Sidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <main style={{
                flex: 1,
                marginLeft: sidebarCollapsed ? '72px' : '260px',
                transition: 'margin-left var(--transition-base)',
                padding: 'var(--space-8)',
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-8)',
                }}>
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 700,
                            fontFamily: 'var(--font-display)',
                        }}>
                            Dashboard
                        </h1>
                        <p style={{ margin: 0, marginTop: 'var(--space-1)', color: 'var(--muted)' }}>
                            Übersicht über alle Leads und Aktivitäten
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                        <Button variant="secondary" leftIcon={Download}>
                            Export
                        </Button>
                        <Button variant="gradient" leftIcon={Plus}>
                            Neuer Lead
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'var(--space-6)',
                    marginBottom: 'var(--space-8)',
                }}>
                    <StatCard
                        value={stats.totalLeads}
                        label="Gesamt Leads"
                        icon={Users}
                        trend={{ value: 12, isPositive: true }}
                    />
                    <StatCard
                        value={stats.processing}
                        label="In Bearbeitung"
                        icon={Clock}
                    />
                    <StatCard
                        value={stats.published}
                        label="Veröffentlicht"
                        icon={FileText}
                    />
                    <StatCard
                        value={`€${stats.revenue.toLocaleString()}`}
                        label="Umsatz"
                        icon={Euro}
                        trend={{ value: 8, isPositive: true }}
                    />
                </div>

                {/* Conversion Rate Card */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: 'var(--space-6)',
                    marginBottom: 'var(--space-8)',
                }}>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                            <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                Neueste Leads
                            </h3>
                            <Button variant="ghost" size="sm" leftIcon={RefreshCw}>
                                Aktualisieren
                            </Button>
                        </div>

                        {/* Quick Lead Preview */}
                        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                            {leads.slice(0, 5).map((lead, i) => (
                                <div
                                    key={lead.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-4)',
                                        padding: 'var(--space-3)',
                                        background: 'var(--gray-50)',
                                        borderRadius: 'var(--radius-lg)',
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--primary-100)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary-600)',
                                    }}>
                                        <Building2 size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                                            {lead.jobTitle}
                                        </p>
                                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-xs)' }}>
                                            {new URL(lead.companyUrl).hostname}
                                        </p>
                                    </div>
                                    <StatusBadge status={lead.status} />
                                    <Button variant="ghost" size="sm" leftIcon={Eye}>
                                        Ansehen
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {leads.length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                padding: 'var(--space-12)',
                                color: 'var(--muted)',
                            }}>
                                <Users size={48} style={{ marginBottom: 'var(--space-4)', opacity: 0.5 }} />
                                <p style={{ margin: 0 }}>Noch keine Leads vorhanden</p>
                            </div>
                        )}
                    </Card>

                    <Card variant="gradient">
                        <h3 style={{ margin: 0, marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                            Conversion Rate
                        </h3>
                        <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                            <p style={{
                                margin: 0,
                                fontSize: 'var(--text-5xl)',
                                fontWeight: 800,
                                fontFamily: 'var(--font-display)',
                                background: 'linear-gradient(135deg, var(--primary-600), var(--accent-500))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                {stats.conversionRate}%
                            </p>
                            <p style={{ margin: 0, marginTop: 'var(--space-2)', color: 'var(--muted)' }}>
                                Kostenlos → Premium
                            </p>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-2)',
                            marginTop: 'var(--space-4)',
                            padding: 'var(--space-3)',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--success-600)',
                            fontSize: 'var(--text-sm)',
                        }}>
                            <TrendingUp size={16} />
                            <span>+5% vs. letzten Monat</span>
                        </div>
                    </Card>
                </div>

                {/* Leads Table */}
                <Card>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--space-6)',
                    }}>
                        <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                            Alle Leads
                        </h3>

                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            <div style={{ position: 'relative', width: '300px' }}>
                                <Search
                                    size={18}
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
                                    placeholder="Suchen..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="form-input"
                                    style={{ paddingLeft: 'var(--space-10)' }}
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
                                className="form-input"
                                style={{ width: 'auto' }}
                            >
                                <option value="all">Alle Status</option>
                                <option value="pending">Ausstehend</option>
                                <option value="processing">In Bearbeitung</option>
                                <option value="complete">Fertig</option>
                                <option value="published">Veröffentlicht</option>
                                <option value="failed">Fehler</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Website</th>
                                    <th>Jobtitel</th>
                                    <th>E-Mail</th>
                                    <th>Plan</th>
                                    <th>Status</th>
                                    <th>Erstellt</th>
                                    <th style={{ width: '80px' }}>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map(lead => (
                                    <tr key={lead.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: 'var(--radius-md)',
                                                    background: 'var(--primary-50)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--primary-600)',
                                                }}>
                                                    <Building2 size={16} />
                                                </div>
                                                <a
                                                    href={lead.companyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: 'var(--primary-600)',
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 'var(--space-1)',
                                                    }}
                                                >
                                                    {new URL(lead.companyUrl).hostname}
                                                    <ArrowUpRight size={12} />
                                                </a>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 500 }}>{lead.jobTitle}</td>
                                        <td style={{ color: 'var(--muted)' }}>{lead.contactEmail}</td>
                                        <td>
                                            <span className={`badge ${lead.planType === 'premium' ? 'badge-primary' : 'badge-neutral'}`}>
                                                {lead.planType === 'premium' ? 'Premium' : 'Kostenlos'}
                                            </span>
                                        </td>
                                        <td>
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                                            {new Date(lead.createdAt).toLocaleDateString('de-DE', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td>
                                            <Button variant="ghost" size="sm" leftIcon={Eye}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredLeads.length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                padding: 'var(--space-12)',
                                color: 'var(--muted)',
                            }}>
                                <Search size={48} style={{ marginBottom: 'var(--space-4)', opacity: 0.5 }} />
                                <p style={{ margin: 0 }}>Keine Leads gefunden</p>
                            </div>
                        )}
                    </div>
                </Card>
            </main>
        </div>
    );
}
