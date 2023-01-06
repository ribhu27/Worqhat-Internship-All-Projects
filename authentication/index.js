var db=firebase.firestore();

let submitButton = document.getElementById("signUp");

document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("welcome.html")
    }
})

function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function clearForm() {
    document.getElementById("clearFrom").reset();
}

function signUp(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((cred) => {
        console.log(cred);
        db.collection('Application').doc(cred.user.uid).set({ 
            email: email,
            password: password,
        })
        .then(() => {
          console.log('User added successfully!!!!');
        });
    })

    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
        console.log(error);
    })

            clearForm()
    }

function forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}
