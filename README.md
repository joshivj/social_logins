# Facebook and Google Login SDK integration with Django. 

A simple Django API Project which can be used to authenticate users using social platforms like Google and Facebook. 

## Prerequisites : 
1) Before you can integrate Google Sign-In into your website, you must have a Google API Console project. You need to create a client ID, which will be used to call the google sign-in API.
   
   Follow this link : https://developers.google.com/identity/sign-in/web/devconsole-project
   
2) To implement Facebook Login, we need a Facebook App ID.

   Follow this link : https://developers.facebook.com/docs/facebook-login/web

## Requirements: 
* Django==1.10
* djangorestframework==3.6.3

## Installation :

1) Download the repository.
2) Create Virtual Environment for this project.
3) Activate virtual environment and then install requirements.
4) Type ```python manage.py migrate``` on terminal to load initial migrations.
5) Replace ```{Please_use_your_clientID}``` with your google client ID in [index.html](https://github.com/joshivj/social_logins/blob/master/social_logins/templates/index.html) on line 5.
6) Replace ```{{ Please use your Facebook APP ID}}``` with your facebook App ID in [social_login.js](https://github.com/joshivj/social_logins/blob/master/social_logins/static/js/social_login.js) on line 85.

Now, you are good to go. Start the Django project by typing ```python manage.py runserver```.
