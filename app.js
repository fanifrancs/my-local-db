var usernamefield = document.getElementById('username');
var passwordfield = document.getElementById('password');
var passwordrptfield = document.getElementById('passwordrpt');
var currentpasswordfield = document.getElementById('currentpassword');

function signup() {
   let username = usernamefield.value;
   let password = passwordfield.value;
   //gets the current registered usernames and passwords.
   dbstore = localStorage.getItem('db');
   //JSON.parse converts the string 'dbstore' to an array for pushing of new user details.
   const dbgrab = JSON.parse(dbstore);
   /*
   Function below checks if the database is empty and then initializes the database
   with the first entries.
   */
    if (dbgrab == null) {
        const dbinitialize = [];
        dbinitialize.push(username, password);
        const database = dbinitialize.concat(dbgrab);
        //JSON.stringify converts the array 'database' into a string for local storage.
        localStorage.setItem('db', JSON.stringify(database));
        document.getElementById('alert').className = 'alert alert-success alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Account successfully created.'
        document.getElementById('alert').style.display = 'block';
        console.log(database);
    }
    //Function below checks if the username already exists in the database.
    else if (dbgrab.includes(username)) {
        document.getElementById('alert').className = 'alert alert-warning alert-dismissible'
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alertmessage').innerHTML = 'Username is taken! Choose another one.'
    }
    else {
        //dbhold holds the new username and password to be registered when pushed.
        const dbhold = [];  
        dbhold.push(username, password);
        //database then stores the current entries with the new entries by concat.
        const database = dbhold.concat(dbgrab);
        //JSON.stringify converts the array 'database' to a string for local storage.
        localStorage.setItem('db', JSON.stringify(database));
        document.getElementById('alert').className = 'alert alert-success alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Account successfully created.'
        document.getElementById('alert').style.display = 'block';
        console.log(database);
    }
}

function signin() {
   let username = usernamefield.value;
   let password = passwordfield.value;
   //dbstore gets the data in local storage.
   dbstore = localStorage.getItem('db');
   //JSON.parse converts the string data to an array.
   const database = JSON.parse(dbstore);
    //code below is executed if no entries have been pushed into the database.
    if (database == null) {
        document.getElementById('alert').className = 'alert alert-danger alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'DB not initialized! Please Sign up.'
        document.getElementById('alert').style.display = 'block';   
    }
    /*
     The userindx variable below gets the index position of the entered username
     and the pwd variable gets the password in the database since a password sits just
     immediately after a username so the password index would be 1 unit above the 
     username index so we have 'userindx + 1' as the password index. This is then used
     to verify the entered username against the entered password. 
    */
   let userindx = database.indexOf(username);
   let pwd = database[userindx + 1];
    if (database.includes(username) == true && password == pwd ) {
        /*document.getElementById('alert').className = 'alert alert-success alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Correct Username and Password => <strong>Verified</strong>'
        document.getElementById('alert').style.display = 'block';
        console.log(database);*/
        localStorage.setItem('username', username);
        localStorage.setItem('session', 'logged in');
        location.assign('./session.html')
    } else {
        document.getElementById('alert').className = 'alert alert-danger alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Wrong Username or Password!'
        document.getElementById('alert').style.display = 'block';
        console.log(database);
    }
}

function SuValidate() {
   let username = usernamefield.value;
   usernamefield.value = username.toLowerCase();
   let password = passwordfield.value;
   let passwordrpt = passwordrptfield.value;

    if (password !== passwordrpt ) {
        document.getElementById('alert').className = 'alert alert-danger alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Passwords do not match.'
        document.getElementById('alert').style.display = 'block';
        document.getElementById('sign up').disabled = true;  
    } else {
        document.getElementById('sign up').disabled = false;
        document.getElementById('alert').style.display = 'none';
    }

    if (username !== '' && password !== '' && passwordrpt !== '' && password == passwordrpt ) {
        document.getElementById('sign up').disabled = false;
    } else {
        document.getElementById('sign up').disabled = true;
    }
}

function SiValidate() {
   let username = usernamefield.value;
   usernamefield.value = username.toLowerCase();
   let password = passwordfield.value;

   if (username == '' || password == '') {
      document.getElementById('sign in').disabled = true;
   } else {
      document.getElementById('sign in').disabled = false;
   }
}
 
function clearDB() {
    localStorage.removeItem('db');
    location.reload();
    //location.assign('./index.html');
}

function logout() {
    localStorage.setItem('session', 'logged out');
    location.assign('./login.html');
}

function CpValidate() {
    let currentpassword = currentpasswordfield.value;
    let password = passwordfield.value;
    let passwordrpt = passwordrptfield.value;
 
     if (currentpassword == '') {
         document.getElementById('changepwd').disabled = true;
     }
 
     if (password !== passwordrpt ) {
         document.getElementById('alert').className = 'alert alert-danger alert-dismissible'
         document.getElementById('alertmessage').innerHTML = 'Passwords do not match.'
         document.getElementById('alert').style.display = 'block';
         document.getElementById('changepwd').disabled = true;  
     } else {
         document.getElementById('changepwd').disabled = false;
         document.getElementById('alert').style.display = 'none';
     }
 
     if (currentpassword !== '' && password !== '' && passwordrpt !== '' && password == passwordrpt ) {
         document.getElementById('changepwd').disabled = false;
     } else {
         document.getElementById('changepwd').disabled = true;
     }
 }

function changePassword() {
   let username = localStorage.getItem('username')
   let currentpassword = currentpasswordfield.value;
   let newpassword = passwordfield.value;
   dbstore = localStorage.getItem('db');
   const database = JSON.parse(dbstore);
   let userindx = database.indexOf(username);
    if (database.includes(username) == true && database[userindx + 1] == currentpassword) {
        database[userindx + 1] = newpassword;
        localStorage.setItem('db', JSON.stringify(database));
        document.getElementById('alert').className = 'alert alert-success alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Password successfully changed.'
        document.getElementById('alert').style.display = 'block';
        console.log(database);
    } else {
        document.getElementById('alert').className = 'alert alert-warning alert-dismissible'
        document.getElementById('alertmessage').innerHTML = 'Current password is incorrect.'
        document.getElementById('alert').style.display = 'block';
        console.log(database);
    }
}
