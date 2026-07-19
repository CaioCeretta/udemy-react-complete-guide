import TabButton from "./TabButton";

export default function Tabs({ tabs, selectedTab, onSelectTab, tabContent, buttonsContainer }) {
  const ButtonsContainer = buttonsContainer;

  return (
    <>
      <ButtonsContainer>
        {tabs.map((tab) => (
          <TabButton
            isSelected={selectedTab === tab.key}
            onClick={() => onSelectTab(tab.key)}
            key={tab.key}
          >
            {tab.label}
          </TabButton>
        ))}
      </ButtonsContainer>
      { tabContent }
    </>
  );
}
