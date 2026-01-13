import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/webhook/complete
 * Receives completed profile and job advert data from Make.com
 */
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        console.log('Received completion data from Make.com:', payload);

        // Validate required fields
        if (!payload.leadId) {
            return NextResponse.json(
                { error: 'Missing required field: leadId' },
                { status: 400 }
            );
        }

        // Expected payload structure:
        // {
        //   leadId: string,
        //   profile: {
        //     companyName: string,
        //     logo: string (URL),
        //     aboutText: string,
        //     brandColors: { primary: string, secondary: string },
        //     values: string[],
        //     benefits: string[],
        //     contact: { email, phone, website },
        //     address: { city, country, fullAddress },
        //     images: string[] (URLs)
        //   },
        //   jobAdvert: {
        //     title: string,
        //     location: string,
        //     employmentType: string,
        //     introduction: string,
        //     responsibilities: string[],
        //     requirements: string[],
        //     benefits: string[],
        //     applicationInfo: { email, phone }
        //   }
        // }

        // In production, you would:
        // 1. Store the generated content in your database
        // 2. Update lead status to 'complete'
        // 3. Send notification email to the lead
        // 4. Notify sales team

        return NextResponse.json({
            success: true,
            message: 'Profile generation completed',
            data: {
                leadId: payload.leadId,
                previewUrl: `${process.env.NEXT_PUBLIC_APP_URL}/preview/${payload.leadId}`,
                timestamp: new Date().toISOString(),
            },
        });

    } catch (error) {
        console.error('Error processing completion webhook:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/webhook/complete
 * Health check endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        endpoint: 'Complete Webhook',
        timestamp: new Date().toISOString(),
    });
}
