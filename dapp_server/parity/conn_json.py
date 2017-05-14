#!/usr/bin/python
import requests
import json
'''
:python3
:JSON RPC '''

#curl --data '{"method":"parity_enode","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545
def parity_enode(url, headers):
    payload = {
        'jsonrpc': '2.0',
        'method': 'parity_enode',
        'params': [],
        'id': 1
    }
    result = requests.post(url, data=json.dumps(payload), headers=headers)
    enode = json.loads(result.text)['result']
    return enode

#curl --data '{"method":"parity_addReservedPeer","params":["enode://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@22.99.55.44:7770"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545
def parity_addReservedPeer(url, headers,enode):
    payload = {
        'jsonrpc': '2.0',
        'method': 'parity_addReservedPeer',
        'params': [
            enode
        ],
        'id': 1
    }
    result = requests.post(url, data=json.dumps(payload), headers=headers)
    get_org = json.loads(result.text)
    return get_org['result']


if __name__ == '__main__':
    url0 = 'http://192.168.137.212:8540'
    headers = {"Content-Type": "application/json"}
    enode0 = parity_enode(url0, headers)
    print (enode0)
    url1 = 'http://192.168.137.212:8541'
    result = parity_addReservedPeer(url1, headers, enode0)
    print (result)
