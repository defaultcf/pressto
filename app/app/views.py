from django.shortcuts import render, reverse, redirect

def index(request):
    return redirect(reverse("article:index"))
