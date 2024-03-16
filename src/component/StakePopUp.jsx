import { Dialog, Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useStake from "../hooks/useStake";

const StakePopUp = ({ id }) => {
    const [amount, setAmount] = useState(0)

    const handleStake = useStake()

    return (<Dialog.Root>
        <Dialog.Trigger className="bg-gray-600 text-white text-center text-lg py-2">
            <Button>Stake</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Stake Amount</Dialog.Title>

            <Flex direction="column" gap="3">
                <label>

                    <TextField.Input
                        defaultValue={amount}
                        placeholder="Enter the amount to stake"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button variant="soft"
                        color="blue"
                        onClick={() => handleStake(id, amount)}
                    >Create</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>)
};
export default StakePopUp;