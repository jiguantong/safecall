
import { ethers } from "ethers";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const abi = require("../abis/SubAPISignaturePub.json");


const providerUrl = "http://c2.darwinia-rpc.itering.io:9944/";
const address = "0xb2aa34fde97ffdb6197dd5a2be23c2121405cc12";


const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, signer);

async function main() {
    for (let i = 0; i < 1000; i++) {
        console.log("Prepare submit: ", i);
        const tx = await contract['submit'](
            465,
            "0x42165Ce95b51D1B845C190C96fB30c4FeF6Abce4",
            i,
            "0x1234",
            "0x1234",
        )
        await tx.wait();
        console.log("submit: ", i);
        await sleep(3000);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

await main();