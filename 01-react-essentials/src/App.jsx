import { CORE_CONCEPTS } from "./data";
import { CoreConcept } from "./components/CoreConcepts";
import { Header } from "./components/Header/Header";
import TabButton from "./components/TabButton";

function App() {
  return (
    <div>
      <header>
        <h1>Hello World</h1>
      </header>
      <Header />

      <main>
        <h2>Time to get started!</h2>

        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((coreConcept) => (
              <CoreConcept {...coreConcept} />
            ))}
          </ul>
        </section>

        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton>Components</TabButton>
            <TabButton>JSX</TabButton>
            <TabButton>Props</TabButton>
            <TabButton>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
