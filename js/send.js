// Send these transactions
// Prepared blockchain transaction

// Remove this transaction
// this.id = #
// document.getElementsByClassName("send_transactionCard")[#]
// elem.parentNode.removeChild(elem)
function removeThisTransaction() {
    console.log(this)
}

// Remove All Transactions Button
function removeAllTransactions() {
    // Count how many extra transactions there are 
    var transactions = document.getElementsByClassName("send__transactionCard");
    // -1 to offset the length
    var toRemove = transactions.length - 1;
    var i;

    for (i = toRemove; i > 0; i--) {
        console.log(i)
        document.getElementById(i).remove();
    }
}

// Send Transaction Chunk
function createSendTransactionForm() {
    var send_transactionCard = document.createElement("div");
    send_transactionCard.className = "send__transactionCard";
    // Get the transaction # 
    send_transactionCard.id = document.getElementsByClassName("send__transactionCard").length;

    // Pay to
    var payToTitle = document.createElement("h3");
    payToTitle.className = "send__payTo-title"
    payToTitle.innerHTML = "Pay To";
    send_transactionCard.appendChild(payToTitle);
  
    var payInput = document.createElement("input");
    payInput.className = "send__payTo-entry";
    payInput.placeholder += "Enter an Address";
    send_transactionCard.appendChild(payInput);
  
    // Amount
    var amountTitle = document.createElement("h3");
    amountTitle.className += "send__payTo-title"
    amountTitle.innerHTML += "Amount";
    send_transactionCard.appendChild(amountTitle);
  
    var amountInput = document.createElement("input");
    amountInput.className = "send__payTo-entry";
    amountInput.placeholder += "Enter Amount";
    send_transactionCard.appendChild(amountInput);
    
    // Remove Transaction
    var removeButton = document.createElement("button")
    removeButton.className = "button"
    removeButton.type = "button"
    removeButton.innerHTML = "Remove Transaction"
    send_transactionCard.addEventListener("click", removeThisTransaction);
    send_transactionCard.appendChild(removeButton);

    return send_transactionCard
  }
  
  export function render_sendPage(main_div){
    var builder = new DocumentFragment();
    console.log("Rendering Send Page...")

    // Structure
    // - Send
    // |
    // --- Send Transactions
    // |  |
    // |  --- Transactions 1
    // |  --- Transactions 2
    // |
    // --- Send Tools 
    //     |
    //     --- Clear Button
    //     --- Add Button
    //     --- Send Button

    // Transactions parent div container
    var send_div = document.createElement("div")
    send_div.className="send"
  
    var send__transactions = document.createElement("div")
    send__transactions.className="send__transactions"
    send_div.appendChild(send__transactions)

    // Make one transaction by default
    send__transactions.appendChild(createSendTransactionForm());

    ////////////////////////////////////////////////////////
    // Constants Toolbar
    var send_tools_div = document.createElement("div")
    send_tools_div.className = "send__tools"

        // Clear All
        var clearButton = document.createElement("button")
        clearButton.className = "button"
        clearButton.setValue += "Clear All"
        clearButton.innerHTML = "Clear All"
        clearButton.addEventListener("click", function(event){
            removeAllTransactions();
        })
        send_tools_div.appendChild(clearButton)
  
        // Add New Transaction
        var addButton = document.createElement("button")
        addButton.className = "button"
        addButton.setValue += "Add Transaction"
        addButton.innerHTML = "Add Transaction"
        addButton.addEventListener("click", function(event){
            send__transactions.appendChild(createSendTransactionForm());
        })
        send_tools_div.appendChild(addButton)
        
        // Send -- CURRENTLY AN INPUT
        var sendButton = document.createElement("button")
        sendButton.className = "button"
        sendButton.setValue += "Send"
        sendButton.innerHTML = "Send"
        sendButton.addEventListener("click", function(event){
            console.log("Sending Transactions")
            // Send all this stuff
        })
        send_tools_div.appendChild(sendButton)

    send_div.appendChild(send_tools_div)
    builder.appendChild(send_div)
    main_div.appendChild(builder)
    ////////////////////////////////////////////////////////
  
  }