from django.shortcuts import render
from django.http import HttpResponse

import uuid, os, json
from .forms import FileUploadForm, IineForm

def index(request):
    return render(request, 'media/index.html')

def post(request):
    if request.method == 'POST':
        form = FileUploadForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            ext = "." + str(request.FILES['file_source']).rsplit(".", 1)[1]
            filepath = str(uuid.uuid4()) + ext
            updir = '/mnt/static/files/' + filepath
            destination = open(updir, 'wb+')
            upfile = request.FILES['file_source']
            for chunk in upfile.chunks():
                destination.write(chunk)
            destination.close()
            res = {
                "id": request.POST['id'],
                "name": request.POST['name'],
                "url": '/static/files/' + filepath
            }
            resJson = json.dumps(res, ensure_ascii=False)
            return HttpResponse(resJson)
        else:
            print('invalid form')
            print(form.errors)
    return HttpResponse("sender")


def iine(request):
    if request.method == 'POST':
        form = IineForm(data=request.POST)
        if form.is_valid():
            print("Success!")
        else:
            print("Faild...")

    return HttpResponse("Hello, Ajax!")
