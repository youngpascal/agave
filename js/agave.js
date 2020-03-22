var Issue_Modes = ["None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"]

////////////////////////////////////////////////////////
///////////         UTILITIES           ////////////////
////////////////////////////////////////////////////////

function getMainDiv(){
  main_div = document.getElementsByTagName("main")[0]
  return main_div
}

function clearObjectHTML(htmlObject){
  htmlObject.innerHTML = ""
}











///////////////////////////////////////////////////////
/////////// AJAX Calls ////////////////////////////////
///////////////////////////////////////////////////////


function getRequest(uri,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText)
      }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}



function loadTransactionPage(pageLength,pageNumber){
  getRequest("https://api.agavewallet.com/v1/assets?limit="+pageLength+"&page="+pageNumber, loadTransactions)
}


////////////////////////////////////////////////////////
/////////         CALLBACKS               //////////////
////////////////////////////////////////////////////////

function loadTransactions(response){
  transactions = JSON.parse(response)
  transID = Object.keys(transactions)
  main_div = getMainDiv()
  clearObjectHTML(main_div)
  for (var x in transactions){
    main_div.appendChild(createTransactionDiv(transactions[x],x))
  }
  
}


////////////////////////////////////////////////////////////
//////              CREATE TEMPLATES            ////////////
////////////////////////////////////////////////////////////
function createTransactionDiv(transaction, transID){
  trans_html =        '<div  class="overview__identicon">'+
                          '<div class="overview__identicon__placeholder"><canvas width="80" height="80" data-jdenticon-value="' + transID + '"></canvas></div>'+
                      '</div>'+
                      '<div class="overview__info">'+
                          '<h1 class="overview__name">'+transaction.name+'</h1>'+
                          '<p class="overview__transID">'+transID+'</p>'
                      '</div>'
  trans_div = document.createElement("div")
  trans_div.className = "overview"
  trans_div.innerHTML = trans_html
  return trans_div
}


loadTransactionPage(25,1)