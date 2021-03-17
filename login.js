const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

//SignUp
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    console.log(email, password)

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            //clear the form
            signupForm.reset();
            //close the mode
            $('#SignUpModal').modal('hide');
            location = 'index.html'
            console.log('sing up');

        }).catch(error => {
            console.error(error);
        })
});

//SignIn
const signinForm = document.querySelector('#login-form')

signinForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    console.log(email, password)
    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            //clear the form
            signinForm.reset();
            //close the model
            firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    
                        $("#SignInModal").modal("hide");
                        if ($('.modal-backdrop').is(':visible')) {
                            $('body').removeClass('modal-open');
                            $('.modal-backdrop').remove();
                        };
                    
                }
        
        
            });
            //location = 'index.html'
            console.log('sing in');

        })
});

/*const logout = document.querySelector(`#logout`);
 
logout.addEventListener('click',e=>{
   e.preventDefault();
   auth.signOut().then(()=>{
       console.log('sign out');
   });
}); */

//Google Login
// el provider captara la solicitud hacia google
const googleButton = document.querySelector('#googleLogin')
googleButton.addEventListener('click', (e) => {
    //console.log('click google')
    e.preventDefault();
    signinForm.reset();
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            
                $("#SignInModal").modal("hide");
                if ($('.modal-backdrop').is(':visible')) {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                };
            
        }


    });

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        var user = result.user;
        console.log(result);
        console.log("google sign in");
    })
        .catch(err => {
            console.log(err);
        })
});

//Facebook Login
const facebookButton = document.querySelector('#facebookLogin')
facebookButton.addEventListener('click', e => {
    e.preventDefault();
    signinForm.reset();
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            
                $("#SignInModal").modal("hide");
                if ($('.modal-backdrop').is(':visible')) {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                };
            
        }


    });
    console.log('Facebook login');

    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        console.log(result);
        console.log("facebook sign in");

    })
        .catch(err => {
            console.log(err);
        })

})
// Twitter login
const twitterButton = document.querySelector('#twitterLogin')
twitterButton.addEventListener('click', (e) => {
    e.preventDefault();
    signinForm.reset();
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            
                $("#SignInModal").modal("hide");
                if ($('.modal-backdrop').is(':visible')) {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                };
            
        }


    });
    

    console.log('Twitter login');

    var provider = new firebase.auth.TwitterAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        console.log(result);
        console.log("twitter sign in");
    })
        .catch(err => {
            console.log(err);
        })

})