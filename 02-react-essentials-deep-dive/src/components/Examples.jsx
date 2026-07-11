import TabButton from "./TabButton";
import { EXAMPLES } from "../data";
import { useState } from "react";
import Section from "./page/Section";

export function Examples() {
  const [tabContent, setTabContent] = useState("");

  let selectedTopic = <p>Please select a topic</p>;

  function handleSelect(selectedButton) {
    // selected button => 'components' | 'jsx' | 'props' | 'state'
    setTabContent(selectedButton);
  }

  if (tabContent) {
    selectedTopic = (
      <div id='tab-content'>
        <h3>{EXAMPLES[tabContent].title}</h3>
        <p>{EXAMPLES[tabContent].description}</p>
        <pre>{EXAMPLES[tabContent].code}</pre>
      </div>
    );
  }

  return (
    <Section name={"examples"} title={"Examples"}>
      <menu>
        <TabButton
          isSelected={selectedTopic === "components"}
          onClick={() => handleSelect("components")}
        >
          Components
        </TabButton>
        <TabButton
          isSelected={selectedTopic === "jsx"}
          onClick={() => handleSelect("jsx")}
        >
          JSX
        </TabButton>
        <TabButton
          isSelected={selectedTopic === "props"}
          onClick={() => handleSelect("props")}
        >
          Props
        </TabButton>
        <TabButton
          isSelected={selectedTopic === "state"}
          onClick={() => handleSelect("state")}
        >
          State
        </TabButton>
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
    </Section>
  );
}
