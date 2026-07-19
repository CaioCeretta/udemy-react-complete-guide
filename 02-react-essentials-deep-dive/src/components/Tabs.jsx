import TabButton from "./TabButton";

export default function Tabs({ tabs, selectedTab, onSelectTab, tabContent, buttonsContainer = "menu" }) {
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

export function Button({mode, children, Icon, ...rest}) {
 // Todo: Build this component!
 return (
        <button className={`button ${mode}-button`} {...rest}><span className="button-icon"><Icon/></span>{children}</button>
 )
 // !!! Important: 
 // Wrap the icon with a <span className="button-icon"> to achieve the target look
 // Also wrap the children prop with a <span>
}

