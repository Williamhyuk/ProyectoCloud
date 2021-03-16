const loggedOutLinks=document.querySelectorAll('.logged-out')
const loggedInLinks=document.querySelectorAll('.logged-in')

//SignUp
const signupForm= document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email= document.querySelector('#signup-email').value;
    const password= document.querySelector('#signup-password').value;

    console.log(email,password)

    auth.createUserWithEmailAndPassword(email,password)
        .then(userCredential =>{
            //clear the form
            signupForm.reset();
            //close the mode
            $('#SignUpModal').modal('hide');
            location='index.html'
            console.log('sing up');

        }).catch(error =>{
            console.error(error);
        })
 });

 //SignIn
 const signinForm = document.querySelector('#login-form')

 signinForm.addEventListener('submit',e=>{
     e.preventDefault();
    const email= document.querySelector('#login-email').value;
    const password= document.querySelector('#login-password').value;
     console.log(email,password)
     auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredential =>{
            //clear the form
            signinForm.reset();
            //close the model
            $('#SignInModal').modal('hide');
            location='index.html'
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
const googleButton =document.querySelector('#googleLogin')
googleButton.addEventListener('click', (e) =>{
    //console.log('click google')
    e.preventDefault();
    signinForm.reset();
    $("#signInModal").modal("hide");

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        var user= result.user;
        console.log(result);
    console.log("google sign in");
  })
    .catch(err=>{
    console.log(err);
    })
});

//Facebook Login
const facebookButton =document.querySelector('#facebookLogin')
facebookButton.addEventListener('click',e=>{
    e.preventDefault();
    signinForm.reset();
    $("#signinModal").modal("hide");
    console.log('Facebook login');

    const provider=new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(result=>{
            console.log(result);
            console.log("facebook sign in");

        })
        .catch(err=>{
            console.log(err);
        })

})


// Posts
const postList = document.querySelector('.posts');
const setupPosts = data=>{
    if(data.length){
        let html ='';
        data.forEach(doc => {
            const post=doc.data()
            console.log(post)
            const li = `
            <li class="list-group-item list-group-item-action">
              <h5>${post.description}</h5>
              <p>${post.title}</p>
            </li>
          `;
            html += li;
        }); 
        postList.innerHTML =html;
    } else{
        postList.innerHTML = '<p class="text-center">Inicie Sesión o Registrese para Ingresar</p>';
    }
};

//AgregarLibro
const db=firebase.firestore()
const taskForm =document.getElementById('task-form');


taskForm.addEventListener('submit',async e=>{//capturamos lo que escribamos en el cuadro
    e.preventDefault();

    const title=taskForm['task-title'].value;
    const autor=taskForm['task-autor'].value;
    const year=taskForm['task-year'].value;
    
    await db.collection('libros').doc().set({
        title:title,
        autor:autor,
        year:year,
        //title;
        //description;
    })

    console.log(title,autor,year)
});

//Consultar libro
/** 
    const taskFormConsult =document.getElementById('task-consult');


db.collection("libros").doc("libros").onSnapshot((querySelector)=>{
        doc.querySelector(){
            console.log(`${doc.id}=> ${doc.data().title}`);
    }
})
*/



const taskFormConsult =document.getElementById('task-consult');

taskFormConsult.addEventListener('submit',async e=>{//capturamos lo que escribamos en el cuadro
    e.preventDefault();
    const title=taskFormConsult['task-title-consult'].value;

    
const query = await db
      .collection('libros')
      .where('title', '==', title)//si coincide con el titulo obtenga el documento
      .get();

tablaConsul.innerHTML=''; 
query.forEach(querySnapshot => {
    console.log(querySnapshot.data().autor)
    
    tablaConsul.innerHTML+=
    `
    <tr>
    <td>${querySnapshot.data().title}</td>
    <td>${querySnapshot.data().autor}</td>
    <td>${querySnapshot.data().year}</td>
    </tr>
    `
    /*<th scope="row">${querySnapshot.data().id}</th>*/
    })

})

//Leer Documentos

/**db.collection("libros").doc("SF")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });
**/
var tabla =document.getElementById('tabla');//guardamos los elemntos dentro de tabla
//db.collection("libros").get().then((querySelector)=>{//snapshot cada ves que haga cambio lo replicara en la web
db.collection("libros").onSnapshot((querySelector)=>{
tabla.innerHTML='';
    querySelector.forEach((doc)=>{
        console.log(`${doc.id}=> ${doc.data().title}`);
        tabla.innerHTML+=`
        <tr>
        <td>${doc.data().title}</td>
        <td>${doc.data().autor}</td>
        <td>${doc.data().year}</td>        
        </tr>
        `
        /*<th scope="row">${doc.id}</th>*/
    });
});


//Events
//list for auth state changes
auth.onAuthStateChanged(user => {
    if(user){
       // console.log('auth: signin')
       fs.collection('posts')
       .get()
       .then((snapshot)=>{
           setupPosts(snapshot.docs)
           loginCheck(user);//cadavez que el estado cambie se verificara
       })
 
    } else{
        //console.log('auth: sign out')
        setupPosts([])
        loginCheck(user);

    }
})


const loginCheck=user =>{
    if(user){
        loggedOutLinks.forEach(link=>link.style.display='none')
        loggedInLinks.forEach(link=>link.style.display='block')
    }else{
        loggedOutLinks.forEach(link=>link.style.display='block')
        loggedInLinks.forEach(link=>link.style.display='none')
    }
}



