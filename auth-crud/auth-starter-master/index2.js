var db=firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 

submitData.addEventListener('click', (e) => {
    var v_uid = document.getElementById('v_uid').value;
    var v_name = document.getElementById('v_name').value;
    var v_email = document.getElementById('v_email').value;
    var v_address = document.getElementById('v_address').value;
    var v_number = document.getElementById('v_number').value;

    db.collection("Voter").add({
        v_uid: v_uid,
        v_name: v_name,
        v_email: v_email,
        v_address: v_address,
        v_number: v_number
    })
    .then(() => {
            console.log("Voter added!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        alert('Voter added!');
});

//  updateData.addEventListener('click', (e) => {
//     var v_name = document.getElementById('v_name').value;
//     var v_email = document.getElementById('v_email').value;
//     var v_address = document.getElementById('v_address').value;
//     var v_number = document.getElementById('v_number').value;

//     db.collection("Voter").doc('G1pRy4MMjr8yfntJLJRI').update({
//         v_name: v_name,
//         v_email: v_email,
//         v_address: v_address,
//         v_number: v_number
//     })
//         .then(() => {
//         console.log("Voter updated!");
//     })
//     alert('Voter updated!');
// });

//  deleteData.addEventListener('click', (e) => {
//     db.collection("Voter").doc('jSTZVtOasB2MghMuYyH4').delete().then(() => {
//         console.log("Voter deleted!");
//     }).catch((error) => {
//         console.error("Error removing document: ", error);
//     })
//     alert('Voter deleted!');
// });

// // // Get all the data
getAllData.addEventListener('click', (e) => {
    db.collection("Voter").get().then(docSnap => {
        let Voter = [];
        docSnap.forEach((doc)=> {
            Voter.push({ ...doc.data(), id:doc.id })
        });
            console.log("Document data:", Voter);
            console.log("Document data:", Voter[0]);
            // console.log("Document data:", Voter[0]['name']);
    });
    alert('Voter!');
});

const voterList = document.querySelector('#voter-list');
const form = document.querySelector('#add-voter-form');

// create element & render cafe
function renderVoter(doc){
    let li = document.createElement('li');
    let v_name = document.createElement('span');
    let v_email = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    v_name.textContent = doc.data().v_name;
    v_email.textContent = doc.data().v_email;
    cross.textContent = 'x';

    li.appendChild(v_name);
    li.appendChild(v_email);
    li.appendChild(cross);

    voterList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Voter').doc(id).delete();
    });
}

// getting data
// db.collection('Customers').orderBy('email').get().then(snapshot => {
    db.collection('Voter').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderVoter(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Voter').add({
        v_name: form.v_name.value,
        v_email: form.v_email.value
    });
    form.v_name.value = '';
    form.v_email.value = '';
});

let v_uid = document.getElementById("v_uid");
let v_name = document.getElementById("v_name");
let v_email = document.getElementById("v_email");
let v_address = document.getElementById("v_address");
let v_number = document.getElementById("v_number");

let submit1Data = document.getElementById("submit1Data");
let updateData = document.getElementById("updateData");
let getData = document.getElementById("getData");

async function AddDocument_AutoID() {
    db.collection("Voter").add({
        UID: v_uid.value,
        Name: v_name.value,
        Email: v_email.value,
        Address: v_address.value,
        Number: v_number.value
    })
        .then(() => {
            alert("data added successfully");
        })
        .catch((error) => {
            alert("Unsuccessuful operation, error: " + error);
        });
    console.log("document id is" + docRef.id);
}


//Add Data by Customer name
async function AddDocument_CustomID() {
    db.collection("Voter").doc(v_name.value).set({
        UID: v_uid.value,
        Name: v_name.value,
        Email: v_email.value,
        Address: v_address.value,
        Number: v_number.value
    })
        .then(() => {
            alert("data added successfully");
        })
        .catch((error) => {
            alert("Unsuccessuful operation, error: " + error);
        });
}


      //Get Data
async function GetADocument() {
    var ref = db.collection("Voter").doc(v_name.value);
    ref.get().then((doc) => {
        if (doc.exists) {
            v_name.value = doc.data().Name;
            v_uid.value = doc.data().UID;
            v_email.value = doc.data().Email;
            v_address.value = doc.data().Address;
            v_number.value = doc.data().Number;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            alert("No such document!")
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// Updating Document Data

async function UpdateFieldsInADocument() {

    db.collection("Voter").doc(v_name.value).update({
        UID: v_uid.value,
        Name: v_name.value,
        Email: v_email.value,
        Address: v_address.value,
        Number: v_number.value
    })
        .then(() => {
            alert("data updated successfully");
        })
        .catch((error) => {
            alert("Unsuccessuful operation, error: " + error);
        });
}
        
        submit1Data.addEventListener("click", AddDocument_CustomID);
        getData.addEventListener("click", GetADocument);
        updateData.addEventListener("click", UpdateFieldsInADocument);
        


