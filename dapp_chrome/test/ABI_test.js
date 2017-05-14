/**
 * Created by suyanlong on 17-5-12.
 */


// import {ABI,Buffer}from "../js/ethereumjs-all";

window.onload = function() {
    var abi = EthJS.ABI;
    var BufferEX = EthJS.Buffer;

    console.log(BufferEX);
    var a = abi.rawDecode(['string'],new BufferEX.Buffer('000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000016100000000000000000000000000000000000000000000000000000000000000', 'hex'));

    console.log("------------------------begin-------------");
    console.log(a);
    console.log("-----------------------------end~");

    // var a = abi.methodID('baz', ['uint32', 'bool']).toString('hex') + abi.rawEncode(['uint32', 'bool'], [69, 1]).toString('hex')
    // var b = 'cdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001'
    // assert.equal(a, b)
    var param = abi.methodID('get_org',['uint']).toString('hex') + abi.rawEncode(['uint'],[123]).toString('hex');

    // function get_org(uint num) constant returns(uint,string,uint,string){



};