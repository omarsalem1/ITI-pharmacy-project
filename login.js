var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

function check() {
    var un = document.getElementById("u1").value;
    var pass = document.getElementById("p1").value;


    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USERS where username=? AND password=?', [un, pass], function (tx, results) {
            if (results.rows.length > 0) {
                sessionStorage.user = un;
                window.location.replace("customer.html");

            } else {
                alert("user name or password is incorrect");
            }
        });
    });

}