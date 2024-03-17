import { Container } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Stake from "./component/Stake";


configureWeb3Modal();

function App() {
    return (
        <Container>
            <Stake name={name} />
        </Container>
    );
}

export default App;
