// Send these transactions
// Prepared blockchain transaction

// Remove this transaction
function removeRecipient() {
    var recipient = (this.parentNode)
    recipient.remove();
}

// Remove All Recipients Button
function removeAllRecipients() {

    // Count how many extra recipients there are 
    var recipients = document.getElementsByClassName("page__recipientCard");
    // -1 to offset the length
    var toRemove = recipients.length - 1;
    var i;

    for (i = toRemove; i > 0; i--) {
        console.log(i)
        document.getElementById(i).remove();
    }
}

// Send Recipients Chunk
function createSendRecipientForm() {
    var send_recipientCard = document.createElement("div");
    send_recipientCard.className = "page__recipientCard";

    // Get the recipient # 
    send_recipientCard.id = document.getElementsByClassName("page__recipientCard").length;

    // Pay to
    var payToTitle = document.createElement("h3");
    payToTitle.className = "page__subtitle";
    payToTitle.innerHTML = "Pay To";
    send_recipientCard.appendChild(payToTitle);
  
    var payInput = document.createElement("input");
    payInput.className = "page__entry";
    payInput.placeholder += "Enter an Address";
    send_recipientCard.appendChild(payInput);
  
    // Amount
    var amountTitle = document.createElement("h3");
    amountTitle.className += "page__subtitle"
    amountTitle.innerHTML += "Amount";
    send_recipientCard.appendChild(amountTitle);
  
    var amountInput = document.createElement("input");
    amountInput.className = "page__entry";
    amountInput.placeholder += "Enter Amount";
    send_recipientCard.appendChild(amountInput);
    
    // Remove Recipient
    var removeButton = document.createElement("button")
    removeButton.className = "login_form__button btn btn--white btn--animated"
    removeButton.type = "button"
    removeButton.innerHTML = "Remove Recipient"
    removeButton.addEventListener("click", removeRecipient);
    send_recipientCard.appendChild(removeButton);

    return send_recipientCard
  }
  
  export function render_sendPage(main_div){
    var builder = new DocumentFragment();

    // Structure
    // - Send
    // |
    // --- Send Recipients
    // |  |
    // |  --- Recipients 1
    // |  --- Recipients 2
    // |
    // --- Send Tools 
    //     |
    //     --- Clear Button
    //     --- Add Button
    //     --- Send Button

    // Recipients parent div container
    var send_div = document.createElement("div")
    send_div.className="page"
  
    var send__recipients = document.createElement("div")
    send__recipients.className="page__recipients"
    send_div.appendChild(send__recipients)

    // Make one recipients by default
    send__recipients.appendChild(createSendRecipientForm());

    ////////////////////////////////////////////////////////
    // Constants Toolbar
    var send_tools_div = document.createElement("div")
    send_tools_div.className = "page__tools"

        // Clear All
        var clearButton = document.createElement("button")
        clearButton.className = "button"
        clearButton.setValue += "Clear All"
        clearButton.innerHTML = "Clear All"
        clearButton.addEventListener("click", function(event){
            removeAllRecipients();
        })
        send_tools_div.appendChild(clearButton)
  
        // Add New Recipient
        var addButton = document.createElement("button")
        addButton.className = "button"
        addButton.setValue += "Add Recipient"
        addButton.innerHTML = "Add Recipient"
        addButton.addEventListener("click", function(event){
            send__recipients.appendChild(createSendRecipientForm());
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