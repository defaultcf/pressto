from django.db import models
from django.contrib.auth.models import User

class Tirac(models.Model):
    user = models.ForeignKey(User, null=True)
    subject = models.CharField(max_length=100)
    body = models.CharField(max_length=10000)
    md = models.CharField(max_length=30000)
    header_img = models.CharField(max_length=100)

    def __str__(self):
        return self.subject


class Score(models.Model):
    tirac = models.ForeignKey(Tirac)
    title = models.CharField(max_length=100)
    data = models.CharField(max_length=1000, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, null=True)
    tirac = models.ForeignKey(Tirac, on_delete=models.CASCADE)
    text = models.CharField(max_length=5000)
    audio = models.CharField(max_length=100)


class Iine(models.Model):
    user = models.ForeignKey(User)
    tirac = models.ForeignKey(Tirac, on_delete=models.CASCADE)


class Tags(models.Model):
    tagname = models.CharField(max_length=100, unique=True)


class SetTag(models.Model):
    tirac = models.ForeignKey(Tirac, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tags, on_delete=models.CASCADE)
