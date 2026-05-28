import { CORE_CONCEPTS } from "./data";
import { CoreConcept } from "./components/CoreConcepts";
import { Header } from "./components/Header/Header";
import TabButton from "./components/TabButton";
import { useState } from "react";

function App() {

  const [tabContent, setTabContent] = useState('Please, select a button')

  function handleSelect(selectedButton) {
    // selected button => 'components' | 'jsx' | 'props' | 'state'
    setTabContent(selectedButton)
  }

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
            <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu> 
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
