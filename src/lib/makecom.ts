// Make.com Webhook Integration
import type { MakeWebhookPayload, MakeStatusPayload, Lead } from '@/types';

// Webhook URLs - These will be configured in environment variables
const MAKE_LEAD_WEBHOOK = process.env.NEXT_PUBLIC_MAKECOM_LEAD_WEBHOOK || '';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Submit a new lead to Make.com for processing
 */
export async function submitLeadToMake(lead: {
    id: string;
    companyUrl: string;
    jobTitle: string;
    contactEmail: string;
    contactPhone?: string;
    planType: 'free' | 'premium';
}): Promise<{ success: boolean; error?: string }> {
    if (!MAKE_LEAD_WEBHOOK) {
        console.warn('Make.com webhook URL not configured');
        return { success: false, error: 'Webhook not configured' };
    }

    const payload: MakeWebhookPayload = {
        leadId: lead.id,
        companyUrl: lead.companyUrl,
        jobTitle: lead.jobTitle,
        contactEmail: lead.contactEmail,
        contactPhone: lead.contactPhone,
        planType: lead.planType,
        callbackUrl: `${APP_URL}/api/webhook/status`,
    };

    try {
        const response = await fetch(MAKE_LEAD_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Make.com webhook failed: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error submitting lead to Make.com:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

/**
 * Validate incoming webhook from Make.com
 */
export function validateMakeWebhook(
    payload: unknown,
    secret?: string
): payload is MakeStatusPayload {
    if (!payload || typeof payload !== 'object') {
        return false;
    }

    const p = payload as Record<string, unknown>;

    // Required fields
    if (!p.leadId || typeof p.leadId !== 'string') return false;
    if (!p.status || typeof p.status !== 'string') return false;
    if (!p.message || typeof p.message !== 'string') return false;
    if (typeof p.progress !== 'number') return false;

    // Validate status enum
    const validStatuses = [
        'pending', 'processing', 'scraping', 'analyzing',
        'generating', 'complete', 'published', 'failed'
    ];
    if (!validStatuses.includes(p.status)) return false;

    return true;
}

/**
 * Generate unique lead ID
 */
export function generateLeadId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `lead_${timestamp}_${random}`;
}

/**
 * Format status message for display
 */
export function getStatusDisplayInfo(status: Lead['status']): {
    label: string;
    description: string;
    color: string;
    progress: number;
} {
    const statusMap: Record<Lead['status'], {
        label: string;
        description: string;
        color: string;
        progress: number;
    }> = {
        pending: {
            label: 'Ausstehend',
            description: 'Ihre Anfrage wurde empfangen und wartet auf Bearbeitung.',
            color: 'neutral',
            progress: 0,
        },
        processing: {
            label: 'In Bearbeitung',
            description: 'Wir starten die Analyse Ihrer Unternehmenswebsite.',
            color: 'primary',
            progress: 10,
        },
        scraping: {
            label: 'Website wird analysiert',
            description: 'Wir sammeln Informationen von Ihrer Website.',
            color: 'primary',
            progress: 30,
        },
        analyzing: {
            label: 'Daten werden verarbeitet',
            description: 'Logo, Farben und Texte werden extrahiert.',
            color: 'primary',
            progress: 50,
        },
        generating: {
            label: 'Inhalte werden erstellt',
            description: 'KI generiert Ihr Unternehmensprofil und die Stellenanzeige.',
            color: 'primary',
            progress: 75,
        },
        complete: {
            label: 'Abgeschlossen',
            description: 'Ihr Profil und Ihre Stellenanzeige sind bereit zur Ansicht.',
            color: 'success',
            progress: 100,
        },
        published: {
            label: 'Veröffentlicht',
            description: 'Ihre Stellenanzeige ist jetzt live!',
            color: 'success',
            progress: 100,
        },
        failed: {
            label: 'Fehler',
            description: 'Bei der Verarbeitung ist ein Fehler aufgetreten.',
            color: 'error',
            progress: 0,
        },
    };

    return statusMap[status];
}
