import { getFeedbackStats } from '@/actions/feedback';

export async function GET(request) {
  try {
    const result = await getFeedbackStats();
    
    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }

  } catch (error) {
    console.error('Feedback stats API error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}