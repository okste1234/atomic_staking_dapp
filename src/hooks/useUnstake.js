import { useCallback } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts.js";
import { toast } from "react-toastify"

const useUnStake = () => {
    const { walletProvider } = useWeb3ModalProvider();


    return useCallback(async (id) => {
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getStakingContract(signer);

        try {
            const transaction = await contract.unstake(id);
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                return toast.success("Unstake successfully!");
            }

            toast.error("failed!");
        } catch (error) {
            console.log("error :", error);
        }
    }, [walletProvider]);
}

export default useUnStake