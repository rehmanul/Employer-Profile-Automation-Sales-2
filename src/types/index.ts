// Lead Data Types
export interface Lead {
    id: string;
    companyUrl: string;
    jobTitle: string;
    contactEmail: string;
    contactPhone?: string;
    planType: 'free' | 'premium';
    status: LeadStatus;
    createdAt: string;
    updatedAt: string;
    profile?: CompanyProfile;
    jobAdvert?: JobAdvert;
    payment?: PaymentInfo;
}

export type LeadStatus =
    | 'pending'
    | 'processing'
    | 'scraping'
    | 'analyzing'
    | 'generating'
    | 'complete'
    | 'published'
    | 'failed';

export interface LeadFormData {
    companyUrl: string;
    jobTitle: string;
    contactEmail: string;
    contactPhone?: string;
    planType: 'free' | 'premium';
}

export interface LeadStatusUpdate {
    leadId: string;
    status: LeadStatus;
    message: string;
    progress: number;
    timestamp: string;
}

// Company Profile Types
export interface CompanyProfile {
    companyName: string;
    logo?: string;
    logoFallback?: string;
    brandColors: {
        primary: string;
        secondary: string;
        accent?: string;
    };
    aboutText: string;
    mission?: string;
    values: string[];
    benefits: string[];
    address?: CompanyAddress;
    contact: CompanyContact;
    socialLinks?: SocialLinks;
    images: string[];
    industry?: string;
}

export interface CompanyAddress {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    fullAddress: string;
}

export interface CompanyContact {
    email?: string;
    phone?: string;
    website: string;
}

export interface SocialLinks {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    xing?: string;
}

// Job Advert Types
export interface JobAdvert {
    title: string;
    location: string;
    employmentType: EmploymentType;
    introduction: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave?: string[];
    benefits: string[];
    salary?: SalaryInfo;
    applicationInfo: ApplicationInfo;
    publishedAt?: string;
    expiresAt?: string;
}

export type EmploymentType =
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'freelance'
    | 'internship'
    | 'apprenticeship';

export interface SalaryInfo {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
    isNegotiable: boolean;
}

export interface ApplicationInfo {
    email?: string;
    phone?: string;
    applyUrl?: string;
    contactPerson?: string;
    deadline?: string;
}

// Payment Types
export interface PaymentInfo {
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
    amount: number;
    currency: string;
    method: 'stripe' | 'invoice' | 'sepa';
    stripePaymentId?: string;
    invoiceNumber?: string;
    invoiceUrl?: string;
    paidAt?: string;
}

// Billing Types
export interface BillingInfo {
    companyName: string;
    vatId?: string;
    address: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    email: string;
}

// Webhook Types
export interface MakeWebhookPayload {
    leadId: string;
    companyUrl: string;
    jobTitle: string;
    contactEmail: string;
    contactPhone?: string;
    planType: 'free' | 'premium';
    callbackUrl: string;
}

export interface MakeStatusPayload {
    leadId: string;
    status: LeadStatus;
    message: string;
    progress: number;
    data?: Partial<Lead>;
}

export interface MakeCompletePayload {
    leadId: string;
    profile: CompanyProfile;
    jobAdvert?: JobAdvert;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Admin Dashboard Types
export interface DashboardStats {
    totalLeads: number;
    processingLeads: number;
    completedLeads: number;
    publishedLeads: number;
    totalRevenue: number;
    conversionRate: number;
}

export interface LeadFilter {
    status?: LeadStatus;
    planType?: 'free' | 'premium';
    dateFrom?: string;
    dateTo?: string;
    search?: string;
}
