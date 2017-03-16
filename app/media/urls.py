from django.conf.urls import url

from . import views

app_name = 'media'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^post$', views.post, name='post'),
    url(r'^iine$', views.iine, name='iine'),
]
