import { useCallback } from "react";
import { getProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts.js";
import { toast } from "react-toastify"
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

const useCreatePool = () => {
    const { walletProvider } = useWeb3ModalProvider();

    return useCallback(async (rate) => {
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getStakingContract(signer);

        try {
            const transaction = await contract.createPool(rate);
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                return toast.success("Pool Created Successfully!");
            }

            toast.error("Pool creation failed!");
        } catch (error) {
            console.log("error :", error);
        }
    }, [walletProvider]);
}

export default useCreatePool