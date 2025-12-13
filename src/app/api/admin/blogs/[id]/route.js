import { NextResponse } from 'next/server';
import { deleteBlogAdmin } from '@/actions/admin';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const result = await deleteBlogAdmin(id);

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
