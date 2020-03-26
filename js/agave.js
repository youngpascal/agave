import * as login from './login.js';
import * as overview from './overview.js';
import * as send from './send.js';
import * as transactions from './transactions.js';
import * as manage from './manage.js';
import * as provider from "./providers/chainz.js"

// Network Arrays
var Networks = {
  "Peercoin": "Peercoin",
  "Peercoin-Testnet": "PeercoinTestnet",
  "Bitcoin": "Bitcoin",
  "Bitcoin-Testnet":"BitcoinTestnet"
};
// Render Pages
var RENDERERS = {
  "LOGIN": login.render_loginPage,
  "OVERVIEW": new overview.overview(),
  "SEND": new send.send(),
  "MANAGE":manage.render_managePage
};

////////////////////////////////////////////////////////
///////////         UTILITIES           ////////////////
////////////////////////////////////////////////////////

function createLogoutUser(){
  // Creates EventListener to clear sessionStorage when Logout is clicked
  console.log("Creating LogoutUser");
  var logout = document.getElementById("logout-key");
  logout.addEventListener("click",function(event){
      sessionStorage.clear();
      location.reload();
  });
}

function clearObjectHTML(htmlObject){
  // Clears the htmlObject
  htmlObject.innerHTML = "";
}

function addOnClickToNavItems(){
  // Create event listener for "click" on side nav options
  // When a side-nav option is clicked, change the page and set new
  // selection to active
  var items = document.getElementsByClassName("side-nav__item");
  var nav_items = Array.from(items);
  nav_items.map(function(val){
    val.addEventListener("click",changePage);
    console.log("Added OnClick");
  });
}

////////////////////////////////////////////////////////
///////////       PAGE FUNCTIONS        ////////////////
////////////////////////////////////////////////////////

function changePage(event){
  // Changes page to event target
  var element = event.currentTarget;
  if (login.isLoggedIn()){
    render_page(element.innerText);
    changeActive(element.id)
  }else{
    render_page("LOGIN")
  }
}

function changeActive(name){
  // Changes the class to Active ( Used for side-nav )
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
  // Changes pageHash, renders new page, and changes side-nav Active
  var hash = event.newURL.split("#")[1]
  render_page(hash.toUpperCase())
  changeActive(hash.toLowerCase())
}

function unloadEventFlag(){
  // Store unloadEventFlag when page refresh is encountered
  // This is used for re-rendering the page on reload
  if (window.sessionStorage.getItem('unloadEventFlag') === null) {
    // flag the page as being unloading
    window.sessionStorage['unloadEventFlag']= new Date().getTime();
  }
}

function getMainDiv(){
  // Returns the Main div element
  var main_div = document.getElementsByTagName("main")[0];
  return main_div;
}

///////////////////////////////////////////////////////
////////////////     PAGE RENDERS   ///////////////////
///////////////////////////////////////////////////////

function render_page(pageName){
  // Takes in the pageName argument and renders the page
  clearObjectHTML(getMainDiv());
  if (RENDERERS[pageName]!=undefined){
    console.log("Current Page", RENDERERS[pageName]);
    var main_div = getMainDiv();
    clearObjectHTML(main_div);
    RENDERERS[pageName].renderPage(main_div);
  }
  else{
    render_not_implemented(pageName);
  }
}

function render_not_implemented(name){
  // Standard render page for page-names that do not have a Renderer
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

/////////////////////////////////////////////
///////// EXTERNAL API CALLS AND SET ///////
///////////////////////////////////////////
/*
function setProviderData(){
  // TODO: network needs to be set in session storage!!
  // var network = sessionStorage.getItem('network')
  var address = sessionStorage.getItem('address')
  console.log(address)
  var User = new provider.Chainz('peercoin-testnet',address)
  window.setInterval(setBalance(User),15000)
  setUnspent(User)
}*/
/*
function setBalance(User){
  // Will get the User's balance for the given Address
  let state = User.getBalancePromise()
  var elem = document.getElementById("user-balance")
  state.then(data => {
    elem.innerHTML = data
  })
}*/

function setUnspent(User){
  // Will get the User's available unspent transactions
  // This is used to created new transactions
  let state = User.getUnspentPromise()
  //var elem = document.getElementById("user-balance")
  state.then(data => {
    console.log(data)
  })
}

///////////////////////////////////////////////////////////
/////////////// EVENT LISTENERS ON LOAD //////////////////
/////////////////////////////////////////////////////////

window.addEventListener("hashchange",changePageHash,true)
window.addEventListener("beforeunload", unloadEventFlag)


///////////////////////////////////////////////////////////
//////////////  RUN AT INITIAL PAGE LOAD  ////////////////
/////////////////////////////////////////////////////////
//addOnClickToNavItems()

if ( !login.isLoggedIn() ) {
  // If user is not logged in then load the login page
  document.location.hash = "#login"
  render_page("LOGIN")
  
}else if ( login.isLoggedIn() ) {
    // Create the Event Listener for Logout
    createLogoutUser();
    // Set page variable to current location
    var page = window.location.hash.replace("#","")
    if (page === "" || page.toUpperCase() === "LOGIN" ){
      // if not on specific page or on login page, render overview
      document.location.hash = "#Overview"
    }else{
      // if page is defined then load page 
      document.location.hash = "#" + page;
    }
    if (window.sessionStorage.hasOwnProperty('unloadEventFlag')){
      // if the unloadEventFlag exists, that means a page refresh just happened
      // re-render the page and remove unloadEventFlag from sessionStorage
      render_page(page.toUpperCase())
      changeActive(page)
      window.sessionStorage.removeItem('unloadEventFlag')
    }
    // Here is where the External API data will be queried and loaded into div's
    //setProviderData()
  
}