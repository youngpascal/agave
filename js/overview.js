import * as page from "./page.js"

class overview extends page.page_renderer {
  constructor(){
    super();
    this.limit = 25
  }
  
  preRender(){
    console.log("Pre Render") 
    this.Transactions = {}
    this.registerRenderBlockingAjax("https://api.agavewallet.com/v1/assets?limit="+this.limit,this.transactionsCallback.bind(this));
    //draw a loading screen or something
  }
  
  render(div){
    console.log("Render");
    if (typeof div === undefined){
      div = page.utils.getMainDiv()
    }
    this.div = div
    setTimeout(this.checkAjax.bind(this),5,{callback:this.renderTransactions.bind(this)})
  }
  
  transactionsCallback(args,responseText){
    this.Transactions = {...this.Transactions, ...JSON.parse(responseText)}
    this.finishedAjax++;
  }

  renderTransactions(){
    var builder = new DocumentFragment()
    //var transID = Object.keys(transactions)
    console.log(this.Transactions)
    for (var x in this.Transactions){
      builder.appendChild(this.createTransactionDiv(this.Transactions[x],x))
    }
    this.div.appendChild(builder)
  }

  createTransactionDiv(transaction, transID){
   
    // Create the Div to hold it all
    var trans_div = document.createElement("div")
    trans_div.className = "overview"
  
    // add the identicon
    var overview_identicon = document.createElement("div")
    overview_identicon.className ="overview__identicon"
    var overview_identicon_canvas = document.createElement("canvas")
    overview_identicon_canvas.setAttribute("data-jdenticon-value", transID)
    overview_identicon_canvas.setAttribute("width", 80)
    overview_identicon_canvas.setAttribute("height", 80)
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
}

export {overview}