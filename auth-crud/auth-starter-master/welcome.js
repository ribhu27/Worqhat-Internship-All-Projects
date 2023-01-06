var db=firebase.firestore();

firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email
        }
    })

function logout(){
    firebase.auth().signOut()
}
   
let submitButton = document.getElementById("crud");

function crud(){
    firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                location.replace("index2.html")
            }
        })
    .then(()=>{
        location.replace("index2.html")
    })
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

