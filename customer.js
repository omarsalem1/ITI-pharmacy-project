/*document.getElementById("logout").addEventListener("click",function(){
  sessionStorage.user=undefined;
});*/
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
db.transaction(function (tx) { 
            
    tx.executeSql('SELECT * FROM items', [], function (tx, results) { 
            
			   for (var i = 0; i < results.rows.length; i++) { 
                const divel = document.createElement("div");
                const hel=document.createElement("h3");
                const sel=document.createElement("strong");
                const imgel=document.createElement("img");
                const bel=document.createElement("button");
                const d1=document.createElement("div");
                const d2 =document.createElement("div");

               hel.innerHTML= `${results.rows.item(i).itemname}`;
               sel.innerHTML= "price :" +`${results.rows.item(i).price}`+"$ <br>";
               divel.className="card border-0 shadow my-3 p-3";
               divel.style="width: 25rem;";
               imgel.className="card-img-top";
               d1.className="card-body";
               d2.className="card-footer text-muted ";
               let itname=`${results.rows.item(i).itemname}`;
               let sellname=`${results.rows.item(i).sellername}`;
               let quan =`${results.rows.item(i).quantity}`;
               
               
               
               imgel.src=results.rows.item(i).image
               bel.type="button";
               bel.innerText="buy now";
               bel.addEventListener("click",function() {
                  // alert(itname);
                
                    console.log(sellname);
                    console.log(sessionStorage.user);
                    
                      var d = new Date();
                      let q =Number (prompt("how much do you want",1)) ;
                      if(q>quan){
                        alert ("this quantity isn't avaiable");
                      }
                      else if(q<=0 || q==NaN){
                        alert ("enter a realistic value");
                      } 
                      else{
                        db.transaction(function (tx) { 
                         tx.executeSql('CREATE TABLE IF NOT EXISTS INVOICES (username,itemname, quantity,type,date)'); 
                tx.executeSql('INSERT INTO INVOICES (username , itemname, quantity,type,date) VALUES (?,?,?,"b",?)',[sessionStorage.user,itname,q,d]); 
                tx.executeSql('INSERT INTO INVOICES (username , itemname, quantity,type,date) VALUES (?,?,?,"s",?)',[sellname,itname,q,d]);
               tx.executeSql('update items set quantity=quantity-? where itemname=?',[q,itname]);
                 })
        
                 alert("purchase completed successfully");  
                      }
                     

                       
               })
               
             //  console.log(results.rows.item(i).itemname)
               
              divel.appendChild(imgel);
               d1.appendChild(hel);
               d1.appendChild(sel);
               if(quan>0){
                 bel.className="btn btn-primary ";
                 d2.appendChild(bel);
                }else{
                sele=document.createElement("strong")
                sele.className="text-danger ";
                sele.innerHTML="OUT OF STOCK";
                d2.appendChild(sele);
                }
                divel.appendChild(d1);
                divel.appendChild(d2);
               
               document.querySelector("#c1").appendChild(divel);
					
               } 
			   
			   
            }, null); 
            
            
            })