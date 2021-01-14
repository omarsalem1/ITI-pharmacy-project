var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
            
          
db.transaction(function (tx) { 
   tx.executeSql('CREATE TABLE IF NOT EXISTS INVOICES (username , itemname , quantity,type,date)'); 
   })
 


       
        
        
db.transaction(function (tx) { 
   tx.executeSql('SELECT * FROM INVOICES where username=? AND type="b"', [sessionStorage.user], function (tx, results) { 
     console.log(sessionStorage);

       if(results.rows.length>0)
       {
           for (i = 0; i < results.rows.length; i++) { 

              liel= document.createElement("li");
              liel.innerHTML="you bought "+`${results.rows.item(i).quantity}`+" piece(s) of "+`${results.rows.item(i).itemname}`+ " at " + `${results.rows.item(i).date}`;
              document.querySelector("#bought").appendChild(liel);
                
                     } 
       }
       else{
         document.querySelector("#bought").innerHTML="<strong> Nothing has been bought</strong>";
       }
}); });
db.transaction(function (tx) { 
   tx.executeSql('SELECT * FROM INVOICES where username=? AND type="s"', [sessionStorage.user], function (tx, results) { 
     console.log(sessionStorage);

       if(results.rows.length>0)
       {
           for (i = 0; i < results.rows.length; i++) { 

              liel= document.createElement("li");
              liel.innerHTML="you sold "+`${results.rows.item(i).quantity}`+"piece(s) of "+`${results.rows.item(i).itemname}`+ " at " + `${results.rows.item(i).date}`;
              document.querySelector("#sold").appendChild(liel);
                
                     } 
       }
       else{
         document.querySelector("#sold").innerHTML="<strong> Nothing has been Sold</strong>";
       }
}); });


