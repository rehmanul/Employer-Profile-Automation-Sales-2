import { z } from 'zod';

// URL validation with proper format checking
const urlSchema = z.string()
    .min(1, 'Website URL ist erforderlich')
    .refine((val) => {
        try {
            // Add https:// if no protocol specified
            const urlToTest = val.startsWith('http') ? val : `https://${val}`;
            new URL(urlToTest);
            return true;
        } catch {
            return false;
        }
    }, 'Bitte geben Sie eine gültige URL ein');

// Email validation
const emailSchema = z.string()
    .min(1, 'E-Mail ist erforderlich')
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein');

// Phone validation (optional, German format)
const phoneSchema = z.string()
    .optional()
    .refine((val) => {
        if (!val) return true;
        // Allow various phone formats
        const cleaned = val.replace(/[\s\-\(\)]/g, '');
        return /^(\+49|0049|0)?[1-9]\d{6,14}$/.test(cleaned);
    }, 'Bitte geben Sie eine gültige Telefonnummer ein');

// Lead Form Schema
export const leadFormSchema = z.object({
    companyUrl: urlSchema,
    jobTitle: z.string()
        .min(3, 'Jobtitel muss mindestens 3 Zeichen haben')
        .max(100, 'Jobtitel darf maximal 100 Zeichen haben'),
    contactEmail: emailSchema,
    contactPhone: phoneSchema,
    planType: z.enum(['free', 'premium']),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;

// Billing Form Schema
export const billingFormSchema = z.object({
    companyName: z.string()
        .min(2, 'Firmenname ist erforderlich')
        .max(200, 'Firmenname darf maximal 200 Zeichen haben'),
    vatId: z.string()
        .optional()
        .refine((val) => {
            if (!val) return true;
            // EU VAT ID format (simplified)
            return /^[A-Z]{2}[A-Z0-9]{2,12}$/.test(val.replace(/\s/g, '').toUpperCase());
        }, 'Ungültige USt-IdNr. Format'),
    street: z.string().min(3, 'Straße ist erforderlich'),
    city: z.string().min(2, 'Stadt ist erforderlich'),
    postalCode: z.string()
        .min(4, 'PLZ ist erforderlich')
        .max(10, 'Ungültige PLZ'),
    country: z.string().min(2, 'Land ist erforderlich'),
    email: emailSchema,
});

export type BillingFormSchema = z.infer<typeof billingFormSchema>;

// Profile Edit Schema
export const profileEditSchema = z.object({
    companyName: z.string().min(2, 'Firmenname ist erforderlich'),
    aboutText: z.string()
        .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
        .max(2000, 'Beschreibung darf maximal 2000 Zeichen haben'),
    values: z.array(z.string()).min(1, 'Mindestens ein Wert ist erforderlich'),
    benefits: z.array(z.string()).min(1, 'Mindestens ein Benefit ist erforderlich'),
});

export type ProfileEditSchema = z.infer<typeof profileEditSchema>;

// Job Advert Edit Schema
export const jobAdvertEditSchema = z.object({
    title: z.string().min(5, 'Jobtitel ist erforderlich'),
    location: z.string().min(2, 'Standort ist erforderlich'),
    employmentType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'apprenticeship']),
    introduction: z.string()
        .min(50, 'Einleitung muss mindestens 50 Zeichen haben')
        .max(1000, 'Einleitung darf maximal 1000 Zeichen haben'),
    responsibilities: z.array(z.string()).min(3, 'Mindestens 3 Aufgaben sind erforderlich'),
    requirements: z.array(z.string()).min(2, 'Mindestens 2 Anforderungen sind erforderlich'),
    niceToHave: z.array(z.string()).optional(),
    benefits: z.array(z.string()).min(2, 'Mindestens 2 Benefits sind erforderlich'),
});

export type JobAdvertEditSchema = z.infer<typeof jobAdvertEditSchema>;

// Helper function to normalize URL
export function normalizeUrl(url: string): string {
    let normalized = url.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
        normalized = `https://${normalized}`;
    }
    // Remove trailing slash
    return normalized.replace(/\/$/, '');
}

// Helper to format phone number
export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('0049')) {
        return '+49' + cleaned.slice(4);
    }
    if (cleaned.startsWith('0')) {
        return '+49' + cleaned.slice(1);
    }
    return cleaned;
}
