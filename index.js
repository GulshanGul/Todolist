// // var a = 5
// // var a =20
// // a = 40
// // console.log(a)



// // let b =10
// // b = 50
// // let b =30

// // const c = 30
// // c= 60
// // const c = 40


// // function name(){
// // return "hello"
// // }

// // console.log(name())



// // const newFun=()=> "hello world"
// // console.log(newFun())




// // var obj ={
// //     name:"hello",
// //     fname:"hello world"
// // }

// // const {name,fname} = obj


// // console.log(obj.name)
// // console.log(obj.fname)

// // obj.fname




// // var score =50
// // if(score === 50){
// // console.log("passed")
// // }
// // else{
// //     console.log("Failed")
// // }


// // {score === 50 && console.log("passed")}

// // {score === 50 ? console.log("passed") :console.log("failed")}

// // function data (){
// //     const a = 60
    
// // }

// // data()



// // var funcs = []
// // var object = {
// // a: true,
// // b: true,
// // c: true
// // };



// // for (let key in object) {
// //     funcs.push(object[key])
// // }
// // console.log(funcs)

// // const newFun=()=> {
// //     var name ="sdfsd"
// //     return name
// // }


// // var arr =["a","b"]
// // arr.push("gulshan")
// // arr.push("gulshan")
// // console.log(arr)

// // let set = new Set();
// // set.add(5);
// // set.add("5");
// // set.add(5); // duplicate - this is ignored

// // console.log(set); // 2


// // var arr =["a","b","c"]
// // for(var i=0; i <arr.length; i++){
// //     console.log(arr)



// // let set = new Set(["a","b","b"])
// // set.forEach((value,key,owner)=>{
// // // console.log("===============>",value)
// // console.log("===============>",key)
// // // console.log("===============>",owner)



// // })




// // set.delete("a");

// // set.forEach(function(value, key, ownerSet) {
// //     console.log(key + " " + value);
// //     console.log(ownerSet === set);
// //    });



// // let set = new Set(["a","b","b"])


// // var array = [...set]
// // array.push("a")
// // console.log(array)

// // console.log(array)


// // var arr1 = ["a","b"]
// // var arr2 =["c","d"]
// // var arr3 =["e","f"]
// // var combinedArray =[...arr1,...arr2,...arr3]
// // console.log(combinedArray)

// // var array2 = ["a","b","c","c"]

// // var newSet = new Set([...array2])
// // console.log(newSet)


// // var obj ={}
// // obj.title="sdf"
// // obj.title1="sdf"



// // var _map =  new Map()

// // _map.set("title", "Understanding ECMAScript 7");
// // _map.set("title1", "Understanding ECMAScript 7");
// // console.log(_map.size)



// //  const a=async ()=>{
// //    await FileReader.data()
// //    await nextFunction()
// //    await secondFunction()
// // }


// // function b(){

// }

var _container= document.getElementById("_container")
// var itemRef = firebase.database().ref('users/');


firebase.database().ref('users/').on('child_added', (snapshot) => {
  const data = snapshot.val();
  var _id = snapshot.key
  
  var innerdiv = document.createElement("div")
  var span = document.createElement("span")
  span.innerHTML = data.itemName
  innerdiv.appendChild(span)
_container.appendChild(innerdiv)


var editBtn = document.createElement("button")
editBtn.innerHTML="edit"
innerdiv.appendChild(editBtn)
editBtn.addEventListener("click",()=>{

  var newValue = prompt("enter new value")
  firebase.database().ref('users/'+snapshot.key ).update({
   itemName:newValue,
  });
window.location.reload()

})



var deleteBtn = document.createElement("button")
deleteBtn.innerHTML="delete"
deleteBtn.addEventListener("click",()=>{
  firebase.database().ref('users/'+snapshot.key ).remove()
  window.location.reload()
});
innerdiv.appendChild(deleteBtn)


})








firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(">>>>>>>>>>>>>>",user)
    document.getElementById("email").innerHTML = user.email
    document.getElementById("_id").innerHTML = user.uid

    // ...
  } else {
    // User is signed out
    // ...
  }
});
const user = firebase.auth().currentUser;
console.log(">>>>>>>>>>>>>>",user)

// database query
// .then(res=>{
//     console.log("message sent")
// })
// .catch(err=>{
//     console.log("message filed")
// })


const logout=()=>{
    firebase.auth().signOut().then(() => {
        window.location.href='./login.html'
      }).catch((error) => {
        alert(error.message)
      });
}


function addData() {
  var itemvalue = document.getElementById("_item").value
  firebase.database().ref('users/' ).push({
   itemName:itemvalue,
   active:false
  });
}



const uploadProfilePic=()=>{

let file = document.getElementById("_file").files[0]
  // Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
var storageRef = firebase.storage().ref();
// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    document.getElementById("_bar").value = progress

    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      firebase.database().ref('users/' ).set({url:downloadURL})
    });
  }
);
}



// <<<<<<<<<<<<<<<<<<< FIRESTORE >>>>>>>>>>>>>>>>>>>


var _container2 = document.getElementById("_container2")
firebase.firestore().collection("users").where("age", ">", 17).orderBy("age","desc").limit(3)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var _data = doc.data()
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());


 var innerdiv = document.createElement("div")
 var span = document.createElement("span")
span.innerHTML = _data.name
innerdiv.appendChild(span)
 _container2.appendChild(innerdiv)

//  edit button
var editBtn = document.createElement("button")
editBtn.innerHTML="edit"
innerdiv.appendChild(editBtn)
editBtn.addEventListener("click",()=>{
var newValue = prompt("enter new value")
firebase.firestore().collection("users").doc(doc.id).update({
  name:newValue
}).then((res)=>{
  console.log("updated successfully")
  window.location.reload()
})
.catch((err)=>{
  console.log(err)
})
})
// delete button
var deleteBtn = document.createElement("button")
deleteBtn.innerHTML="delete"
deleteBtn.addEventListener("click",()=>{
  firebase.firestore().collection("users").doc(doc.id).delete()
  .then((res)=>{
    console.log("deleted successfully")
    window.location.reload()
  })
  .catch((err)=>{
    console.log(err)
  }) 
})
innerdiv.appendChild(deleteBtn)
_container2.appendChild(innerdiv)








        })
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
















const addData = ()=>{
  // Add a new document in collection "cities"
  var _input = document.getElementById("input").value
var db = firebase.firestore()
 db.collection("users").doc().set({
  name: _input,
  age:18
 
})
.then(() => {
  console.log("Document successfully written!");
window.location.reload()
  
})
.catch((error) => {
  console.error("Error writing document: ", error);
  
});
}



const editData = ()=>{
  // Add a new document in collection "cities"
var db = firebase.firestore()
db.collection("users").doc("hL1J0rEFeq2Ju41d50A5").update({
  name: "updated daata",
  like:firebase.firestore.FieldValue.increment(-1),
  new:"here is the  new value",
  created:firebase.firestore.FieldValue.serverTimestamp()
 
})
.then(() => {
  console.log("Document successfully updated!");
})
.catch((error) => {
  console.error("Error updating document: ", error);
});
}


const deleteData = ()=>{
  // Add a new document in collection "cities"
var db = firebase.firestore()
db.collection("users").doc("Gulshan").delete()
.then(() => {
  console.log("Document successfully deleted!");
})
.catch((error) => {
  console.error("Error deleting document: ", error);
});
}





