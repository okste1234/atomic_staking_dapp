import { Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import useGetPoolById from "../hooks/useGetPoolById"
import useGetUserClaimableReward from "../hooks/useGetUserClaimableReward";
import useGetUserStakeBalance from "../hooks/useGetUserStakeBalance";
import StakePopUp from "./StakePopUp";
import useUnStake from "../hooks/useUnstake";
import useClaimReward from "../hooks/useClaimReward";
import useEvents from "../hooks/useEvents";

const Stake = ({ name }) => {
    const reward = useGetUserClaimableReward();
    const balance = useGetUserStakeBalance();
    const handleUnstake = useUnStake()
    const handleClaim = useClaimReward()
    const events = useEvents()
    const { loading, data: pools } = useGetPoolById(events);


    console.log("pools ", pools);

    return (
        <div>
            {loading ? (
                <Text>Loading...</Text>
            ) : pools.length !== 0 ? (
                pools.map((item, index) => (
                    <div key={index} className="grid gap-8 lg:grid-cols-3 mb-8">
                        <div className="flex flex-col gap-4 lg:col-span-2">
                            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <div className="grid w-full grid-cols-2 p-4 items-center">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-lg font-semibold">{name}</h2>
                                        <p className="text-sm font-medium leading-none text-gray-500">Earn {item.rewardRate}% APY</p>
                                    </div>
                                    <div className="flex justify-end gap-4 items-center">
                                        <StakePopUp
                                            id={index}
                                        />
                                        <Button size="sm" className="text-lg" onClick={() => handleUnstake(index)}>Unstake</Button>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700" />
                                <div className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs leading-none text-gray-500">Total Stakers</p>
                                        <p className="text-2xl font-semibold">{item.totalStakers}</p>
                                        <p className="text-xs leading-none text-gray-500">Total Staked</p>
                                        <p className="text-2xl font-semibold">{item.rewardReserve} sWCX</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700" />
                                <div className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs leading-none text-gray-500">APY Earnings</p>
                                        <p className="text-sm font-medium">{balance(index)} sWCX</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700" />
                                <div className="p-4">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs leading-none text-gray-500">APY Earnings</p>
                                            <p className="text-sm font-medium">{reward(index)} rWCX</p>
                                        </div>
                                        <Button onClick={() => handleClaim(index)}>Claim Reward</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card className="w-full max-w-sm">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-medium">Staking Information</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-sm font-medium">{name}</h4>
                                        <p className="text-xs text-gray-500">Earn {item.rewardRate}% APY</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))
            ) : (
                <Text>Could not get pool!!</Text>
            )}
        </div>
    )
}
export default Stake;
