import { EXAMPLES } from "../data";
import { useState } from "react";
import Section from "./page/Section";
import Tabs from "./Tabs";

export function Examples() {
  const [selectedKey, setSelectedKey] = useState("");

  let tabContent = <p>Please select a topic</p>;

  function handleSelect(selectedButton) {
    // selected button => 'components' | 'jsx' | 'props' | 'state'
    setSelectedKey(selectedButton);
  }

  if (selectedKey) {
    tabContent = (
      <div id='tab-content'>
        <h3>{EXAMPLES[selectedKey].title}</h3>
        <p>{EXAMPLES[selectedKey].description}</p>
        <pre>{EXAMPLES[selectedKey].code}</pre>
      </div>
    );
  }

  const tabs = [
    {
      key: "components",
      label: "Components",
    },
    {
      key: "jsx",
      label: "JSX",
    },
    {
      key: "props",
      label: "Props",
    },
    {
      key: "state",
      label: "State",
    },
  ]

  return (
    <Section name={"examples"} title={"Examples"} id="examples">
      <Tabs onSelectTab={handleSelect} selectedTab={selectedKey} tabs={tabs} tabContent={tabContent}/>
    </Section>
  );
}
