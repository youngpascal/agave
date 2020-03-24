import * as login from './login.js';
import * as overview from './overview.js';
import * as send from './send.js';
import * as transactions from './transactions.js';
import * as manage from './manage.js';


// Issue Modes Array
var Issue_Modes = ["None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"];
// Network Arrays
var Networks = {"Peercoin": "Peercoin", "Peercoin-Testnet": "PeercoinTestnet","Bitcoin": "Bitcoin", "Bitcoin-Testnet":"BitcoinTestnet"};
// Render Pages
var RENDERERS = {"LOGIN": login.render_loginPage, "OVERVIEW": overview.render_overviewPage, "SEND": send.render_sendPage, "MANAGE":manage.render_managePage};


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
  if (login.isLoggedIn()){
    render_page(element.innerText);
    changeActive(element.id)
  }else{
    render_page("LOGIN")
  }
}


function changeActive(name){
  console.log(name)
  var nav_active = "side-nav__item--active"
  var element = document.getElementById(name.toLowerCase() +"-nav")
  var current_active = document.getElementsByClassName(nav_active)
  if ( !element.classList.contains(nav_active) ){
    Array.from(current_active).map(function(item){
      item.classList.remove(nav_active);
    })
    element.classList.add(nav_active);
  }
}

function changePageHash(event){
  var hash = event.newURL.split("#")[1]
  render_page(hash.toUpperCase())
  changeActive(hash.toLowerCase())
}

function unloadEventFlag(){
  if (window.sessionStorage.getItem('unloadEventFlag') === null) {
    // flag the page as being unloading
    window.sessionStorage['unloadEventFlag']= new Date().getTime();
  }
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
window.addEventListener("beforeunload", unloadEventFlag)
///////////////////////////////////////////////////////////
/////////////// Run to Render Pages //////////////////////
/////////////////////////////////////////////////////////
//addOnClickToNavItems()
if ( !login.isLoggedIn() ) {
  // If user is not logged in then load the login page
  document.location.hash = "#login"
  
}else if ( login.isLoggedIn() ) {
    createLogoutUser();
    var page = window.location.hash.replace("#","")
    if (page === "" || page.toUpperCase() === "LOGIN" ){
      document.location.hash = "#Overview"
    }else{
      document.location.hash = "#" + page;
    }
    if (window.sessionStorage.hasOwnProperty('unloadEventFlag')){
      render_page(page.toUpperCase())
      changeActive(page)
      window.sessionStorage.removeItem('unloadEventFlag')
    }
}


