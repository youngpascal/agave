
// Deck Spawn Options
function deckSpawnDivBuilder(mode) {
    var selectSpawn = document.createElement("option");
    selectSpawn.value = mode
    selectSpawn.innerHTML = mode

    return selectSpawn;
}

// Manage Chunk
export function render_managePage(main_div){
    var building = new DocumentFragment();

    // Structure
    // - Send
    // |
    // --- Name
    // |
    // --- Issue Mode
    // |
    // --- Number of decimals

    // Manage div container
    var manage_div = document.createElement("div");
    manage_div.className = "send";

    // Send Title
    var manage_nameTitle = document.createElement("h1");
    manage_nameTitle.className = "send__payToTitle";
    manage_nameTitle.innerHTML = "Overview";
    manage_div.appendChild(manage_nameTitle);

    // Name
    var manage_nameSubtitle = document.createElement("h3");
    manage_nameSubtitle.className = "send__payToSubtitle";
    manage_nameSubtitle.innerHTML = "Name";
    manage_div.appendChild(manage_nameSubtitle);

    var manage_nameInput = document.createElement("input");
    manage_nameInput.className = "send__payTo-entry";
    manage_nameInput.placeholder += "Enter a Deck Name";
    manage_div.appendChild(manage_nameInput);

    // Issue Mode
    var manage_issueInput = document.createElement("select");
        //"None", "Custom", "Once", "Multi", "Mono", "Singlet", "Unflushable", "Subscription"
        manage_issueInput.appendChild(deckSpawnDivBuilder("None"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Custom"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Once"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Multi"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Mono"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Singlet"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Unflushable"));
        manage_issueInput.appendChild(deckSpawnDivBuilder("Subscription"))

    // Append all the options back 
    manage_div.appendChild(manage_issueInput);

    // Add buttons
    var manage_sendButton = document.createElement("button");
    manage_sendButton.className = "button";
    manage_sendButton.innerHTML = "Create Deck";
    manage_div.appendChild(manage_sendButton);

    main_div.appendChild(manage_div)
    
}