
// export function getBalance(pubKey) {
//     // getRequest("https://api.agavewallet.com/v1/assets?limit="+pageLength+"&page="+pageNumber, loadTransactions,main_div)
//     // https://chainz.cryptoid.info/ppc-test/api.dws?key=1c44fd1b6193&q=unspent&active=moRgQhaLKKEd2quvMjr4dNh1LLrfsgxUSS
//     getRequest("https://chainz.cryptoid.info/"+coinName+"/api.dws?key="+api_key+"&q=getbalance&a="+pubAddress, FUNCTIONHERE)
// }

export class Chainz {
    api_key = '5aae7ab0624d'
    api_url_fmt = 'https://chainz.cryptoid.info/{net}/api.dws?key=' + this.api_key
    explorer_url = 'https://chainz.cryptoid.info/explorer/'
    networks = {"peercoin":"ppc","peercoin-testnet": "ppc-test"}

    constructor(network_name, address) {
      this.address = address;
      this.net = this.networks[network_name];
      this.api_url = this.api_url_fmt.replace("{net}",this.net);
      this.balance = null
    }

    async getBalance() {
        var query = this.api_url + "&q=getbalance&a=" + this.address
        fetch(query).then(val => {
            this.balance = val})
        
    }
    getUnspent() {
        var query = this.api_url + "&q=unspent&active=" + this.address
        fetch(query)
        .then((res)=>{
            return res.text()})
        .then((data)=>{
            this.balance = data
        })
        //.then(res=>{console.log(res)})
    }

}
