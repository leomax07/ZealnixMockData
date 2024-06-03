type TabType = {
  index: number;
  label: string;
};

interface Props {
  tabOptions: TabType[];
  selectedIndex?: number;
  setSelectedIndex: Function;
}
function FormStepperTab({
  tabOptions = [],
  selectedIndex = 0,
  setSelectedIndex,
}: Props) {
  return (
    <div className="stpper__tab__container">
      {tabOptions.map((tab) => (
        <div
          className="each__step"
          onClick={() => setSelectedIndex(tab.index)}
          key={tab.index}
        >
          <div
            className={`index ${
              selectedIndex === tab.index && "index__selected"
            }`}
          >
            {tab.index}
          </div>
          <div
            className={`label ${
              selectedIndex === tab.index && "label__selected"
            }`}
          >
            {tab.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormStepperTab;
