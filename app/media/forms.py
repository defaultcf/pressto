from django import forms

class FileUploadForm(forms.Form):
    file_source = forms.FileField()

class IineForm(forms.Form):
    user_id = forms.CharField()
    tirac_id = forms.CharField()
