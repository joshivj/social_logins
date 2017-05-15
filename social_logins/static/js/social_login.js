function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var post_data = {
        'googleID': profile.getId(),
        'email': profile.getEmail(),
        'profile_picture': profile.getImageUrl(),
        'name': profile.getName()
    };
    $.ajax({
        type: "POST",
        url: '/api/v1/sociallogin/',
        data: post_data,
        success: function () {
            // user is logged into django, now logout the google instance
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                window.location.href = '/';
            });

        },
        //dataType: 'json'
    });
    console.log('Successful login for: ' + profile.getName());
}
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    onSignIn(googleUser);
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 318,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });

    gapi.signin2.render('google-signup2', {
        'scope': 'profile email',
        'width': 328,
        'height': 45,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();

    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('Please log ' +
            'into this app.');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log('Please log ' +
            'into Facebook.');
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.

window.fbAsyncInit = function () {
    FB.init({
        appId: '151926802011690',
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    //FB.getLoginStatus(function (response) {
    //statusChangeCallback(response);
    //});

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?scope=email', 'GET', {fields: 'first_name,last_name,name,email,picture,id'}, function (response) {
        $.ajax({
            type: "POST",
            url: '/api/v1/sociallogin/',
            data: response,
            success: function () {
                // user is logged into django
                window.location.href = '/';
            },
            //dataType: 'json'
        });
        console.log('Successful login for: ' + response.name);
        console.log(
            'Thanks for logging in, ' + response.name + '!');
    });
}

function FBlogin() {
    FB.login(function (response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.

            testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.log('Please log ' +
                'into this app.');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            console.log('Please log ' +
                'into Facebook.');
        }

    }, {scope: 'email'});
}