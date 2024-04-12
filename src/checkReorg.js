import { ethers } from 'ethers';

const darwiniaRpc = "http://c2.darwinia-rpc.itering.io:9944/";
const darwiniaDwiller = "https://darwinia-rpc.dwellir.com";
const crabRpc = "https://crab-rpc.darwinia.network/"
const moonbeamRpc = "https://moonbeam-rpc.publicnode.com";

let lastLog;

async function getBlockByNumber(number) {
    const provider = new ethers.JsonRpcProvider(darwiniaRpc);
    const block = await provider.getBlock(number);
    const log = `--- getBlockByNumber: ${block.number}, block_time: ${block.timestamp}, hash: ${block.hash}`
    if (lastLog != log) {
        lastLog = log;
        console.log(`${new Date().getTime()}: ${log}`);
    }
    return block;
}

async function getFinalized() {
    const provider = new ethers.JsonRpcProvider(darwiniaRpc);
    const block = await provider.getBlock("finalized");
    const log = `--- getFinalized: ${block.number}, block_time: ${block.timestamp}, hash: ${block.hash}`;
    if (lastLog != log) {
        lastLog = log;
        console.log(`${new Date().getTime()}: ${log}`);
    }
    return block;
}

const range = (start, stop) =>
    Array.from({ length: stop - start }, (_, i) => start + i);

const isChainConsistent = (
    blocks,
) => {
    for (let i = blocks.length - 1; i > 1; i--) {
        if (blocks[i].parentHash !== blocks[i - 1].hash) {
            console.log("\n\t ==> !!!###@@@  unexpected hash: ", blocks[i].number, blocks[i].parentHash, blocks[i - 1].number, blocks[i - 1].hash);
            return false
        };
    }
    return true;
};

let localBlocks = [];

async function main() {
    setInterval(async () => {
        const newBlock = await getFinalized();
        if (localBlocks.length == 0) {
            localBlocks.push(newBlock);
            return;
        }
        const lastLocalBlock = localBlocks[localBlocks.length - 1];
        if (newBlock.number == lastLocalBlock.number) {
            // console.log("skip == ", newBlock.number);
        } else if (newBlock.number < lastLocalBlock.number) {
            // reorg
            console.log(`\n\t ==> ${new Date().getTime()}: !!reorg1 newBlock: ${newBlock.number} < localBlock: ${lastLocalBlock.number}\n`)
        } else if (newBlock.number > lastLocalBlock.number) {
            // normal
            const missingRange = range(lastLocalBlock.number + 1, newBlock.number);
            // console.log("missingRange: ", missingRange);
            const newBlocks = [];
            for (const missed of missingRange) {
                newBlocks.push(await getBlockByNumber(missed));
            }
            newBlocks.push(newBlock);
            if (!isChainConsistent([...localBlocks, ...newBlocks])) {
                console.log(`\n\t ==> ${new Date().getTime()}: !!!### reorg !consistent ${newBlock.number}\n`);
            } else {
                localBlocks.push(...newBlocks);
                console.log(`${new Date().getTime()}: append blocks`, lastLocalBlock.number, newBlocks[newBlocks.length - 1].number, localBlocks.length);
            }
        }
    }, 1000)
}

await main();