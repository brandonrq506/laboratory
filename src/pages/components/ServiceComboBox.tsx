import { useState } from "react";

import { ComboBox } from "@/experiments/ComboBox";
import { Option } from "@/types/core";

/*
 *TODO:
 *1. Add Fake API call to get services.
 *2. Customize to accept on change that will open the modal, etc.
 */

const options: Option[] = [
  { value: 1, label: "Oil Change" },
  { value: 2, label: "Tire Replacement" },
  { value: 3, label: "Windshield Repair" },
];

export const ServiceComboBox = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <ComboBox
      selectedOption={selectedOption}
      dynamicOption
      showAsterisk
      placeholder="Oil Change..."
      description="Tell us about your Car"
      label="Services"
      options={options}
      onChange={(value) => setSelectedOption(value)}
    />
  );
};
