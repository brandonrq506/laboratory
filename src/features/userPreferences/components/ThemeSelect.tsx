import { StringSelect } from "@/components/form/Select/StringSelect";
import { THEME_OPTIONS } from "../constants/theme";
import { USER_PREFERENCE_KEY } from "../types/userPreferenceKeys";
import { parseThemePreference } from "../utils/theme";
import { useQuery } from "@tanstack/react-query";
import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { userPreferencesOptions } from "../api/queries";

export const ThemeSelect = () => {
  const { data, isError: isLoadError } = useQuery(userPreferencesOptions());
  const { mutate, isPending, isError: isSaveError } = useUpdateUserPreference();

  const preference = parseThemePreference(
    data?.find((pref) => pref.key === USER_PREFERENCE_KEY.THEME)?.value,
  );

  return (
    <div className="max-w-sm">
      <StringSelect
        label="Theme"
        name="theme"
        description="Choose a color theme. System follows your device settings."
        options={THEME_OPTIONS}
        value={THEME_OPTIONS.find((option) => option.value === preference)}
        disabled={!data || isPending}
        onChange={(option) =>
          mutate({ key: USER_PREFERENCE_KEY.THEME, value: option.value })
        }
        error={
          isSaveError
            ? "Could not save theme. Your previous theme was restored."
            : undefined
        }
      />
      {isLoadError && (
        <p role="alert" className="text-danger-text mt-2 text-sm">
          Could not load theme preference. Reload to try again.
        </p>
      )}
    </div>
  );
};
