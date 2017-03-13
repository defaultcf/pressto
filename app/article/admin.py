from django.contrib import admin

from .models import Tirac, Score

class ScoreInline(admin.StackedInline):
    model = Score
    extra = 1

class TiracAdmin(admin.ModelAdmin):
    field = ['subject', 'body']
    inlines = [ScoreInline]

admin.site.register(Tirac, TiracAdmin)
