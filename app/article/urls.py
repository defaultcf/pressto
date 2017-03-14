from django.conf.urls import url

from . import views

app_name = 'article'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create$', views.create, name='create'),
    url(r'^(?P<tirac_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^(?P<tirac_id>[0-9]+)/comment$', views.comment, name='comment'),
]
