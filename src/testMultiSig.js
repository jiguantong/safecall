import { ethers } from 'ethers';
import { keccak256 } from "ethers";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const TronWeb = require('tronweb')

const privateKey = process.env.PRIVATE_KEY;
const tronPrivateKey = process.env.TRON_PRIVATE_KEY;
const providerUrl = "https://arbitrum-sepolia.publicnode.com";
const subAPIMultiSig = "0x000000000d60704384100A29efb6C9cf8cD72820";
const oracleV2 = "0x0000000003ebeF32D8f0ED406a5CA8805c80AFba";
// testAddr
// const subAPIMultiSig = "0x1b170067ABaef9aa98B82F829b1D4CC2068a0aBB";
// const oracleV2 = "0xE637F766Dc0d914903F6654c1Ad4ad8097258D25";

async function testImportMessageRoot() {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const oracleV2ABI = [{ "inputs": [{ "internalType": "address", "name": "dao", "type": "address" }, { "internalType": "address", "name": "ormp", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "Assigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "ImportedMessageRoot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approve", "type": "bool" }], "name": "SetApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "SetFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "PROTOCOL", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "assign", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "feeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "importMessageRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "isApproved", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }], "name": "merkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approve", "type": "bool" }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "fee_", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "fromChainId", "type": "uint256" }, { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "internalType": "bytes", "name": "proof", "type": "bytes" }], "name": "verifyMessageProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const oracleV2Contract = new ethers.Contract(oracleV2, oracleV2ABI, signer);

    const importRootCallData = oracleV2Contract.interface.encodeFunctionData('importMessageRoot', [
        1, // chainId
        2, // messageIndex
        '0x59d257dea734dcd4e732957c019601d6562fabcdad2298e7aa36c4f2417157c4' // messageRoot
    ]);

    const expiration = parseInt(Date.now() / 1000) + 1209600; // two weeks
    const toSignData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'address', 'uint256', 'uint256', 'bytes'], [
        1, // exec on chain Id,
        subAPIMultiSig, // MultiSig address
        oracleV2, // oracleV2 address
        0, // value, 0, don't need pay for it.
        expiration, // expiration
        importRootCallData // call importMessageRoot
    ]);
    const hash = keccak256(toSignData);
    const signature = await signer.signMessage(
        ethers.getBytes(hash)
    );
    console.log(`expiration: ${expiration}\nimportRootCallData: ${importRootCallData}\ntoSignData: ${toSignData}\nhash: ${hash}\nsignature: ${signature}`);

    // exec importMessageRoot
    const multiSigABI = [{ "inputs": [{ "internalType": "address[]", "name": "signers", "type": "address[]" }, { "internalType": "uint64", "name": "threshold", "type": "uint64" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "AddedOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256" }], "name": "ChangedThreshold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "RemovedOwner", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "addOwnerWithThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "changeThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "doneOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "exec", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getOwners", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "removeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "oldOwner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "swapOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "verifySignatures", "outputs": [], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const multiSigContract = new ethers.Contract(subAPIMultiSig, multiSigABI, signer);
    const receipt = await multiSigContract.exec(oracleV2, 0, expiration, importRootCallData, signature);
    console.log("receipt: ", receipt);
}

async function testChangeOwner() {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const oracleV2ABI = [{ "inputs": [{ "internalType": "address", "name": "dao", "type": "address" }, { "internalType": "address", "name": "ormp", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "Assigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "ImportedMessageRoot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approve", "type": "bool" }], "name": "SetApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "SetFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "PROTOCOL", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "assign", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "feeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "importMessageRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "isApproved", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }], "name": "merkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approve", "type": "bool" }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "fee_", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "fromChainId", "type": "uint256" }, { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "internalType": "bytes", "name": "proof", "type": "bytes" }], "name": "verifyMessageProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const oracleV2Contract = new ethers.Contract(oracleV2, oracleV2ABI, signer);

    const changeOwnerCallData = oracleV2Contract.interface.encodeFunctionData('changeOwner', [
        '0x0f14341A7f464320319025540E8Fe48Ad0fe5aec' // address
    ]);

    const expiration = 1708238116; // two weeks
    const toSignData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'address', 'uint256', 'uint256', 'bytes'], [
        421614, // exec on chain Id,
        subAPIMultiSig, // MultiSig address
        oracleV2, // oracleV2 address
        0, // value, 0, don't need pay for it.
        expiration, // expiration
        changeOwnerCallData // call importMessageRoot
    ]);
    const hash = keccak256(toSignData);
    const signature = await signer.signMessage(
        ethers.getBytes(hash)
    );
    console.log(`expiration: ${expiration}\nchangeOwnerCallData: ${changeOwnerCallData}\ntoSignData: ${toSignData}\nhash: ${hash}\nsignature: ${signature}`);

    // exec importMessageRoot
    const multiSigABI = [{ "inputs": [{ "internalType": "address[]", "name": "signers", "type": "address[]" }, { "internalType": "uint64", "name": "threshold", "type": "uint64" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "AddedOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256" }], "name": "ChangedThreshold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "RemovedOwner", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "addOwnerWithThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "changeThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "doneOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "exec", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getOwners", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "removeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "oldOwner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "swapOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "verifySignatures", "outputs": [], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const multiSigContract = new ethers.Contract(subAPIMultiSig, multiSigABI, signer);
    // const receipt = await multiSigContract.exec(oracleV2, 0, expiration, changeOwnerCallData, signature);
    // console.log("receipt: ", receipt);
}

// convert Tron address => hex: https://tron-converter.com/
async function tronImportMessageRoot() {

    const subAPIMultiSig = "0x7f24eF8c1405832966fa0e47a3E43ABaD44dA276";
    const oracleV2 = "0x7f24eF8c1405832966fa0e47a3E43ABaD44dA276";

    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const oracleV2ABI = [{ "inputs": [{ "internalType": "address", "name": "dao", "type": "address" }, { "internalType": "address", "name": "ormp", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "Assigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "ImportedMessageRoot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approve", "type": "bool" }], "name": "SetApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "SetFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "PROTOCOL", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "assign", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "feeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "importMessageRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "isApproved", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }], "name": "merkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approve", "type": "bool" }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "fee_", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "fromChainId", "type": "uint256" }, { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "internalType": "bytes", "name": "proof", "type": "bytes" }], "name": "verifyMessageProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const oracleV2Contract = new ethers.Contract(oracleV2, oracleV2ABI, signer);

    const importRootCallData = oracleV2Contract.interface.encodeFunctionData('importMessageRoot', [
        2494104990, // chainId
        2, // messageIndex
        '0x59d257dea734dcd4e732957c019601d6562fabcdad2298e7aa36c4f2417157c4' // messageRoot
    ]);

    const expiration = parseInt(Date.now() / 1000) + 1209600; // two weeks
    const toSignData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'address', 'uint256', 'uint256', 'bytes'], [
        2494104990, // exec on chain Id,
        subAPIMultiSig, // MultiSig address
        oracleV2, // oracleV2 address
        0, // value, 0, don't need pay for it.
        expiration, // expiration
        importRootCallData // call importMessageRoot
    ]);
    const hash = keccak256(toSignData);
    const signature = await signer.signMessage(
        ethers.getBytes(hash)
    );
    console.log(`expiration: ${expiration}\nimportRootCallData: ${importRootCallData}\ntoSignData: ${toSignData}\nhash: ${hash}\nsignature: ${signature}`);

    //============================= Tron =============================

    const tronWeb = new TronWeb({
        fullHost: 'https://api.shasta.trongrid.io',
        privateKey: tronPrivateKey
    })

    try {
        const unsignedTx = await tronWeb.transactionBuilder.triggerSmartContract(subAPIMultiSig.replace("0x", "41"), "exec(address,uint256,uint256,bytes,bytes)", {},
            [{ type: 'address', value: oracleV2 }, { type: 'uint256', value: 0 }, { type: 'uint256', value: expiration }, { type: 'bytes', value: importRootCallData }, { type: 'bytes', value: signature }],
            // issuerAddress
            "0xBFD18697f12Eda1a727cF50f203a5a5725724687".replace("0x", "41"));
        console.log("tx: ", unsignedTx);
        const signedTx = await tronWeb.trx.sign(unsignedTx.transaction, tronPrivateKey);

        var result = await tronWeb.trx.broadcast(signedTx);
        console.log("result", result);
    } catch (e) {
        console.error(e);
    }
}

async function setApproved(providerUrl, chainId, signatures) {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const oracleV2ABI = [{ "inputs": [{ "internalType": "address", "name": "dao", "type": "address" }, { "internalType": "address", "name": "ormp", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "Assigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "ImportedMessageRoot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approve", "type": "bool" }], "name": "SetApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "SetFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "PROTOCOL", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "assign", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "feeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "importMessageRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "isApproved", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }], "name": "merkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approve", "type": "bool" }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "fee_", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "fromChainId", "type": "uint256" }, { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "internalType": "bytes", "name": "proof", "type": "bytes" }], "name": "verifyMessageProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const oracleV2Contract = new ethers.Contract(oracleV2, oracleV2ABI, signer);
    const expiration = parseInt(1710740282350 / 1000) + 1209600; // two weeks
    const setApprovedCallData = oracleV2Contract.interface.encodeFunctionData('setApproved', [
        '0x178E699c9a6bB2Cd624557Fbd85ed219e6faBa77',
        true
    ]);
    if (!signatures) {
        const toSignData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'address', 'uint256', 'uint256', 'bytes'], [
            chainId, // exec on chain Id,
            subAPIMultiSig, // MultiSig address
            oracleV2, // oracleV2 address
            0, // value, 0, don't need pay for it.
            expiration, // expiration
            setApprovedCallData // call importMessageRoot
        ]);
        const hash = keccak256(toSignData);
        const signature = await signer.signMessage(
            ethers.getBytes(hash)
        );
        console.log(`chainId: ${chainId}\nexpiration: ${expiration}\nsetApprovedCallData: ${setApprovedCallData}\ntoSignData: ${toSignData}\nhash: ${hash}\nsignature: ${signature}\n===\n`);
    } else {
        // exec setApproved
        const multiSigABI = [{ "inputs": [{ "internalType": "address[]", "name": "signers", "type": "address[]" }, { "internalType": "uint64", "name": "threshold", "type": "uint64" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "AddedOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256" }], "name": "ChangedThreshold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "RemovedOwner", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "addOwnerWithThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "changeThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "doneOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "exec", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getOwners", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "removeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "oldOwner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "swapOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "verifySignatures", "outputs": [], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
        const multiSigContract = new ethers.Contract(subAPIMultiSig, multiSigABI, signer);
        const receipt = await multiSigContract.exec(oracleV2, 0, expiration, setApprovedCallData, signatures);
        console.log(`chainId: ${chainId} receipt: \n`, receipt, "\n===\n");
    }
}


// !!! sort signatures
function mainnetApprovedSignature() {
    const chains = [
        {
            "id": 44,
            "rpc": "https://crab-rpc.darwinia.network",
            "signatures": "0xe351521c520ce94b5d204dc2b76a3355cabeaa5adb0070076e54dee66de960bb3b16ad0d1a8be604a61f9c18b603b5f6daa30c7004a551c1d633325ae29a4a041b094c41bcce8fc6a31e207dcd1a72f2661d9ece2d472f05587b5944d83a955e1f32ddbd3e445583c23fc84f7892fd549b979a4cb2145a2bcfdda91cac038f8e1b1cd7a81ae0ec59170dea3c19e4eb5bcf48ae6f7a45faf758312b4b251b273cd006185a908c8602be9ac06e7a42e1fe51d730ca0039c5ae62bc7dfd4779dcf794821b"
        },
        {
            "id": 46,
            "rpc": "https://rpc.darwinia.network",
            "signatures": "0xc7468eed4f2393727c71d0f808a92fe82e4399ac77a035d7447a3fa6db523736032ffd85fa8699c7d096d63d72d7a256d9fb1a545a489a199afe90da677198c61c3850587a81a575c5d03f92758dc767be534f8088b833fe21b131accc70f770894fa196606552744b266bac5867a5f3483928037ea72bcb77702939c7a7e03f221c0094f86b42571fc09a37a9709568ea3609c9198eea38a99dce86d26c41c919aa234450a6378b43e1ca1ab50782ebdced43f5428acbb9f3fe9085ccdcba2a31001b"
        },
        {
            "id": 42161,
            "rpc": "https://arbitrum-one.publicnode.com",
            "signatures": "0x6e7608ddfd6ea60e2ead9db8b61c857998bb572566404eaee5aae485256ace6e4fe1facc1683a9355978738eded14dd0c1e42ee214e5b8a8c264c0857256c3ec1b60b9fc4dcdadea5106b8bff65ac7788d29e80fe59547dd6a02dfd9d001c1881e609c1ab6a9ae7beab9fa9a843e2e9f33ea2fa6edbd067b83452cdbc4a0fd0af01b2fe71695d0c3ae1d130e877e70ba5871ac1cdf0e29ad654a4029e00d9322c7525f469e2a73c5aec697751a210c77765cb39f63fa069ba017a5de3a61de50cf331b"
        },
        {
            "id": 1,
            "rpc": "https://ethereum.publicnode.com",
            "signatures": "0x4ca5e4c627a7f2ce48cc21fae40fa0e240cf8a77e1941081cfde700a0307050a327377af7cbc9406c1eebeb09b934afb79d493b7ccabc65a5c5188e332e79d161bee310826f8312b3ee5d265e8eb0bc43d601ab39ad17100fcbc65b753fc9f0dc834cdac025203b61091da7b04a9a40f8bbf92becb0608199dd54efb43d6a60e181bab3820a643cd924808d17936ba4301d273ef65dc9799593ddcd42297752408d457da71683052959c66822b93f8daf46e189a05e66786fe0fd2435c5ea4d67b2f1c"
        },
        {
            "id": 137,
            "rpc": "https://polygon-bor-rpc.publicnode.com",
            "signatures": "0xd68cf166a26a0f31e93791dcd2e7c1f21ef992b191d128d98b36b1b77503ccb316d565ad8bdb83bb8951b6bb2c6df8143735d368a2c70281ff31fad42fccc7cc1b0bc23b1bc6f735eb19f1b58f703ad126b314145f5415fdde31282f3dedd75fa84768b83ee5c704af9450c489809c017ab4965e28b1f0493ba308a4545880b6c21bb2ada0607433fefcc308069efb10d8edea1c35ad41c101d1950ba248c813c5487b0273a1fe6e3ac6c672ee5b5f1d1d819ae6ddbb8edc26b3ea9a7ee66587b7941b"
        },
        {
            "id": 81457,
            "rpc": "https://rpc.blast.io",
            "signatures": "0xa40aba7c0bb025e8cf157dc6ff78889bd00c28a245a17e24307e21c0cbc478fc381daf72777b35924d36d8fb0ae80402d54476dce6209482a3695861249c31541c5fbb93b30694f64a39ac81e8e7bbea7457a7b814945865dd9ab726b25a6ee1a107f09bc3908ef72818afa589d9de675ac20271f36451f7e35df5e230d10795701c244e64a7690348c06116526f9d64c0c83cc5f38889d1c19403a0ce2b8a1f4887222f6df9d09fc6f80910d0bf263873ada0aa42cfc5262939febdf7b0c3c6e4b71c"
        }
    ]
    for (const chain of chains) {
        setApproved(chain.rpc, chain.id, chain.signatures);
    }
}

mainnetApprovedSignature();