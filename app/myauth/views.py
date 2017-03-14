from django.shortcuts import render
from django.http import HttpResponse

from django.contrib.auth.models import User

def login(request):
    return render(request, 'myauth/login.html')

def setting(request):
    if request.POST:
        user = User.objects.get(pk=request.user.id)
        user.profile.nickname = request.POST['nickname']
        user.profile.bio = request.POST['bio']
        user.save()

    return render(request, 'myauth/setting.html')
