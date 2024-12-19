from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# _____________________________________________________
class user(models.Model):
    first_name=models.CharField(max_length=100)
    family_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)

class Property(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    property_type = models.CharField(max_length=50, choices=[('house', 'House'), ('apartment', 'Apartment')])
    area = models.DecimalField(max_digits=10, decimal_places=2)
    contact_info = models.EmailField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_properties')
    photo = models.ImageField(upload_to='property_photos/', blank=True, null=True)
    likes_count = models.IntegerField(default=0)
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='purchased_properties')
    transaction_status = models.CharField(max_length=20, choices=[('a vendre', 'a vendre'), ('vendue', 'vendue')], default='vendre')

    def __str__(self):
        return self.title
#  ____________________________________________________________

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'property')

    def __str__(self):
        return f'{self.user.username} liked {self.property.title}'
# _____________________________________________________________________

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.property.title}'
# ____________________________________________________________

class SavedPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'property')

    def __str__(self):
        return f'{self.user.username} saved {self.property.title}'
# _______________________________________________________________________________


class Alert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alerts')  # The user who creates the alert
    location = models.CharField(max_length=255)
    property_type = models.CharField(max_length=255)
    min_price = models.DecimalField(max_digits=10, decimal_places=2)  # Minimum price
    max_price = models.DecimalField(max_digits=10, decimal_places=2)  # Maximum price
    area = models.IntegerField()  # Area in square meters

    def __str__(self):
        return f"Alert for {self.user.username} - {self.property_type} in {self.location}"
