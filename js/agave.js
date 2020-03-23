import * as login from './login.js';
import * as overview from './overview.js';
import * as send from './send.js';


// Issue Modes Array
var Issue_Modes = ["None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"];
// Network Arrays
var Networks = {"Peercoin": "Peercoin", "Peercoin-Testnet": "PeercoinTestnet","Bitcoin": "Bitcoin", "Bitcoin-Testnet":"BitcoinTestnet"};
// Render Pages
var RENDERERS = {"LOGIN": login.render_loginPage, "OVERVIEW": overview.render_overview, "SEND": send.render_sendPage};


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

function changePageHash(event){
  var hash = event.newURL.split("#")[1]
  render_page(hash.toUpperCase())
}

///////////////////////////////////////////////////////
////////////////     PAGE RENDERS   ///////////////////
///////////////////////////////////////////////////////
function render_page(pageName){
  clearObjectHTML(getMainDiv());
  if (RENDERERS[pageName]!=undefined){
    console.log("Current Page", RENDERERS[pageName]);
    var main_div = getMainDiv();
    clearObjectHTML(main_div);
    RENDERERS[pageName](main_div);
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

window.addEventListener("hashchange",changePageHash,true)
///////////////////////////////////////////////////////////
/////////////// Run to Render Pages //////////////////////
/////////////////////////////////////////////////////////
//addOnClickToNavItems()
if ( !login.isLoggedIn() ) {
  // If user is not logged in then load the login page
  document.location.hash = "#login"
  
} else if ( login.isLoggedIn() ) {
  createLogoutUser();
  var page = window.location.hash.replace("#","")
  if (page === "" || page.toUpperCase() === "LOGIN" ){
    document.location.hash = "#overview"

  }else{
    document.location.hash = "#" + page.toUpperCase();
  }
}
