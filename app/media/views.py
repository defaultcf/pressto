from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'media/index.html')

def post(request):
    if request.POST:
        img = request.POST['img']
        print(dir(img))
        return img
    else:
        return HttpResponse("Hello, media!")
