from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.http import HttpResponse

from .models import Tirac, Comment

def index(request):
    tirac_list = Tirac.objects.all()
    context = {
        'tirac_list': tirac_list,
    }
    return render(request, 'article/index.html', context)


def create(request):
    if request.POST:
        user = request.user
        subject = request.POST['subject']
        body = request.POST['body']
        if subject and body:
            tirac = Tirac(user=user, subject=subject, body=body)
            tirac.save()
            context = {
                'message': "追加しました"
            }
        else:
            context = {
                'error': "必須項目が入力されていません"
            }
        return render(request, 'article/create.html', context)

    return render(request, 'article/create.html')


def detail(request, tirac_id):
    tirac = get_object_or_404(Tirac, pk=tirac_id)
    return render(request, 'article/detail.html', {'tirac':tirac})


def comment(request, tirac_id):
    if request.POST:
        user = request.user
        tirac = get_object_or_404(Tirac, pk=tirac_id)
        text = request.POST['text']
        if tirac and text:
            comment = Comment(user=user, tirac=tirac, text=text)
            comment.save()
            return redirect(reverse("article:detail", kwargs={'tirac_id':tirac_id}))

    return HttpResponse("エラー")
