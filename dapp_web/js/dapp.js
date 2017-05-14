/**
 * Created by suyanlong on 17-5-13.
 */
var web3;
var isChangeIP = false;
var IP = "http://192.168.137.212:8540";
// var IP = "ws://192.168.137.104:8546/";
var contractAddress = '0x5F3DBa5e45909D1bf126aA0aF0601B1a369dbFD7';

// {"from": "0x004ec07d2329997267ec62b4166639513386f32e"};

var abi = [{
    "constant": false,
    "inputs": [{
        "name": "num",
        "type": "bytes32"
    }, {
        "name": "orig_num",
        "type": "string"
    }, {
        "name": "status",
        "type": "string"
    }, {
        "name": "domain",
        "type": "bytes32"
    }, {
        "name": "name",
        "type": "bytes32"
    }, {
        "name": "home",
        "type": "string"
    }, {
        "name": "time",
        "type": "string"
    }],
    "name": "upload_website",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "bytes32"
    }],
    "name": "website",
    "outputs": [{
        "name": "num",
        "type": "bytes32"
    }, {
        "name": "orig_num",
        "type": "string"
    }, {
        "name": "status",
        "type": "string"
    }, {
        "name": "domain",
        "type": "bytes32"
    }, {
        "name": "name",
        "type": "bytes32"
    }, {
        "name": "home",
        "type": "string"
    }, {
        "name": "time",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "num",
        "type": "bytes32"
    }],
    "name": "get_website",
    "outputs": [{
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "string"
    }, {
        "name": "",
        "type": "string"
    }, {
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "bytes32"
    }, {
        "name": "",
        "type": "string"
    }, {
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "num",
        "type": "bytes32"
    }],
    "name": "Upload_website",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "num",
        "type": "bytes32"
    }],
    "name": "Get_website",
    "type": "event"
}];

$(function () {
    var $subblock = $(".subpage");
    var $head = $subblock.find('h2');
    var $ul = $("#proinfo");
    var $lis = $ul.find("li");
    inter = false;
    $head.click(function (e) {
        e.stopPropagation();
        if (!inter) {
            $ul.show();
        } else {
            $ul.hide();
        }
        inter = !inter;
    });

    $ul.click(function (event) {
        event.stopPropagation();
    });

    $(document).click(function () {
        $ul.hide();
        inter = !inter;
    });

    $lis.hover(function () {
        if (!$(this).hasClass('nochild')) {
            $(this).addClass("prosahover");
            $(this).find(".prosmore").removeClass('hide');
        }
    }, function () {
        if (!$(this).hasClass('nochild')) {
            if ($(this).hasClass("prosahover")) {
                $(this).removeClass("prosahover");
            }
            $(this).find(".prosmore").addClass('hide');
        }
    });
    var Web3 = require('web3'); //自己实现的关键字.其实就是函数.
    web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(IP));
    if (web3.isConnected()) {
        alert("conneced......");
    } else {
        alert("no connect......");
    }
    $('.commitInfo1').click(function () {
        var registerId = $("#registerId")[0].value;
        var ownId = $("#ownId")[0].value;
        var firstAddress = $("#firstAddress")[0].value;
        var urlName = $("#urlName")[0].value;
        var checkTime = $("#checkTime")[0].value;
        var url = $("#url")[0].value;
        sendMsg(1, url, checkTime, urlName, firstAddress, ownId, registerId);
    });

    $('.commitInfo2').click(function () {
        var urlName = $("#OwnId1")[0].value;
        var url = $("#OwnName")[0].value;
        var firstAddress = $("#OwnType")[0].value;
        var date = $("#OwnPerson")[0].value;
        sendMsg(2, urlName, url, firstAddress, date);

    });

    $('.commitInfo3').click(function () {
        var nodeName = $("#nodeName")[0].value;
        var nodeType = $("#nodeType")[0].value;
        var nodeStatus = $("#nodeStatus")[0].value;
        var nodePub = $("#nodePub")[0].value;
        var nodePort = $("#nodePort")[0].value;
        var addTime = $("#addTime")[0].value;
        sendMsg(3, nodeName, nodeType, nodeStatus, nodePub, nodePort, addTime);
    });

});

function exchangeWeb3Node() {
    web3.setProvider(new web3.providers.HttpProvider(IP));
    if (web3.isConnected()) {
        alert("conneced......");
    } else {
        alert("no connect......");
    }
}

function sendMsg(num, id, param) {
    if (isChangeIP) { //改变管理节点

    } else {

    }
    if (web3.isConnected()) {
        // alert("conneced......");
    } else {
        alert("no connect......");
    }
    // creation of contract object
    var MyContract = web3.eth.contract(abi);
    // initiate contract for an address
    var myContractInstance = MyContract.at(contractAddress);
    console.log("--------------");
    console.log(myContractInstance);
    console.log(web3.eth.accounts[0]);
    console.log(web3.eth.accounts);
    // var account = web3.personal.unlockAccount(web3.eth.accounts[0], 'user');
    // if(!account){
    //     alert("账户未解锁或未知");
    // }
    var send_trans;
    if (num == 1) {
        var strId1 = web3.fromUtf8(arguments[1]);
        var strId2 = web3.fromUtf8(arguments[2]);
        var strId3 = web3.fromUtf8(arguments[3]);
        var strId4 = web3.fromUtf8(arguments[4]);
        var strId5 = web3.fromUtf8(arguments[5]);
        var strId6 = web3.fromUtf8(arguments[6]);
        var strId7 = web3.fromUtf8("通过");
        send_trans = myContractInstance.upload_website.sendTransaction(strId1, strId2, strId3, strId4, strId5, strId6, strId7, {
            "from": web3.eth.accounts[0]
        });

    } else if (num == 2) {
        send_trans = myContractInstance.upload_org.sendTransaction(strId, arguments[2], arguments[3], arguments[4], {
            "from": "0x004ec07d2329997267ec62b4166639513386f32e"
        });

    } else if (num == 3) {
        send_trans = myContractInstance.upload_org.sendTransaction(strId, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], {
            "from": "0x004ec07d2329997267ec62b4166639513386f32e"
        });
    }

    // alert(send_trans);
    if (send_trans) {
        alert("上传成功!");
    } else {
        alert("上传失败!");
    }

    // call constant function
    // var str = web3.toHex(123);
    // var result = myContractInstance.upload_org.call(str);
    // console.log(result); // '0x25434534534'
}

function dClickNode() {


}


function conectNode() {
    web3.setProvider(new web3.providers.HttpProvider(IP));
    if (web3.isConnected()) {
        // alert("已经连接");
    } else {
        alert("未连接");
    }

    var version = web3.version.api;
    console.log(version); // "0.2.0"
    // alert(version);
    // creation of contract object
    var MyContract = web3.eth.contract(abi);
    // initiate contract for an address
    var myContractInstance = MyContract.at('0x3E0daEc7B626Bf173216Ad18Eaf2E349C1527Ce2');
    // call constant function
    var result = myContractInstance.get_org.call('123');
    console.log(result); // '0x25434534534'
}