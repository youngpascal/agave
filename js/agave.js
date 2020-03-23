import * as login from './login.js';
import * as overview from './overview.js';
import * as send from './send.js';


// Issue Modes Array
var Issue_Modes = ["None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"];
// Network Arrays
var Networks = {"Peercoin": "Peercoin", "Peercoin-Testnet": "PeercoinTestnet","Bitcoin": "Bitcoin", "Bitcoin-Testnet":"BitcoinTestnet"};
// Render Pages
var RENDERERS = {"LOGIN":login.render_loginPage, "OVERVIEW":overview.render_overview, "SEND": send.render_sendPage};


////////////////////////////////////////////////////////
///////////         UTILITIES           ////////////////
////////////////////////////////////////////////////////

///////////////////////////////////////////////////
//////// Clear Session Storage ////////////////////
///////////////////////////////////////////////////
function createLogoutUser(){
  console.log("Creating LogoutUser");
  var logout = document.getElementById("logout-key");
  logout.addEventListener("click",function(event){
      sessionStorage.clear();
      location.reload();
  });
}

function getMainDiv(){
  var main_div = document.getElementsByTagName("main")[0];
  return main_div;
}

function clearObjectHTML(htmlObject){
  htmlObject.innerHTML = "";
}

function addOnClickToNavItems(){
  var items = document.getElementsByClassName("side-nav__item");
  var nav_items = Array.from(items);
  nav_items.map(function(val){
    val.addEventListener("click",changePage);
    console.log("Added OnClick");
  });
  
}

function changePage(event){
  var element = event.currentTarget;
  if (!element.classList.contains("side-nav__item--active")){
      var nav_items = document.getElementsByClassName("side-nav__item--active");
      Array.from(nav_items).map(function(item){ 
        item.classList.remove("side-nav__item--active");
    });
      element.classList.add("side-nav__item--active");
      if (login.isLoggedIn()){
        render_page(element.innerText);
      }else{
        render_page("LOGIN")
      }
  }

  else {
    return;
  }
}

///////////////////////////////////////////////////////
////////////////     PAGE RENDERS   ///////////////////
///////////////////////////////////////////////////////
function render_page(pageName){
  clearObjectHTML(getMainDiv());
  if (RENDERERS[pageName]!=undefined){
    console.log(RENDERERS[pageName]);
    //loadTransactionPage(25,1)(25,1)
    var builder = RENDERERS[pageName]();
    console.log("builder", builder);
    var main_div = getMainDiv();
    clearObjectHTML(main_div);
    main_div.appendChild(builder);
  }
  else{
    render_not_implemented(pageName);
  }
}

function render_not_implemented(name){
  var builder = new DocumentFragment();

  var not_implemented_div = document.createElement("div");
  not_implemented_div.className+= "overview__not_implemented";
  
  var not_implemented = document.createElement("h1");
  not_implemented.textContent = "Sorry,\nThe " +name+ " page hasn't been implemented yet."+
                                "\nComplain to Scott!\n\t\t-Sleepi";

  not_implemented_div.appendChild(not_implemented);
  
  builder.appendChild(not_implemented_div);
  return builder;
}
///////////////////////////////////////////////////////////
/////////////// Run to Render Pages //////////////////////
/////////////////////////////////////////////////////////
addOnClickToNavItems()

if ( !login.isLoggedIn() ) {
  // If user is not logged in then load the login page
  console.log("User is not logged in");
  render_page("LOGIN");

} else if ( login.isLoggedIn() ) {

  var page = document.location.hash.replace("#","");
  createLogoutUser();

  if (page === ""){
    render_page("OVERVIEW");
  }else{
    render_page(page.toUpperCase());
  }
}