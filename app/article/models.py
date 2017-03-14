from django.db import models

class Tirac(models.Model):
    subject = models.CharField(max_length=100)
    body = models.CharField(max_length=1000)

    def __str__(self):
        return self.subject


class Score(models.Model):
    tirac = models.ForeignKey(Tirac)
    title = models.CharField(max_length=100)
    data = models.CharField(max_length=1000, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    tirac = models.ForeignKey(Tirac, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
