from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

from .models import Tirac

def index(request):
    tirac_list = Tirac.objects.all()
    context = {
        'tirac_list': tirac_list,
    }
    return render(request, 'article/index.html', context)


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


def detail(request, tirac_id):
    tirac = get_object_or_404(Tirac, pk=tirac_id)
    return render(request, 'article/detail.html', {'tirac':tirac})
