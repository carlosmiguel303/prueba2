from django.shortcuts import render,redirect
from django.urls import reverse 
from django.core.mail import EmailMessage
from .forms import ContactForm
# Create your views here.

def contact(request):
   
    contact_form = ContactForm()
    if request.method == "POST":
        contact_form = ContactForm(data=request.POST)
        if contact_form.is_valid():

          name    = request.POST.get('name','')
          email   = request.POST.get('email','')
          content = request.POST.get('content','')
          cel     = request.POST.get('cel','')
          dir   = request.POST.get('dir','')

         #Enviamos el correo y direccionamos
          email = EmailMessage(
          "Vidrieria PEPE :Nuevo mensaje de contacto ",
          "De {} <{}>\n\nDatos:\n\n{} <{}> <{}> ".format( name , email  ,content , cel ,dir ),
          "no-contestar@inbox.mailtrap.io",
          ["vidrieriapepe@gmail.com"],
          reply_to=[email]


         )

        try:
           email.send()
           return redirect(reverse('contact')+"?ok")
        except:
           return redirect(reverse('contact')+"?fail")







    return render(request,"contact/contact.html",{'form':contact_form})
   
