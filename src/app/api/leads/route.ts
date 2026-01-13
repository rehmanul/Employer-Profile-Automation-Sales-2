import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/leads
 * Get all leads (for admin dashboard)
 */
export async function GET(request: NextRequest) {
    try {
        // In production, this would query your database
        // For now, return empty array - leads are stored in localStorage on client

        return NextResponse.json({
            success: true,
            data: [],
            message: 'Leads are managed client-side in localStorage for this demo',
        });

    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/leads
 * Create a new lead
 */
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        // Validate required fields
        if (!payload.companyUrl || !payload.jobTitle || !payload.contactEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate lead ID
        const leadId = `lead_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;

        // In production, you would:
        // 1. Save lead to database
        // 2. Trigger Make.com webhook
        // 3. Return lead ID

        return NextResponse.json({
            success: true,
            data: {
                id: leadId,
                ...payload,
                status: 'pending',
                createdAt: new Date().toISOString(),
            },
        });

    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
