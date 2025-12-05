import { NextResponse } from 'next/server';
import { deleteDocumentAdmin } from '@/actions/admin';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const result = await deleteDocumentAdmin(id);

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
