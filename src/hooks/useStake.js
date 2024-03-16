import { useCallback } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts.js";
import { toast } from "react-toastify"

const useStake = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async (id, amount) => {
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getStakingContract(signer);

        try {
            const transaction = await contract.stake(id, amount);
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                return toast.success("Stake successfully!");
            }

            toast.error("Staking failed!");
        } catch (error) {
            console.log("error :", error);
        }
    }, [walletProvider]);
}

export default useStake