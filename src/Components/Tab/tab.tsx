import React, { useEffect } from "react";
import { TabNavigation, Tab } from "evergreen-ui";
import "./tab.scss";
import { useNavigate } from "react-router-dom";

type TabOptions = {
  label: string;
  to: string;
  index: number | string;
};
interface Tabprops {
  taboptions: TabOptions[];
  selectedTab: number | string | undefined;
  setSelectedTab: Function;
}

interface SelectedEventProp {
  to: string;
  index: number | string;
  label: string;
}

function TabComponent({
  taboptions,
  selectedTab = 0,
  setSelectedTab,
}: Tabprops) {
  const navigation = useNavigate();
  const tabs = React.useMemo(() => taboptions, [taboptions]);
  const [selectedIndex, setSelectedIndex] = React.useState<string | number>(0);

  const handleTabClick = (obj: SelectedEventProp) => {
    setSelectedIndex(obj.index);
    setSelectedTab(obj.index);
    navigation(obj.to);
  };

  useEffect(() => {
    setSelectedIndex(selectedTab);
  }, [selectedTab]);

  return (
    <div className="tabs__container">
      <TabNavigation>
        {tabs.map((tab) => (
          <Tab
            isSelected={selectedIndex === tab.index}
            key={tab.index}
            onClick={() => handleTabClick(tab)}
            className="each__tab"
          >
            {tab.label}
          </Tab>
        ))}
      </TabNavigation>
    </div>
  );
}

export default TabComponent;
