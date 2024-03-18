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

async function setApproved(providerUrl, chainId) {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const oracleV2ABI = [{ "inputs": [{ "internalType": "address", "name": "dao", "type": "address" }, { "internalType": "address", "name": "ormp", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "Assigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "ImportedMessageRoot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approve", "type": "bool" }], "name": "SetApproved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "SetFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "PROTOCOL", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "assign", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "feeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }, { "internalType": "bytes32", "name": "messageRoot", "type": "bytes32" }], "name": "importMessageRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "isApproved", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "messageIndex", "type": "uint256" }], "name": "merkleRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approve", "type": "bool" }], "name": "setApproved", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "uint256", "name": "fee_", "type": "uint256" }], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "fromChainId", "type": "uint256" }, { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }, { "internalType": "bytes", "name": "proof", "type": "bytes" }], "name": "verifyMessageProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    const oracleV2Contract = new ethers.Contract(oracleV2, oracleV2ABI, signer);

    const setApprovedCallData = oracleV2Contract.interface.encodeFunctionData('setApproved', [
        '0x178E699c9a6bB2Cd624557Fbd85ed219e6faBa77',
        true
    ]);

    const expiration = parseInt(1710740282350 / 1000) + 1209600; // two weeks
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

    // // exec setApproved
    // const multiSigABI = [{ "inputs": [{ "internalType": "address[]", "name": "signers", "type": "address[]" }, { "internalType": "uint64", "name": "threshold", "type": "uint64" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "AddedOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256" }], "name": "ChangedThreshold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "RemovedOwner", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "addOwnerWithThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "changeThreshold", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "doneOf", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "expiration", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "exec", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getOwners", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "removeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "oldOwner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "swapOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "verifySignatures", "outputs": [], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
    // const multiSigContract = new ethers.Contract(subAPIMultiSig, multiSigABI, signer);
    // const receipt = await multiSigContract.exec(oracleV2, 0, expiration, setApprovedCallData, signature);
    // console.log("receipt: ", receipt);
}


function mainnetApprovedSignature() {
    const chains = [
        {
            "id": 44,
            "rpc": "https://crab-rpc.darwinia.network"
        },
        {
            "id": 46,
            "rpc": "https://rpc.darwinia.network"
        },
        {
            "id": 42161,
            "rpc": "https://arbitrum-one.publicnode.com"
        },
        {
            "id": 1,
            "rpc": "https://ethereum.publicnode.com"
        },
        {
            "id": 137,
            "rpc": "https://polygon-bor-rpc.publicnode.com"
        },
        {
            "id": 81457,
            "rpc": "https://rpc.blast.io"
        }
    ]
    for(const chain of chains) {
        setApproved(chain.rpc, chain.id);
    }
}

mainnetApprovedSignature();