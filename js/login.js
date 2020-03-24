//////////////////////////////////////////////////////////////////////////////
//////  Render Login page template //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// Deck Spawn Options
function networkOptionDiv(mode) {
  var networkOption = document.createElement("option");
  networkOption.value = mode
  networkOption.innerHTML = mode
  return networkOption;
}

export function render_loginPage(main_div){
    console.log("Rendering Login Page")
    var builder = new DocumentFragment();
  
    // Parent login Div
    var login_div_container = document.createElement("div")
    login_div_container.className="login_form__container"
  
    // Make login form
    var login_div = document.createElement("div")
    login_div.className+= "login_form"
  
    var loginTitle = document.createElement("h1")
    loginTitle.className += "login_form__header"
    loginTitle.innerHTML+= "Login"
    login_div.appendChild(loginTitle)
  
    // Network Dropbox
    var networkSelect = document.createElement("select")
    networkSelect.className += "login_form__select"
    networkSelect.innerHTML += "Select Network"
    login_div.appendChild(networkSelect)

      // Var options
      networkSelect.appendChild(networkOptionDiv("Peercoin"))
      networkSelect.appendChild(networkOptionDiv("Peercoin Testnet"))
      networkSelect.appendChild(networkOptionDiv("Bitcoin Cash"))
      networkSelect.appendChild(networkOptionDiv("Bitcoin Cash Testnet"))

    // Phrase input
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
    loginButton.className+= "login_form__button btn btn--white btn--animated"
    loginButton.setAttribute("type","button");
    loginButton.value = "Login";
    loginButton.id = "login";
    loginButton.addEventListener("click",function(event){
      console.log("clicked login")
      var safety_code = document.getElementById("safety-code").value
      var mnemonic = document.getElementById("mnemonic-entry").value
      var address = getAddress(mnemonic,"peercoinTestnet")
      var lockedKey = encryptData( safety_code, getWIF(mnemonic))
      sessionStorage.setItem("address",address)
      sessionStorage.setItem("lockedKey",lockedKey)
      location.reload()
    })
  
    var generateButton = document.createElement("input")
    generateButton.setAttribute("type","button");
    generateButton.className="login_form__button btn btn--white btn--animated"
    generateButton.value= "Generate"
    
    generateButton.addEventListener("click",function(event){
      var mnemonic = getMnemonic();
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
    main_div.appendChild(builder)
  }


////////////////////////////////////////////////////////////////////////////////////
// Check if user has logged in by verifying the sessionStorage keys are not null //
///////////////////////////////////////////////////////////////////////////////////
export var isLoggedIn = function() {
    var address = sessionStorage.getItem('address'); 
    var lockedKey = sessionStorage.getItem('lockedKey');
    if (address && lockedKey == lockedKey){
        console.log(true)
        // Add the address
        document.getElementById('address').innerHTML = address;
        document.getElementById("address").style.visibility = "visible"
        console.log(address)
        // Set the Identicon
        document.getElementById("address-identicon").setAttribute("data-jdenticon-value", address)
        document.getElementById("address-identicon").style.visibility = "visible"
        return true;
    } else{
        return false;
    }
  }