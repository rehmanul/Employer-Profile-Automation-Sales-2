import type { Lead, CompanyProfile, JobAdvert } from '@/types';

const STORAGE_KEYS = {
    LEADS: 'profile_automation_leads',
    DRAFTS: 'profile_automation_drafts',
    SETTINGS: 'profile_automation_settings',
} as const;

/**
 * Get all stored leads
 */
export function getStoredLeads(): Lead[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(STORAGE_KEYS.LEADS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading leads from storage:', error);
        return [];
    }
}

/**
 * Get a single lead by ID
 */
export function getLeadById(id: string): Lead | null {
    const leads = getStoredLeads();
    return leads.find(lead => lead.id === id) || null;
}

/**
 * Save a lead to storage
 */
export function saveLead(lead: Lead): void {
    if (typeof window === 'undefined') return;

    try {
        const leads = getStoredLeads();
        const existingIndex = leads.findIndex(l => l.id === lead.id);

        if (existingIndex >= 0) {
            leads[existingIndex] = { ...lead, updatedAt: new Date().toISOString() };
        } else {
            leads.push(lead);
        }

        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (error) {
        console.error('Error saving lead to storage:', error);
    }
}

/**
 * Update lead status
 */
export function updateLeadStatus(
    id: string,
    status: Lead['status'],
    additionalData?: Partial<Lead>
): Lead | null {
    const lead = getLeadById(id);
    if (!lead) return null;

    const updatedLead: Lead = {
        ...lead,
        ...additionalData,
        status,
        updatedAt: new Date().toISOString(),
    };

    saveLead(updatedLead);
    return updatedLead;
}

/**
 * Delete a lead
 */
export function deleteLead(id: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const leads = getStoredLeads();
        const filtered = leads.filter(l => l.id !== id);
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting lead:', error);
        return false;
    }
}

/**
 * Save draft content for editing
 */
export function saveDraft(
    leadId: string,
    type: 'profile' | 'jobAdvert',
    content: Partial<CompanyProfile | JobAdvert>
): void {
    if (typeof window === 'undefined') return;

    try {
        const draftsJson = localStorage.getItem(STORAGE_KEYS.DRAFTS);
        const drafts = draftsJson ? JSON.parse(draftsJson) : {};

        if (!drafts[leadId]) {
            drafts[leadId] = {};
        }

        drafts[leadId][type] = {
            content,
            savedAt: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    } catch (error) {
        console.error('Error saving draft:', error);
    }
}

/**
 * Get draft content
 */
export function getDraft(
    leadId: string,
    type: 'profile' | 'jobAdvert'
): { content: Partial<CompanyProfile | JobAdvert>; savedAt: string } | null {
    if (typeof window === 'undefined') return null;

    try {
        const draftsJson = localStorage.getItem(STORAGE_KEYS.DRAFTS);
        if (!draftsJson) return null;

        const drafts = JSON.parse(draftsJson);
        return drafts[leadId]?.[type] || null;
    } catch (error) {
        console.error('Error reading draft:', error);
        return null;
    }
}

/**
 * Clear draft for a lead
 */
export function clearDraft(leadId: string, type?: 'profile' | 'jobAdvert'): void {
    if (typeof window === 'undefined') return;

    try {
        const draftsJson = localStorage.getItem(STORAGE_KEYS.DRAFTS);
        if (!draftsJson) return;

        const drafts = JSON.parse(draftsJson);

        if (type) {
            if (drafts[leadId]) {
                delete drafts[leadId][type];
            }
        } else {
            delete drafts[leadId];
        }

        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    } catch (error) {
        console.error('Error clearing draft:', error);
    }
}

/**
 * Get storage statistics
 */
export function getStorageStats(): {
    leadsCount: number;
    draftsCount: number;
    totalSizeKB: number;
} {
    if (typeof window === 'undefined') {
        return { leadsCount: 0, draftsCount: 0, totalSizeKB: 0 };
    }

    const leadsData = localStorage.getItem(STORAGE_KEYS.LEADS) || '';
    const draftsData = localStorage.getItem(STORAGE_KEYS.DRAFTS) || '';

    const leads = leadsData ? JSON.parse(leadsData) : [];
    const drafts = draftsData ? JSON.parse(draftsData) : {};

    const totalBytes = leadsData.length + draftsData.length;

    return {
        leadsCount: leads.length,
        draftsCount: Object.keys(drafts).length,
        totalSizeKB: Math.round(totalBytes / 1024 * 10) / 10,
    };
}

/**
 * Clear all storage
 */
export function clearAllStorage(): void {
    if (typeof window === 'undefined') return;

    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}
