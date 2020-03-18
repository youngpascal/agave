const pb = require("./peerassets_pb");
const Buffer = require('buffer').Buffer;
const assert = require('assert');

"use strict";

class DeckSpawn{
	constructor(version, name, numberOfDecimals, issueMode, assetSpecificData) {
		this.ds = new pb.DeckSpawn();
		this.ds.setVersion(version);
		this.ds.setName(name);
		this.ds.setNumberOfDecimals(numberOfDecimals);
		this.ds.setIssueMode(issueMode);
		this.ds.setAssetSpecificData(Buffer.from( assetSpecificData ));
		return this
	}
	toObject(){
		return this.ds.toObject();
	}
	serialize(){
		var buffer = this.ds.serializeBinary();
		return Buffer.from( buffer )
	}
	validate(){
		return Validate(this.ds)
	}
}

class CardTransfer{
	constructor(version, amountList, numberOfDecimals, assetSpecificData) {
		this.ct = new pb.CardTransfer();
		this.ct.setVersion(version);
		this.ct.setAmountList(amountList);
		this.ct.setNumberOfDecimals(numberOfDecimals);
		this.ct.setAssetSpecificData(Buffer.from( assetSpecificData ));
	}
	toObject(){
		return this.ct.toObject();
	}
	serialize(){
		var buffer = this.ds.serializeBinary();
		return Buffer.from( buffer )
	}
}

class Enforce {
	constructor(obj){
		this.obj = obj.toObject();

		this.version = function(){
			assert( typeof(this.obj.version) === 'number', 'Error: Version input must be a number.');
		}
		this.name = function(){
			assert( typeof(this.obj.name) === 'string',  'Error: Name input must be a string.');
		}
		this.numberOfDecimals = function(){
			assert( typeof(this.obj.numberOfDecimals) === 'number',  'Error: Decimal input must be numerical.');
		}
		this.issueMode = function(){
			var mode = this.obj.issueMode 
			if (!Object.values) Object.values = o=>Object.keys(o).map(k=>o[k]);
			var modes = Object.values(proto.DeckSpawn.MODE);
			function isIn( val ){ var check = mode & val; return check === mode }
			assert( modes.some(isIn) , 'Error: Invalid issue mode.');
		}
		this.assetSpecificData = function(){
			assert( typeof(this.obj.assetSpecificData.toString()) === 'string', 'Error: Data input must be a string.');
		}
		this.amountList = function(){
			assert( this.obj.amountList instanceof Array, 'Error: Amount input Must be an array.');
			function isNumber( val ){ return typeof(val) === 'number' };
			assert( this.obj.amountList.every(isNumber), 'Error: All values in Array must be numerical');
		}
	}
}

function Validate(obj){
	var type = obj.constructor.name;
	var check = new Enforce(obj);

	check.version();
	check.numberOfDecimals();
	check.assetSpecificData();

	if( type === 'DeckSpawn' ){
		check.name();
		check.issueMode();
		return true;
	}
	else if( type === 'CardTransfer' ){
		check.amountList();
		return true;
	} else { return 'wat'; }
}


module.exports = {
	DeckSpawn,
	CardTransfer,
	Validate
}