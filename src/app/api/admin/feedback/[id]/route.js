import { updateFeedbackStatus, deleteFeedback } from '@/actions/feedback';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!['pending', 'reviewed', 'resolved'].includes(status)) {
      return Response.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const result = await updateFeedbackStatus(id, status);

    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }

  } catch (error) {
    console.error('Update feedback status API error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const result = await deleteFeedback(id);

    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }

  } catch (error) {
    console.error('Delete feedback API error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}