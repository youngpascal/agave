var pageLength = 10
var Issue_Modes = ["None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"]
function loadTransactions(pageLength, pageNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        transactions = JSON.parse(this.responseText)
        transID = Object.keys(transactions)
        main_div = document.getElementsByTagName("main")[0]
        main_div.innerHTML= ""
        for (var x=0; x<10; x++){
            trans_html =        '<div  class="overview__identicon">'+
                                    '<div class="overview__identicon__placeholder"><canvas width="80" height="80" data-jdenticon-value="' + transID[x] + '"></canvas></div>'+
                                '</div>'+
                                '<div class="overview__info">'+
                                    '<h1 class="overview__name">'+transactions[transID[x]].name+'</h1>'+
                                    '<p class="overview__transID">'+transID[x]+'</p>'
                                '</div>'
            
            

            trans_div = document.createElement("div")
            trans_div.className = "overview"
            trans_div.innerHTML = trans_html
            main_div.appendChild(trans_div)
        }
      }
    };
    xhttp.open("GET", "https://api.agavewallet.com/v1/assets?limit="+pageLength+"&page="+pageNumber, true);
    xhttp.send();
  }

document.onload += loadTransactions(pageLength,1)