var bip39 = require('bip39');
var http = require('http');
var request = require('request');
var crypto = require('crypto');
var coin = require('bitcoinjs-lib');
var networks = require('./networks');

var getMnemonic = function(){
    var randomBytes = crypto.randomBytes(16)
    var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
    return mnemonic
}

var getWIF = function(mnemonic, net){
    var seed = bip39.mnemonicToSeed(mnemonic);
    var network = networks[net];
    return coin.bip32.fromSeed( seed, network ).toWIF();
}

var getAddress = function( mnemonic, net ){
    var network = networks[net]
    var seed = bip39.mnemonicToSeed(mnemonic);
    var node = coin.bip32.fromSeed(seed, network);
    var address = coin.payments.p2pkh({pubkey: node.publicKey, network}).address
    return address
}

var getMaster = function(mnemonic, net){
    if( Object.keys(networks).indexOf(net) > -1){
        var seed = bip39.mnemonicToSeed(mnemonic);
        var network = networks[net];
        return JSON.stringify(coin.bip32.fromSeed( seed, network ), null, 2)
    }
}

var encryptData = function(key, data) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}
var decryptData = function(key, data) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}


var requestLoop = function(){
    setInterval(function(){
    request({
        url: "https://chainz.cryptoid.info/ppc-test/api.dws?q=getbalance&a=n49CCQFuncaXbtBoNm39gSP9dvRP2eFFSw",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log('sucess!');
        }else{
            console.log('error' + response.statusCode);
        }
    });
  }, 60000); }

  console.log(getMnemonic())
  console.log(getWIF('you bracket vacant often spell neglect hero address head destroy mask ahead','peercoin'))
  console.log(getAddress('you bracket vacant often spell neglect hero address head destroy mask ahead', 'peercoin'))