import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";


const usePoolCreatedEvent = () => {
    const [id, setId] = useState();

    const eventListerner = useCallback((log) => {
        const ids = String(log.data)

        const decodedId = ethers.AbiCoder.defaultAbiCoder().decode(["uint256", "uint256", "uint256", "address"], ids)
        console.log("decodedResponses: ", ids[0]);

        setId(Number(decodedId))
    }, []);


    useEffect(() => {
        (async () => {
            const filter = {
                address: import.meta.env.VITE_contract_address,
                topics: [ethers.id("poolCreated(uint256,uint256,uint256,address)")],
            };
            wssProvider
                .getLogs({ ...filter, fromBlock: 5498214 })
                // eslint-disable-next-line no-unused-vars
                .then((events) => {
                    console.log("events ", events);
                });

            const wssProvider2 = new ethers.WebSocketProvider(
                import.meta.env.VITE_wss_rpc_url
            )

            wssProvider2.on(filter, eventListerner);

            return () => wssProvider2.off(filter, eventListerner);
        })()
    }, [eventListerner]);


    return id;
};

export default usePoolCreatedEvent;