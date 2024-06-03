import React from "react";
import { Group, Button } from "evergreen-ui";

type ChartHeader = {
  label: string;
  value: string;
};
interface GroupMenuComponentProps {
  labelValueObject: ChartHeader[];
}

function GroupMenuComponent({ labelValueObject }: GroupMenuComponentProps) {
  const [options] = React.useState<ChartHeader[]>(labelValueObject);

  const [selectedValue, setSelectedValue] = React.useState("daily");

  return (
    <Group>
      {options.map((option) => (
        <Button
          key={option.label}
          isActive={selectedValue === option.value}
          onClick={() => setSelectedValue(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </Group>
  );
}

export default GroupMenuComponent;
