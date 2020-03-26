function get(uri,callback,args){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(args,this.responseText)
      }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
  }
  
  function getMainDiv(){
    // Returns the Main div element
    var main_div = document.getElementsByTagName("main")[0];
    return main_div;
  }

    export {get, getMainDiv}