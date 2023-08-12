import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../../const/adresses";
import Cors from "cors";
import { BaseGoerli, ModeTestnet, OptimismGoerli, ZoraTestnet } from "@thirdweb-dev/chains";

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function server(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {

        await runMiddleware(req, res, cors);
        
        const { claimerAddress } = JSON.parse(req.body);

        if(!process.env.KEY_KEY) {
            throw new Error("No private key found in .env file");
        };

        const sdk = ThirdwebSDK.fromPrivateKey(
            process.env.KEY_KEY, 
            BaseGoerli
        );

        const prizeContract = await sdk.getContract(
            NFT_CONTRACT_ADDRESS,
            "nft-collection"
        );

        const questionContract = await sdk.getContract(
            CONTRACT_ADDRESS
        );

        const isCorrect = await questionContract.call(
            "isCorrect",
            [claimerAddress]
        );

        if(!isCorrect) {
            res.status(400).json({error: "You did not solve the challenge correctly"});
            return;
        };

        const hasClaimed = (await prizeContract.balanceOf(claimerAddress)).gt(0);
        if(hasClaimed) {
            res.status(400).json({error: "You have already claimed your prize"});
            return;
        };

        const payload = {
            to: claimerAddress
        };

        const signedPayload = await prizeContract.erc721.signature.generate(payload);

        res.status(200).json({
            signedPayload: JSON.parse(JSON.stringify(signedPayload)),
        });

    } catch (error) {
        res.status(500).json({error: `Server error ${error}`})
    }
}