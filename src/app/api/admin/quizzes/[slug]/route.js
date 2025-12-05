import { NextResponse } from 'next/server';
import { deleteQuizAdmin } from '@/actions/admin';

export async function DELETE(request, { params }) {
    try {
        const { slug } = params;

        const result = await deleteQuizAdmin(slug);

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
