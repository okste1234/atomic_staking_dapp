import { useEffect, useState } from "react";
import usePoolCreatedEvent from "./usePoolCreatedEvent";
import { getStakingContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useGetUserClaimableReward = () => {
    const id = usePoolCreatedEvent()

    // const id = useMemo(() => no, [no])

    const { address } = useWeb3ModalAccount()


    const [bal, setBal] = useState(0);


    useEffect(() => {
        (async () => {
            const contract = getStakingContract(readOnlyProvider);

            contract
                .getUserClaimableReward(id, address)
                .then(item => {
                    setBal(Number(item))

                })
                .catch((err) => {
                    console.error("error getting bal: ", err);
                });
        })();
    }, [address, id]);

    return bal;
};

export default useGetUserClaimableReward;


