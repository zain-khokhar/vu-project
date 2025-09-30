import { NextResponse } from 'next/server';
import { getComments } from '@/actions/comments';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');
    const page = parseInt(searchParams.get('page')) || 1;
    
    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const result = await getComments(documentId, page);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in comments API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}