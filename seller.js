function logout(){
    sessionStorage.user=undefined;
}
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




        function edititem() {
            db.transaction(function (tx) {
                var itemname2 = document.getElementById("n2").value;
                var quantity2 = document.getElementById("q2").value;
                var price2 = document.getElementById("pr2").value;
                tx.executeSql('SELECT * FROM items where itemname=? AND sellername=? ', [itemname2,sessionStorage.user], function (tx, results) {
        
                    if (results.rows.length <= 0) {
                        alert("there's no item with this name or you aren't the seller");  
                    } else if (quantity2 <= 0 || price2 <= 0) {
                    alert("price or quantity can't be zero or less");
                } 
                    else {
                        tx.executeSql('update items set quantity=quantity+? where itemname=?', [quantity2, itemname2]);
                        tx.executeSql('update items set price=? where itemname=?', [price2, itemname2]);
                        alert("item updated succesfully");
                    }
                
    
            });})
        }