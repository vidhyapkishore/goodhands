# Import necessary modules and functions 
from django.core.mail import send_mail
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

# Use CSRF exempt decorator to allow cross-site requests via POST method 
@csrf_exempt
def contact_view(request):
    # Check if the request method is POST
    if request.method == 'POST':        
        # Load the JSON data from body of the incoming request 
        data = json.loads(request.body)
        # Retrieve parameters from incomed JSON data
        receiving_email = data.get('receiving_email')
        senders_email = data.get('senders_email')
        content_email = data.get('content_email')
        subject_line = data.get('subject_line')  # new line to get the subject from the POST request
        
        # Send mail with given data
        send_mail(
            subject_line,  # modify the subject line
            content_email, # message 
            senders_email, # sender's email
            [receiving_email],  # replace with the recipient email address
            fail_silently=False,
        )
        # Return successful message in JSON format
        return JsonResponse({'success': True})
    # Return failure result if there are no successful POST requests
    return JsonResponse({'success': False})