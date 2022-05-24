const firebaseConfig = {
  apiKey: "AIzaSyAnhY30cDXjv63bDdiQoTW9m5VP4tJTvh4",
  authDomain: "kwitter-d37dc.firebaseapp.com",
  databaseURL: "https://kwitter-d37dc-default-rtdb.firebaseio.com",
  projectId: "kwitter-d37dc",
  storageBucket: "kwitter-d37dc.appspot.com",
  messagingSenderId: "165198833168",
  appId: "1:165198833168:web:2c98928a63aebc9f65cc95",
  measurementId: "G-NB0GV9WHM2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome  " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
