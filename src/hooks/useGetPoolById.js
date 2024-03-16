import { useEffect, useState } from "react";
import usePoolCreatedEvent from "./usePoolCreatedEvent";
import { getStakingContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";

const useGetPoolById = () => {
    const id = usePoolCreatedEvent()

    // const id = useMemo(() => no, [no])

    const [pool, setPool] = useState({
        loading: true,
        data: [],
    });


    useEffect(() => {
        const contract = getStakingContract(readOnlyProvider);
        contract
            .getPoolByID(id)
            .then(item => {
                const converted = ({
                    totalStakers: Number(item[0]),
                    totalStaked: Number(item[1]),
                    rewardReserve: Number(item[2]),
                    rewardRate: Number(item[3])
                })
                setPool({
                    loading: false,
                    data: Array(converted)
                });
            })
            .catch((err) => {
                console.error("error fetching pool: ", err);
                setPool((prev) => ({ ...prev, loading: false }));
            });
    }, [id]);

    return { pool, id };
};

export default useGetPoolById;

