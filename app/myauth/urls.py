from django.conf.urls import url
from django.contrib.auth.views import logout

from . import views

app_name = 'myauth'
urlpatterns = [
    url(r'^login$', views.login, name='login'),
    url(r'^logout$', logout, name='logout'),
    url(r'^setting$', views.setting, name='setting'),
]
