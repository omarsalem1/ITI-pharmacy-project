var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);


db.transaction(function (tx) {


    tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (username varchar(255) NOT NULL,email varchar(255),password varchar(255) NOT NULL )');
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function adduser() {

    db.transaction(function (tx) {
        var username = document.getElementById("u1").value;
        var password = document.getElementById("p1").value;
        var password2 = document.getElementById("p2").value;
        var email = document.getElementById("e1").value;

        tx.executeSql('SELECT * FROM USERS where username=? or email=?', [username, email], function (tx, results) {


            if (results.rows.length > 0) {
                alert("username or email already have been used");
            } else {
                if (username == undefined || password2 == undefined || password == undefined) {
                    alert("feilds can't be empty");
                } else if (!validateEmail(email)) {
                    alert("email is not valid")
                } else if (password != password2) {
                    alert("passwords doesn't match");
                } else {
                    alert("user created succesfully");
                    tx.executeSql('INSERT INTO USERS (username, email, password) VALUES (?,?,?)', [username, email, password]);
                    window.location.replace("loginTest.html");

                }
            }
        });
    });
}