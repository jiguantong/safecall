import { ethers } from 'ethers';

async function getLatestBlockNumber() {
    const provider = new ethers.JsonRpcProvider("http://c2.collator.itering.io:9944");
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
}

let localBlock = 0;

async function main() {
    setInterval(async () => {
        const newBlock = await getLatestBlockNumber();
        if (newBlock >= localBlock) {
            localBlock = newBlock;
            // console.log("local <= new", localBlock, newBlock);
        } else {
            console.error("!!! local > new", localBlock, newBlock);
        }
    }, 1000)
}

await main();