import { ethers } from 'ethers';
import axios from 'axios';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Safe = require('@safe-global/protocol-kit');

const privateKey = process.env.PRIVATE_KEY;

const oracleV2Addr = "0x0000000005Be70A35b6534bFBd21eC0c98B27b1f";
const contractMultiSig = "0x000000000C1Ab3d46b1FF59C29aeF0Dd1e8369e8";
const safeAddress = '0x00000000079b20FEd6365B38f299D40236A90119';

async function changeCrabOracleOwner() {
    const _provider = new ethers.JsonRpcProvider("https://crab-rpc.darwinia.network");
    // init safe sdk
    const _signer = new ethers.Wallet(privateKey, _provider);
    const _adapter = new Safe.EthersAdapter({
        ethers: ethers,
        signerOrProvider: _signer
    });
    const safeSdk = await Safe.default.create({
        ethAdapter: _adapter,
        safeAddress
    })

    const oracleABIJson = [{ "inputs": [{ "internalType": "address", "name": "dao", "type": "address" }, { "internalType": "address", "name": "ormp", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "Assigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "ImportedMessageRoot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approve", "type": "bool" }], "name": "SetApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "SetFee", "type": "event" }, { "inputs": [], "name": "PROTOCOL", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "assign", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner_", "type": "address" }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "feeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "importMessageRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "isApproved", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "merkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approve", "type": "bool" }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "fee_", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "fromChainId", "type": "uint256" }, { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "internalType": "bytes", "name": "proof", "type": "bytes" }], "name": "verifyMessageProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const oracleV2 = new ethers.Contract(oracleV2Addr, oracleABIJson, _signer);
    const callData = oracleV2.interface.encodeFunctionData('changeOwner', [contractMultiSig]);
    console.log("#######vvvv calldata", callData);

    const safeTransactionData = {
        to: oracleV2Addr,
        value: '0',
        data: callData
    }

    const safeABI = [{ "inputs": [], "name": "nonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwners", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }]
    const safeContract = new ethers.Contract("0x00000000079b20FEd6365B38f299D40236A90119", safeABI, _provider);
    const nonce = parseInt(await safeContract.nonce());
    console.log("nonce", nonce);
    const safeTransaction = await safeSdk.createTransaction({ transactions: [safeTransactionData], options: { nonce: nonce } });
    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
    const senderSignature = await safeSdk.signTransactionHash(safeTxHash);
    console.log(senderSignature, safeTxHash);
}

changeCrabOracleOwner();