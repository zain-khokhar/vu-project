import { NextResponse } from 'next/server';
import { getCommentStatsAdmin } from '@/actions/comments';

export async function GET() {
    try {
        const result = await getCommentStatsAdmin();

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in comment stats API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
