import { useEffect, useMemo, useState } from "react";
import usePoolCreatedEvent from "./usePoolCreatedEvent";
import { getStakingContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useGetUserClaimableReward = () => {
    const poolId = usePoolCreatedEvent(); // Renamed 'no' to 'poolId' for clarity

    const id = useMemo(() => poolId, [poolId]);
    const { account: address } = useWeb3ModalAccount(); // 'address' changed to 'account'

    const [reward, setReward] = useState(0);

    useEffect(() => {
        const fetchReward = async () => {
            try {
                const contract = getStakingContract(readOnlyProvider);
                const item = await contract.getUserClaimableReward(id, address);
                setReward(Number(item));
            } catch (err) {
                console.error("Error fetching reward: ", err);
            }
        };

        if (id && address) {
            fetchReward();
        }
    }, [address, id]);

    return reward;
};

export default useGetUserClaimableReward;
