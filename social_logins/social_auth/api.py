from django.apps import apps as django_apps
from django.conf import settings
from django.contrib import auth
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication

class SocialLogAPIView(APIView):
    """
        Logs in the User, who had come through FB,Google login
        post : {'email':email_address of the user}
    """
    authentication_classes = (SessionAuthentication, )
    first_name = None
    last_name = None

    def create_user(self,data):
        user = django_apps.get_model(settings.AUTH_USER_MODEL)()
        username = data["email"]
        user.username = username
        user.email = data["email"].strip()
        user.set_unusable_password()
        if 'googleID' in self.request.data:# this case is for google login
            if self.request.data['name'].split(' ')[:1]:
                self.first_name = self.request.data['name'].split(' ')[:1][0]
            if self.request.data['name'].split(' ')[1:]:
                self.last_name = self.request.data['name'].split(' ')[1:][0]
        else: # this case is for facebook login
            self.first_name = self.request.data['first_name']
            self.last_name = self.request.data['last_name']
        user.first_name = self.first_name
        user.last_name = self.last_name
        user.save()
        return user

    def register_candidate(self,request):
        self.created_user = self.create_user(request.data)
        self.created_user.is_active = True
        self.created_user.save()
        self.login_user(self.created_user)

    def post(self, request, *args, **kw):
        self.kwargs = kw
        data = self.request.data
        email = data['email']
        requested_user = User.objects.filter(email=email)
        if requested_user:
            self.login_user(requested_user[0])
        else:
            self.register_candidate(request)
        return Response({
            'success':True,
        },status=status.HTTP_200_OK)

    def login_user(self,user):
        from django.contrib.auth import login
        login(self.request, user, backend=settings.AUTHENTICATION_BACKENDS[0]) # for django 1.10