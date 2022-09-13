

  var  email = document.getElementById("email")
var password = document.getElementById("password")
const login =()=>{
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href='./index.html'
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("error").innerHTML = errorMessage
    });
  
}