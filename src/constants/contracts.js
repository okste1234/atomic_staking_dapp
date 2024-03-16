import { ethers } from "ethers";
import Abi from "./staking.json";

export const getStakingContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_contract_address,
        Abi,
        providerOrSigner
    );
