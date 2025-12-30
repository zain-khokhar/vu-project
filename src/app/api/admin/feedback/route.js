import { getFeedback, updateFeedbackStatus, deleteFeedback, getFeedbackStats } from '@/actions/feedback';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';

    const filters = {};
    if (status && status !== 'all') {
      filters.status = status;
    }
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { contact: { $regex: search, $options: 'i' } }
      ];
    }

    const result = await getFeedback({ page, limit, status, search });
    
    if (result.success) {
      return Response.json({
        success: true,
        feedbacks: result.feedback,
        currentPage: result.pagination.currentPage,
        totalPages: result.pagination.totalPages,
        totalCount: result.pagination.totalCount
      });
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }

  } catch (error) {
    console.error('Admin feedback API error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}