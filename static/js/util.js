$(document).ready(function() {

    var clearSession = function(){
        sessionStorage.clear();
    }

    var getNetwork = function() {
        return $("#networks").val(); 
    };

    var getHD = function(mnemonic, network){
        var master = getMaster(mnemonic, network);
        return master
    };

    var getPhrase = function(){
        var mnemonic = getMnemonic();
        $("#passphrase2").val(mnemonic);
    };

    var setKey = function( passkey, data, mnemonic){
        var encrypted = encryptData( passkey, data );
        sessionStorage.setItem( 'lockedKey', encrypted);
        var network = $("#networks").val();
        sessionStorage.setItem( 'network', network);
        var address = getAddress( mnemonic, network);
        sessionStorage.setItem( 'address', address);
        $('#network').html(network);
    }
    
    $('#getMnemonic').on('click', getPhrase);

    $('#newKey').on('click', function(){
        var passkey = $('#passkey2').val();
        var mnemonic = $("#passphrase2").val();
        var network = $("#networks").val();
        var data = getWIF(mnemonic, network) ;
        setKey( passkey, data,mnemonic );
        $("#signin-modal").removeClass('cd-signin-modal--is-visible');
        return false;
    })

    $('#existingKey').on('click', function(){
        var passkey = $('#passkey1').val();
        var mnemonic = $("#passphrase1").val();
        var network = $("#networks").val();
        var data = getWIF(mnemonic, network) ;
        setKey( passkey, data, mnemonic );
        $("#signin-modal").removeClass('cd-signin-modal--is-visible');
        return false;
    })

    $('#signout').on('click', function(){
        clearSession();

    })
    requestLoop()
});