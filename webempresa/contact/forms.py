from django import forms

class ContactForm(forms.Form):

    name = forms.CharField(label="Nombre",required=True,widget=forms.TextInput(
        attrs={'class' :'form-control','placeholder':'Escribe tu nombre '}
    ))

    dir = forms.CharField(label="Celular",required=True,widget=forms.TextInput(
        attrs={'class' :'form-control','placeholder':'Escribe tu dirección'}
    ),min_length=3,max_length=15)
    cel = forms.CharField(label="Celular",required=True,widget=forms.TextInput(
        attrs={'class' :'form-control','placeholder':'Escribe tu celular'}
    ),min_length=3,max_length=15)
    email = forms.EmailField(label="Email",required=True,widget=forms.TextInput(
        attrs={'class' :'form-control','placeholder':'Escribe tu email  '}
    ))
    content = forms.CharField(label="Contenido",required=True,widget=forms.Textarea(
         attrs={'class' :'form-control', 'rows': 5, 'placeholder':'Escribe el mensaje '}
    )) 
     