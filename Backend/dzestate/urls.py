"""
URL configuration for my_final_version_of_the_gl_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp import views
# urlpatterns = [
#     path('add_property/', views.add_property, name='add_property'),
#     path('delete_property/<int:property_id>/', views.delete_property, name='delete_property'),
#     path('add_comment/', views.add_comment, name='add_comment'),
#     path('add_like/<int:property_id>/', views.add_like, name='add_like'),
#     path('save_post/<int:property_id>/', views.save_post, name='save_post'),
#     path('mark_as_sold/<int:property_id>/', views.mark_as_sold, name='mark_as_sold'),
#     # path('assign_buyer/<int:property_id>/', views.assign_buyer, name='assign_buyer'),
# ]

urlpatterns = [
    path('api/add_property/', views.add_property, name='add_property'),
    path('api/delete_property/<int:property_id>/', views.delete_property, name='delete_property'),
    path('api/add_comment/', views.add_comment, name='add_comment'),
    path('api/add_like/<int:property_id>/', views.add_like, name='add_like'),
    path('api/save_post/<int:property_id>/', views.save_post, name='save_post'),
    path('api/mark_as_sold/<int:property_id>/', views.mark_as_sold, name='mark_as_sold'),
]
