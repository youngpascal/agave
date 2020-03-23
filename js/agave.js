// Issue Modes Array
var Issue_Modes = ["None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"]
// Network Arrays
var Networks = {"Peercoin": "Peercoin", "Peercoin-Testnet": "PeercoinTestnet","Bitcoin": "Bitcoin", "Bitcoin-Testnet":"BitcoinTestnet"}
// Render Pages
var RENDERERS = {"LOGIN":render_loginPage, "OVERVIEW":render_overview}

////////////////////////////////////////////////////////
///////////         UTILITIES           ////////////////
////////////////////////////////////////////////////////

function getMainDiv(){
  var main_div = document.getElementsByTagName("main")[0]
  return main_div
}

function clearObjectHTML(htmlObject){
  htmlObject.innerHTML = ""
}

function addOnClickToNavItems(){
  var items = document.getElementsByClassName("side-nav__item")
  var nav_items = Array.from(items)
  nav_items.map(function(val){
    val.addEventListener("click",changePage)
    console.log("Added OnClick")
  })
  
}

function changePage(event){
  var element = event.currentTarget;
  if (!element.classList.contains("side-nav__item--active")){
      var nav_items = document.getElementsByClassName("side-nav__item--active")
      Array.from(nav_items).map(function(item){ 
        item.classList.remove("side-nav__item--active");
    })
      element.classList.add("side-nav__item--active")
      render_page(element.innerText)
  }

  else {
    return
  }
}

///////////////////////////////////////////////////////
////////////////     PAGE RENDERS /////////////////////
///////////////////////////////////////////////////////
function render_page(pageName){
  clearObjectHTML(getMainDiv())
  if (RENDERERS[pageName]!=undefined){
    RENDERERS[pageName]()
  }
  else{
    render_not_implemented(pageName)
  }
}

// Render Login page template
function render_loginPage(){
  console.log("Rendering Login Page")
  var builder = new DocumentFragment();

  // Parent Login Div

  var login_div_container = document.createElement("div")
  login_div_container.className="login_form__container"

  var login_div = document.createElement("div")
  login_div.className+= "login_form"

  var phraseInput = document.createElement("input")
  phraseInput.className+= " login_form__phrase_entry"
  phraseInput.className+= " login_form__input"
  phraseInput.id+="mnemonic-entry"
  phraseInput.placeholder+= "12-Word Passphrase"
  login_div.appendChild(phraseInput)

  var passwordInput = document.createElement("input")
  passwordInput.id += "safety-code"
  //Why no += in this specific case?
  passwordInput.type = "password"
  passwordInput.className+= " login_form__input"
  passwordInput.placeholder+= "Password"
  login_div.appendChild(passwordInput)

  var loginButton = document.createElement("input")
  loginButton.className+= " login_form__button"
  loginButton.setAttribute("type","button");
  loginButton.value = "Login";
  loginButton.addEventListener("click",function(event){
    console.log("clicked login")
    safety_code = document.getElementById("safety-code").value
    mnemonic = document.getElementById("mnemonic-entry").value
    address = getAddress(mnemonic,"peercoinTestnet")
    lockedKey = encryptData( safety_code, getWIF(mnemonic))
    sessionStorage.setItem("address",address)
    sessionStorage.setItem("lockedKey",lockedKey)
    location.reload()
  })

  var generateButton = document.createElement("input")
  generateButton.setAttribute("type","button");
  generateButton.className="login_form__button"
  generateButton.className+= " login_form__button"
  generateButton.value = "Generate";
  generateButton.addEventListener("click",function(event){
    mnemonic = getMnemonic();
    console.log(mnemonic)
    document.getElementById("mnemonic-entry").value=mnemonic
  })

  var button_row = document.createElement("div")
  button_row.className="login_form__button_row"

  
  button_row.appendChild(loginButton)
  button_row.appendChild(generateButton)

  login_div.appendChild(button_row)
  login_div_container.appendChild(login_div)

  // Build it all
  builder.appendChild(login_div_container)

  var main_div = getMainDiv()
  clearObjectHTML(main_div)
  main_div.appendChild(builder)
}

function render_overview(){
  loadTransactionPage(25,1)
}


function render_not_implemented(name){
  var builder = new DocumentFragment();

  var not_implemented_div = document.createElement("div")
  not_implemented_div.className+= "overview__not_implemented"
  
  var not_implemented = document.createElement("h1")
  not_implemented.textContent = "Sorry,\nThe " +name+ " page hasn't been implemented yet."+
                                "\nComplain to Scott!\n\t\t-Sleepi"

  not_implemented_div.appendChild(not_implemented)
  
  builder.appendChild(not_implemented_div)
 

//   var main_div = getMainDiv()
//   clearObjectHTML(main_div)
//   main_div.appendChild(builder)
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
  //getRequest("./js/testdata25.json?limit="+pageLength+"&page="+pageNumber, loadTransactions)
}


////////////////////////////////////////////////////////
/////////         CALLBACKS               //////////////
////////////////////////////////////////////////////////

function loadTransactions(response){
  var transactions = JSON.parse(response)
  var transID = Object.keys(transactions)
  var builder = document.createDocumentFragment();
  
  
  for (var x in transactions){
    builder.appendChild(createTransactionDiv(transactions[x],x))
  }
  var main_div = getMainDiv()
  main_div.appendChild(builder)
}

////////////////////////////////////////////////////////////
//////              CREATE TEMPLATES            ////////////
////////////////////////////////////////////////////////////
function createTransactionDiv(transaction, transID){
  // Create the Div to hold it all
  var trans_div = document.createElement("div")
  trans_div.className = "overview"

  // add the identicon
  var overview_identicon = document.createElement("div")
  overview_identicon.className ="overview__identicon"
  var overview_identicon_canvas = document.createElement("canvas")
  overview_identicon_canvas.setAttribute("data-jdenticon-value",transID)
  overview_identicon_canvas.setAttribute("width",80)
  overview_identicon_canvas.setAttribute("height",80)
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

addOnClickToNavItems()

// Check if user has logged in by verifying the sessionStorage keys are not null
var isLoggedIn = function() {
  address = sessionStorage.getItem('address');
  lockedKey = sessionStorage.getItem('lockedKey');
  if (address && lockedKey == lockedKey){
      console.log(true)
      // Add the address
      document.getElementById('address').innerHTML = address;
      // Create an Identicon for the address
      //overview_identicon_canvas.setAttribute("data-jdenticon-value",transID)
      //<canvas data-jdenticon-value="" id="address-identicon" class="user-nav__icon">
      document.getElementById("address-identicon").setAttribute("data-jdenticon-value", transID)
      return true;
  } else{
      return false;
  }
}

var logoutUser = function(){
  logout = document.getElementById("logout-key")
  logout.addEventListener("click",function(event){
     sessionStorage.clear()
     location.reload()
   })
 }

// var page = document.location.hash.replace("#","")
// if (page != "") && ( isLoggedIn() ){
//   render_page(page.toUpperCase())
// }else { 


if ( !isLoggedIn() ) {
    // If user is not logged in then load the login page
    console.log("User is not logged in")
    render_page("LOGIN")
  } else if ( isLoggedIn() ) {
    page = document.location.hash.replace("#","")
    if (page === ""){
      render_page("OVERVIEW")
    }else{
      render_page(page.toUpperCase())
  }
}
