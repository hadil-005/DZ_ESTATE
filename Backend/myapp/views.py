from django.shortcuts import render 
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import Property, Comment, Like, SavedPost, user , Alert
# Create your views here.
# ________________________________________________
@csrf_exempt
@login_required
def add_property(request):
    if request.method == "POST":
        CSRF_COOKIE_HTTPONLY = True
        CSRF_COOKIE_SECURE = True
        # Get data from the request
        data = {field: request.POST.get(field) for field in ['title', 'description', 'price', 'location', 'property_type', 'num_bedrooms', 'num_bathrooms', 'area', 'contact_info']}
        photo = request.FILES.get('photo')
        
        # Assign the owner from the logged-in user
        data['owner'] = request.user
        
        # Create a new property instance
        property = Property.objects.create(**data, photo=photo)
        
        return JsonResponse({'message': 'Property added successfully.'})

    return JsonResponse({'error': 'Invalid method'}, status=400)


def delete_property(request, property_id):
    if request.method == "POST":
        property = get_object_or_404(Property, id=property_id)
        
        if property.owner == request.user:
            property.delete()
            return JsonResponse({"message": "Property deleted successfully"})
        else:
            return JsonResponse({"message": "You do not have permission to delete this property"}, status=403)
# __________________________________________________

def add_comment(request):
    if request.method == "POST":
        content = request.POST.get('content')
        
        if not content:
            return JsonResponse({"message": "Content cannot be empty"}, status=400)

        comment = Comment.objects.create(user=request.user, content=content)
        
        # if request.method == 'POST':
        # #form = Top_List_Form(request.POST)
        #    return HttpResponse("Do something") # methods must return HttpResponse
        # else:
        #     top_list = Top_List.objects.all().order_by('total_steps').reverse()
        # #output = ''.join([(t.name+'\t'+str(t.total_steps)+'\n') for t in top_list])
        #     return render(request,'steps_count/index.html',{'top_list': top_list})

        return JsonResponse({
            "message": "Comment added successfully", 
            "comment_id": comment.id, 
            "content": content, 
            "user": request.user.username,
            "created_at": comment.created_at
        })
#__________________________________________________________
def add_like(request, property_id):
    if request.method == "POST":
        property = get_object_or_404(Property, id=property_id)
        user = request.user
        
        if Like.objects.filter(user=user, property=property).exists():
            return JsonResponse({"message": "You have already liked this property"}, status=400)
        
        like = Like.objects.create(user=user, property=property)
        property.likes_count += 1
        property.save()
        
        return JsonResponse({"message": "Like added successfully"})
# _________________________________________________________________
def save_post(request, property_id):
    if request.method == "POST":
        property = get_object_or_404(Property, id=property_id)
        user = request.user
        
        if SavedPost.objects.filter(user=user, property=property).exists():
            return JsonResponse({"message": "You have already saved this property"}, status=400)
        
        saved_post = SavedPost.objects.create(user=user, property=property)
        
        return JsonResponse({"message": "Post saved successfully"})
# __________________________________________________________________
def mark_as_sold(request, property_id):
    if request.method == "POST":
        property = get_object_or_404(Property, id=property_id)
        
        if property.owner == request.user:
            property.transaction_status = 'vendue'
            property.save()
            return JsonResponse({"message": "Property marked as sold"})
        else:
            return JsonResponse({"message": "You do not have permission to mark this property as sold"}, status=403)
# ____________________________________________
def assign_buyer(request, property_id):
    if request.method == "POST":
        property = get_object_or_404(Property, id=property_id)
        buyer_name = request.POST.get('buyer_name') 
        
        if not buyer_name:
            return JsonResponse({"message": "Buyer name is required"}, status=400)

        buyer = user.objects.filter(username=buyer_name).first()
        
        if not buyer:
            return JsonResponse({"message": "Buyer not found"}, status=404)
        
        if property.owner == request.user:
            if property.transaction_status == 'vendue':
                return JsonResponse({"message": "This property has already been sold"}, status=400)
            
            property.buyer = buyer
            property.transaction_status = 'vendue'
            property.save()
            
            return JsonResponse({"message": "Buyer assigned successfully and property marked as sold"})
        else:
            return JsonResponse({"message": "You do not have permission to assign a buyer to this property"}, status=403)
# _________________________________________________________
from django.core.mail import send_mail

def add_Alert(request):
    if request.method == "POST":
        data = {field: request.POST.get(field) for field in ['title', 'description', 'price', 'location', 'property_type', 'num_bedrooms', 'num_bathrooms', 'area', 'contact_info']}
        photo = request.FILES.get('photo')
        data['owner'] = request.user
        
        # Create the property
        property = Property.objects.create(**data, photo=photo)

        # Check for matching alerts
        alerts = Alert.objects.filter(
            location=property.location,
            property_type=property.property_type,
            min_price__lte=property.price,
            max_price__gte=property.price
        )

        for alert in alerts:
            # Notify the user via email (or any preferred method)
            send_mail(
                subject="New Property Match Alert!",
                message=f"A new property matching your alert has been added. Details:\n{property.description}",
                from_email="noreply@yourwebsite.com",
                recipient_list=[alert.user.email],
            )

        return JsonResponse({'message': 'Property added successfully.'})

    return JsonResponse({'error': 'Invalid method'}, status=400)
