import * as page from "./page.js"
class skeleton extends page.page_renderer {
    constructor(){
      super();
      this.Transactions = {};
    }
    
    preRender(){
      console.log("Pre Render")
      this.registerRenderBlockingAjax("https://api.agavewallet.com/v1/assets",this.ajaxCallback.bind(this));
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
    
    postRender(){
        console.log("Post Render")
    }

    ajaxCallback(args,responseText){
      // DON'T REMOVE THIS OR BE SAD
      //this.Transactions = {...this.Transactions, ...JSON.parse(responseText)}
      this.finishedAjax++;
      //

    }
    renderTransactions(){
       console.log("Render Callback");
        
    }
  }