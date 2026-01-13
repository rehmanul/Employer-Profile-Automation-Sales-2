import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/webhook/status
 * Receives status updates from Make.com during lead processing
 */
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        console.log('Received status update from Make.com:', payload);

        // Validate required fields
        if (!payload.leadId || !payload.status) {
            return NextResponse.json(
                { error: 'Missing required fields: leadId, status' },
                { status: 400 }
            );
        }

        // Validate status enum
        const validStatuses = [
            'pending', 'processing', 'scraping', 'analyzing',
            'generating', 'complete', 'published', 'failed'
        ];

        if (!validStatuses.includes(payload.status)) {
            return NextResponse.json(
                { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
                { status: 400 }
            );
        }

        // In production, you would:
        // 1. Update the lead status in your database
        // 2. Broadcast the update to connected clients via WebSocket/SSE
        // 3. Send email notifications if configured

        // For now, we log and return success
        // The frontend polls or uses localStorage as a simple state store

        return NextResponse.json({
            success: true,
            message: 'Status update received',
            data: {
                leadId: payload.leadId,
                status: payload.status,
                timestamp: new Date().toISOString(),
            },
        });

    } catch (error) {
        console.error('Error processing status webhook:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/webhook/status
 * Health check endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        endpoint: 'Status Webhook',
        timestamp: new Date().toISOString(),
    });
}
