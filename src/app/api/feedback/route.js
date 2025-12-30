import { createFeedback } from '@/actions/feedback';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name?.trim()) {
      return Response.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    
    if (!data.description?.trim()) {
      return Response.json({ success: false, error: 'Feedback description is required' }, { status: 400 });
    }

    // Prepare feedback data
    const feedbackData = {
      name: data.name.trim(),
      description: data.description.trim(),
    };

    // Add contact info if provided
    if (data.contact?.trim() && data.contactType) {
      feedbackData.contact = `${data.contactType}: ${data.contact.trim()}`;
    }

    const result = await createFeedback(feedbackData);

    if (result.success) {
      return Response.json({ 
        success: true, 
        message: 'Feedback submitted successfully',
        id: result.feedback._id 
      });
    } else {
      return Response.json({ 
        success: false, 
        error: result.error || 'Failed to submit feedback' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Feedback API error:', error);
    return Response.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}