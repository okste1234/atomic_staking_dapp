import { useEffect, useState } from "react";
import usePoolCreatedEvent from "./usePoolCreatedEvent";
import { getStakingContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useGetUserClaimableReward = () => {
    const id = usePoolCreatedEvent()
    const { address } = useWeb3ModalAccount()


    const [reward, setReward] = useState(0);


    useEffect(() => {
        const contract = getStakingContract(readOnlyProvider);

        contract
            .getUserClaimableReward(id, address)
            .then(item => {
                setReward(Number(item))

            })
            .catch((err) => {
                console.error("error fetching pool: ", err);
                setReward(0);
            });
    }, [id, address]);

    return reward;
};

export default useGetUserClaimableReward;


