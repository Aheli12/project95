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
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code

        console.log(firebase_message_id);
        console.log(message_data);
        names = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];


        A1 = "<h4>" + names + "<img class='user_tick' src='tick.png'></h4>";
        A2 = "<h4 class='message_h4'>" + message + "</h4>";
        A3 = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick= 'updateLike(this.id)'>";
        A4 = "<span class='glyphicon glyphicon-thumbs-up'>  Like :  " + like + "</span></button><hr>";


        apple = A1 + A2 + A3 + A4;
        document.getElementById("output").innerHTML += apple;
        //End code
      }
    });
  });
}
getData();

function updateLike(message_id) {
  // console.log("clicked on like button - " + message_id);
  T1 = message_id;
  likes = document.getElementById(T1).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });

}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location("index.html");
}
