import axios from 'axios';

async function getFeeParams() {
    const requestBody = {
        'from_chain_id': "421614",
        'to_chain_id': "44",
        'payload': "0xa33d2f60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000021234000000000000000000000000000000000000000000000000000000000000",
        'from_address': "0xd2E47519A0510a979125786e7541B2482AC9429E",
        'to_address': "0xA41B019F9e3B35180Af9b1BC0abC65614b2404EF",
        'refund_address': "0x9F33a4809aA708d7a399fedBa514e0A0d15EfA85",
    };
    const result = await axios.get("https://msgport-api.darwinia.network/ormp/fee", { params: requestBody });
    const { fee, params } = result.data.data;
    console.log(fee, params);
}

await getFeeParams();