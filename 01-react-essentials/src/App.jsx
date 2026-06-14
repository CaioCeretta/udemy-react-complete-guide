import { CORE_CONCEPTS, EXAMPLES } from "./data";

import { useState } from "react";
import { CoreConcept } from "./components/CoreConcepts";
import { Header } from "./components/Header/Header";
import TabButton from "./components/TabButton";

console.log(...CORE_CONCEPTS)

function App() {
  const [tabContent, setTabContent] = useState("");

  let selectedTopic = <p>Please select a topic</p>;

  if (tabContent) {
    selectedTopic = (
      <div id='tab-content'>
        <h3>{EXAMPLES[tabContent].title}</h3>
        <p>{EXAMPLES[tabContent].description}</p>
        <pre>{EXAMPLES[tabContent].code}</pre>
      </div>
    );
  }

  function handleSelect(selectedButton) {
    // selected button => 'components' | 'jsx' | 'props' | 'state'
    setTabContent(selectedButton);
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
              <CoreConcept key={coreConcept.title} {...coreConcept} />
            ))}
          </ul>
        </section>

        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic === "components"} onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton isSelected={selectedTopic === "jsx"} onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === "props"}  onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton isSelected={selectedTopic === "state"} onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          {!tabContent ? (
            <p>Please, select a topic</p>
          ) : (
            // <div id='tab-content'>
            //   <h3>{EXAMPLES[tabContent].title}</h3>
            //   <p>{EXAMPLES[tabContent].description}</p>
            //   <pre>{EXAMPLES[tabContent].code}</pre>
            // </div>
            selectedTopic
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
