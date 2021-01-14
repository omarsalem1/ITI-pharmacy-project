var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#showscreenshot");
let photo;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log("Something went wrong!");
        });
}

function takescreenshot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    photo = canvas.toDataURL("image/png");
    // console.log(photo);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////  
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
db.transaction(function (tx) {


    tx.executeSql('CREATE TABLE IF NOT EXISTS items (itemname varchar(255) NOT NULL,quantity int,image,price,sellername  )');
})

function additem() {
    // console.log(photo);
    db.transaction(function (tx) {
        var itemname = document.getElementById("n1").value;
        var quantity = document.getElementById("q1").value;
        var price = document.getElementById("pr").value;

        tx.executeSql('SELECT * FROM items where itemname=? ', [itemname], function (tx, results) {


            if (results.rows.length > 0) {
                alert("itemname  already exists");
            } else {
                if (itemname == undefined) {
                    alert("item name can't be empty");
                } else if (quantity <= 0 || price <= 0) {
                    alert("quantity and price  can't be zero or less");
                } else {
                    alert("item created succesfully");
                    console.log(photo);

                    tx.executeSql('INSERT INTO items (itemname,quantity,price,image,sellername) VALUES (?,?,?,?,?)', [itemname, quantity, price, photo, sessionStorage.user]);
                }
            }
        });
    });
}