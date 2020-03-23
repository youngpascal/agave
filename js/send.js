// Send Transaction Chunk
function createSendTransactionForm() {
    var send_div = document.createElement("div")
    console.log("Making a Transaction...")
  
    var transaction_div = document.createElement("div")
    transaction_div.className = "transaction-form"
  
    // Pay to
    var payToTitle = document.createElement("h3")
    payToTitle.innerHTML = "Pay To"
    send_div.appendChild(payToTitle)
  
    var payInput = document.createElement("input")
    payInput.className = "send_form__pay_entry send_form__input"
    payInput.id += "pay-entry"
    payInput.placeholder += "Enter an Address"
    send_div.appendChild(payInput)
  
    // Amount
    var amountTitle = document.createElement("h3")
    amountTitle.innerHTML += "Amount"
    send_div.appendChild(amountTitle)
  
    var amountInput = document.createElement("input")
    amountInput.className = "send_form__amount_entry send_form__input"
    amountInput.id = "amount-entry"
    amountInput.placeholder += "Enter Amount"
    send_div.appendChild(amountInput)
    
    // Remove Transaction
    var removeButton = document.createElement("button")
    removeButton.className = "button"
    removeButton.type = "button"
    removeButton.innerHTML = "Remove Transaction"
    send_div.appendChild(removeButton)
  
    return send_div
  }
  
  export function render_sendPage(){
    var builder = new DocumentFragment();
    console.log("Rendering Send Page...")

    // Parent div container
    var send_div_container = document.createElement("div")
    send_div_container.className="send_form__container"
    
    // Make one transaction by default
    createSendTransactionForm();
  
    ////////////////////////////////////////////////////////
    // Constants Toolbar
    var send_tools_div = document.createElement("div")
    send_tools_div.className+= "send_tools_form"
      // Send -- CURRENTLY AN INPUT
      var sendButton = document.createElement("button")
      sendButton.className = "button"
      sendButton.setValue += "Send"
      sendButton.innerHTML = "Send"
      send_tools_div.appendChild(sendButton)
  
    // Clear All
      var clearButton = document.createElement("button")
      clearButton.className = "button"
      clearButton.setValue += "Clear All"
      clearButton.innerHTML = "Clear All"
      send_tools_div.appendChild(clearButton)
  
    // Add New Transaction
    send_div_container.appendChild(send_tools_div)
    builder.appendChild(send_div_container)
    return builder
    ////////////////////////////////////////////////////////
  
  }