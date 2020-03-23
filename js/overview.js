
var builder = new DocumentFragment();

///////////////////////////////////////////////////////
/////////// AJAX Calls ////////////////////////////////
///////////////////////////////////////////////////////
function getRequest(uri,callback,main_div) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText,main_div)
      }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}

function loadTransactionRequest(pageLength,pageNumber,main_div){
    getRequest("https://api.agavewallet.com/v1/assets?limit="+pageLength+"&page="+pageNumber, loadTransactions,main_div)
  }

////////////////////////////////////////////////////////
/////////         CALLBACKS               //////////////
////////////////////////////////////////////////////////

function createTransactionDiv(transaction, transID){
   
    // Create the Div to hold it all
    var trans_div = document.createElement("div")
    trans_div.className = "overview"
  
    // add the identicon
    var overview_identicon = document.createElement("div")
    overview_identicon.className ="overview__identicon"
    var overview_identicon_canvas = document.createElement("canvas")
    overview_identicon_canvas.setAttribute("data-jdenticon-value", transID)
    overview_identicon_canvas.setAttribute("width", 80)
    overview_identicon_canvas.setAttribute("height", 80)
    overview_identicon.appendChild(overview_identicon_canvas)
  
    //add the Info
    var overview_info = document.createElement("overview__info")
    overview_info.className="overview__info"
    var overview_name_container = document.createElement("div")
    overview_name_container.className = "overview__info_data"
    var overview_transID_container = document.createElement("div")
    overview_transID_container.className ="overview__info_data"
  
    var overview_name = document.createElement("h1")
    overview_name.className="overview__name"
    var overview_transID = document.createElement("span")
    overview_transID.className="overview__transID"
  
    overview_name["textContent"] = transaction.name
    overview_transID["textContent"] = transID
    
    overview_name_container.appendChild(overview_name)
    overview_transID_container.appendChild(overview_transID)
    overview_info.appendChild(overview_name_container)
    overview_info.appendChild(overview_transID_container)
  
    //append the items to overview
    trans_div.appendChild(overview_identicon)
    trans_div.appendChild(overview_info)
  
    return trans_div
  
  }

function loadTransactions(response,main_div){
    var transactions = JSON.parse(response)
    var transID = Object.keys(transactions)
    for (var x in transactions){
      builder.appendChild(createTransactionDiv(transactions[x],x))
    }
    main_div.appendChild(builder)
  }

export function render_overview(main_div){
    loadTransactionRequest(25,1,main_div)
  }