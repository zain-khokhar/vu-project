import { NextResponse } from 'next/server';
import { getAllCommentsAdmin } from '@/actions/comments';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const status = searchParams.get('status') || 'all';
        const search = searchParams.get('search') || '';

        const result = await getAllCommentsAdmin(page, limit, status, search);

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in admin comments API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
