import { ethers } from 'ethers';

const privateKey = process.env.PRIVATE_KEY;
const providerUrl = "https://crab-rpc.darwinia.network";
const receiverDappAddr = "0xA41B019F9e3B35180Af9b1BC0abC65614b2404EF";

function encodeReceiveCall() {
    const receiverABI = [{
        "inputs": [
            {
                "internalType": "bytes",
                "name": "message",
                "type": "bytes"
            }
        ],
        "name": "testReceive",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);
    const receiverDapp = new ethers.Contract(receiverDappAddr, receiverABI, signer);
    const callData = receiverDapp.interface.encodeFunctionData('testReceive', ['0x1234']);
    console.log(callData);
}

encodeReceiveCall();
