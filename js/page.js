import * as utils from "./page_utilities.js"

class page_renderer {
  constructor(){
    console.log("Constructor")
    this.ajaxCount = 0;
    this.finishedAjax = 0;
    if (this.constructor === page_renderer) {
            throw new TypeError('Abstract class "page_renderer" cannot be instantiated directly.'); 
        }
    this.builder = new DocumentFragment()
  }
  
  renderPage(div){
    this.preRender();
    this.render(div);
    this.postRender();
  }
  
  checkAjax(args){
    if (this.ajaxCount > this.finishedAjax){
      setTimeout(this.checkAjax.bind(this),5,args)
    }
    else {
      args["callback"](args["args"])
    }
  }
  
  registerRenderBlockingAjax(uri,callback,args){
    this.ajaxCount++;
    utils.get(uri,callback,args)
  }

  preRender(){
    console.log("Pre Render")
  }

  render(div){
    console.log("Render")
  }
  
  postRender(){
    console.log("Post Render")
  }
}

export { page_renderer, utils}