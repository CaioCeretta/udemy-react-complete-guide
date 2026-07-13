import TabButton from "./TabButton";

export default function Tabs({ tabs, selectedTab, onSelectTab, tabContent }) {
  return (
    <>
      <menu>
        {tabs.map((tab) => (
          <TabButton
            isSelected={selectedTab === tab.key}
            onClick={() => onSelectTab(tab.key)}
            key={tab.key}
          >
            {tab.label}
          </TabButton>
        ))}
      </menu>
      { tabContent }
    </>
  );
}
