from django.shortcuts import render
from django.http import HttpResponse

from .models import Tirac

def index(request):
    return render(request, 'article/index.html')


def create(request):
    if request.POST:
        subject = request.POST['subject']
        body = request.POST['body']
        if subject and body:
            tirac = Tirac(subject=subject, body=body)
            tirac.save()
            return render(request, 'article/create.html', {
                'message': "追加しました"
            })
        else:
            context = {
                'error': "必須項目が入力されていません"
            }
        return render(request, 'article/create.html', context)

    return render(request, 'article/create.html')
