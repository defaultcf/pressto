from django.contrib import admin

from .models import Tirac, Score, Comment

class ScoreInline(admin.StackedInline):
    model = Score
    extra = 1

class CommentInline(admin.StackedInline):
    model = Comment
    extra = 3

class TiracAdmin(admin.ModelAdmin):
    field = ['subject', 'body']
    inlines = [ScoreInline, CommentInline]

admin.site.register(Tirac, TiracAdmin)
