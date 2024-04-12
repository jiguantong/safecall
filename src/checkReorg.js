import { ethers } from 'ethers';

const darwiniaRpc = "http://c2.collator.itering.io:9944";
const moonbeamRpc = "https://moonbeam-rpc.publicnode.com";

async function getBlock(number) {
    const provider = new ethers.JsonRpcProvider(darwiniaRpc);
    const block = await provider.getBlock(number || "latest");
    return block;
}

const range = (start, stop) =>
    Array.from({ length: stop - start }, (_, i) => start + i);

const isChainConsistent = (
    blocks,
) => {
    for (let i = blocks.length - 1; i > 1; i--) {
        if (blocks[i].parentHash !== blocks[i - 1].hash) {
            console.log("!!!###@@@  unexpected hash: ", blocks[i].number, blocks[i].parentHash, blocks[i - 1].number, blocks[i - 1].hash);
            return false
        };
    }
    return true;
};

let localBlocks = [];

async function main() {
    setInterval(async () => {
        const newBlock = await getBlock();
        if (localBlocks.length == 0) {
            localBlocks.push(newBlock);
            return;
        }
        const lastLocalBlock = localBlocks[localBlocks.length - 1];
        if (newBlock.number == lastLocalBlock.number) {
            // console.log("skip == ", newBlock.number);
        } else if (newBlock.number < lastLocalBlock.number) {
            // reorg
            console.log(`${new Date().getTime()}: !!reorg1 newBlock: ${newBlock.number} < localBlock: ${lastLocalBlock.number}`)
        } else if (newBlock.number > lastLocalBlock.number) {
            // normal
            const missingRange = range(lastLocalBlock.number + 1, newBlock.number);
            // console.log("missingRange: ", missingRange);
            const newBlocks = await Promise.all(
                missingRange.map(getBlock)
            )
            newBlocks.push(newBlock);
            if (!isChainConsistent([...localBlocks, ...newBlocks])) {
                console.log(`${new Date().getTime()}: !!!### reorg !consistent ${newBlock.number}`);
            } else {
                localBlocks.push(...newBlocks);
                console.log(`${new Date().getTime()}: append blocks`, lastLocalBlock.number, newBlocks[newBlocks.length - 1].number, localBlocks.length);
            }
        }
    }, 1000)
}

await main();