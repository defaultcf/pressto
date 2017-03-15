from django.shortcuts import render
from django.http import HttpResponse

from .forms import FileUploadForm

def index(request):
    return render(request, 'media/index.html')

def post(request):
    if request.method == 'POST':
        form = FileUploadForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            print('valid form')
        else:
            print('invalid form')
            print(form.errors)
    return HttpResponse('/ingest/')
