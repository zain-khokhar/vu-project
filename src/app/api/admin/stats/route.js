import { NextResponse } from 'next/server';
import { getAdminStats } from '@/actions/admin';

export async function GET() {
    try {
        const result = await getAdminStats();

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in admin stats API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
