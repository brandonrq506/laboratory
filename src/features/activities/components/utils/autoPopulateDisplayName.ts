import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { CreateForm } from "../../types/createForm";

type AutoPopulateConfig = {
  getValues: UseFormGetValues<CreateForm>;
  setValue: UseFormSetValue<CreateForm>;
  dirtyFields: Partial<Record<keyof CreateForm, boolean>>;
};

export const autoPopulateDisplayName = ({
  getValues,
  setValue,
  dirtyFields,
}: AutoPopulateConfig) => {
  const currentValues = getValues();
  const isNameDirty = dirtyFields.name;
  const isDisplayNameEmpty = !currentValues.display_name?.trim();
  const hasNameValue = currentValues.name?.trim();

  if (isNameDirty && isDisplayNameEmpty && hasNameValue) {
    setValue("display_name", currentValues.name);
  }
};