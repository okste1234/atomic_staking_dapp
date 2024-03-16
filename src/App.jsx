import { Container } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import Stake from "./component/Stake";
import { useState } from "react";


configureWeb3Modal();



function App() {


    const [name, setName] = useState("Stablecoin Pool")

    return (
        <Container>
            <Header name={name} setName={setName} />
            <main className="mt-6">
                <div className="flex flex-col gap-2 mb-4 mt-2">
                    <p className="text-gray-500">Stake your assets and earn APY.</p>
                </div>
                <Stake name={name} />
            </main>
        </Container>
    );
}

export default App;
