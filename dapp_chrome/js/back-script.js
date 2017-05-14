/**
 * Created by suyanlong on 2017/4/25.
 */

// use 'static';
// storage node indfomation.

// var abi = require('ethereumjs-abi');


// returns the encoded binary (as a Buffer) data to be sent
// var encoded = abi.rawEncode([ "address" ], [ "0x0000000000000000000000000000000000000000" ]);

// returns the decoded array of arguments
// var decoded = abi.rawDecode([ "address" ], data);

var serverUrl = new Map();
// serverUrl.set("http://cn.bing.com/", "http://cn.bing.com/");
var g_data="";

// var abi = EthJS.ABI;
// var BufferEX = EthJS.Buffer;

var IP = "http://192.168.137.212:8540";

var Web3 = require('web3'); //自己实现的关键字.其实就是函数.
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(IP));
var version = web3.version.api;
console.log(version); // "0.2.0"

function CreatTabStatus(tabId, status) {
    this.id = id;
    this.status = status;
}

var mapTablStatus = new Map();
var mapData = new Map();

/**
 * 0,1,2,3,
 * @type {boolean}
 */
var tabStatus = 0;
var curTabid;
// var abi = [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"website","outputs":[{"name":"num","type":"bytes32"},{"name":"orig_num","type":"string"},{"name":"status","type":"uint8"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"home","type":"string"},{"name":"time","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"num","type":"bytes32"}],"name":"get_website","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"num","type":"bytes32"},{"name":"orig_num","type":"string"},{"name":"status","type":"uint8"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"home","type":"string"},{"name":"time","type":"string"}],"name":"upload_website","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"bytes32"}],"name":"Upload_website","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"bytes32"}],"name":"Get_website","type":"event"}];
var abi = [{"constant":false,"inputs":[{"name":"num","type":"bytes32"},{"name":"orig_num","type":"string"},{"name":"status","type":"string"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"home","type":"string"},{"name":"time","type":"string"}],"name":"upload_website","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"website","outputs":[{"name":"num","type":"bytes32"},{"name":"orig_num","type":"string"},{"name":"status","type":"string"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"home","type":"string"},{"name":"time","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"num","type":"bytes32"}],"name":"get_website","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"bytes32"}],"name":"Upload_website","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"bytes32"}],"name":"Get_website","type":"event"}];
var contractAddress = "0xEa4C690E7560070071643960f20bA984c8A922cd";


function domainURI(str) {
    var durl = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    domain = str.match(durl);
    return domain[0];
}

// 网站备案/许可证号，主办单位编号，状态（通过、关停、过期），域名，网站名称，首页地址，审核时间。
var querylocateUrl = new Map();
function CreateLocateUrl() {
    this.registerId = ""; //网站备案/许可证号
    this.ownId = ""; //主办单位编号
    this.status = ""; //状态0,1,2
    this.url = ""; //域名
    // this.urlName = "";
    // this.urlOwn = "";
    this.firsAddress = ""; //首页地址
    this.checkTime = ""; //审核时间。
}

function NodeInfo(query, ip) {
    this.queryUrl = query;
    this.ip = ip;
}

var nodeInfo = new NodeInfo("http://127.0.0.1:1377", "127.0.0.1");

var nodeMapInfo = new Map();
nodeMapInfo.set("127.0.0.1", nodeInfo);


function sendTobefore(obj) {

}

//图标不要超过128px * 128px
function setIcon(status) {

    var icon = "";
    if (status == 0) {
        icon = "../images/sucess.png";

    } else if (status == 1) {
        icon = "../images/error.png";

    } else if (status == 2) {
        icon = "../images/waing.png";
    } else {
        //default -1
        icon = "../images/defalut.png";
    }
    console.log(icon);
    // chrome.browserAction.setIcon({path: '../images/'+(status?'icon19.png':'offline.png')});
    chrome.browserAction.setIcon({
        path: icon
    });
}

function storageReturnInfo(data) {
    console.log(data);
    var local = new CreateLocateUrl();
    local.registerId = data.registerId;
    local.url = data.url;
    local.checkTime = data.checkTime;
    local.firsAddress = data.firsAddress;
    local.status = data.status;
    local.ownId = data.ownId;
    querylocateUrl.set(local.url, local);
}

function queryUrlInfo(url) {
    if (nodeMapInfo.has(url)) {
        return;
    }

    var strurl = domainURI(url);
    var strurl = strurl.slice(4);

    // creation of contract object
    var MyContract = web3.eth.contract(abi);
    var myContractInstance = MyContract.at(contractAddress);
    var strId = web3.fromUtf8(strurl);
    var result = myContractInstance.get_website.call(strId);
    // if(result){
        successBack(result);
    //     setIcon(0);
    // }else{
    //     setIcon(1);
    // }

}

/**
 * //成功返回数据
 */
function successBack(data) {

    //默认 通过、关停、过期 => -1 0 1 2
    var status = 0;
    var strData={};
    strData.url = web3.toUtf8(data[0]);
    strData.checkTime = web3.toUtf8(data[1]);
    strData.urlName = web3.toUtf8(data[2]);
    strData.firsAddress = web3.toUtf8(data[3]);
    strData.ownId = web3.toUtf8(data[4]);
    strData.registerId = web3.toUtf8(data[5]);
    strData.status = web3.toUtf8(data[6]);
    if(strData.url){
        setIcon(0);

    }else{
        setIcon(1);
    }


    // setIcon(1);
    mapTablStatus.set(curTabid, status);
    g_data = strData;

    mapData.set(curTabid,strData);

    // chrome.tabs.getCurrent(function(tab){
    //     console.log(arguments);
    // });
    // chrome.tabs.query({
    //     currentWindow: true,
    //     active: true
    // }, function (tabs) {
    //     //保存当前页面的状态
    //     mapTablStatus.set(tabs[0],new CreatTabStatus(tabs[0],status,domainURI(tabs[0].url)));
    // });

}

function preCallback(details) {

    console.log("-------------------------");
    console.log(details);
    // if (querylocateUrl.has(details.url)) {
        //exist url infomation
        // querylocateUrl.get(details.url)
        //TODO

    // } else {
    //     for (let vaule of serverUrl.values()) {
    //         console.log(vaule);
    //         if (serverUrl.has(details.url)) {
    //             return;
    //         } else {
                queryUrlInfo(details.url);
            // }

        // }
    // }
    //TODO
}

(function () {
    chrome.webRequest.onBeforeRequest.addListener(
        preCallback, {
            urls: ["*://*/"]
        }, ["blocking"]
    );
})();

//TODOchrome.runtime.onMessage.addListener
chrome.runtime.onMessage.addListener(function (curTabid, sender, sendResponse) {
    // if (message == 'clickPopup') {
    // console.log(message);
    console.log(sender);
    var data = '{"registerId": "浙B2-20080224-1", "url": "www.baidu.com", "checkTime": "2017-04-25", "firsAddress": "www.baidu.com", "status": "通过", "ownId": "浙B2-20080224"}';
    //TODO
    // mapData.get(sender.tabs.Tab);
    console.log("1312312===================================");
    sendResponse(g_data);
    // }
});


/**
 * 标签页更新时的事件
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    ChangesIcodeTabStatus(tabId);
});

/**
 * 注册新切换标签页与切换已有标签时的事件
 *
 */
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo, tab) {
    curTabid = tabId;
    // mapTablStatus.set(tabs[0],new CreatTabStatus(tabs[0],status,domainURI(tabs[0].url)));
    ChangesIcodeTabStatus(tabId);

});

chrome.tabs.onRemoved.addListener(function (tabid, windwos) {
    console.log(arguments);
    mapTablStatus.remove(tabid);
});

function ChangesIcodeTabStatus(tabId) {
    if (mapTablStatus.get(tabId)) {
        setIcon(mapTablStatus.get(tabId));
    } else {

    }
}

