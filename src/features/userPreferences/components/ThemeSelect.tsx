import { StringSelect } from "@/components/form/Select/StringSelect";
import { THEME_OPTIONS } from "../constants/theme";
import { USER_PREFERENCE_KEY } from "../types/userPreferenceKeys";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../hooks/useTheme";
import { useUpdateUserPreference } from "../api/tanstack/useUpdateUserPreference";
import { userPreferencesOptions } from "../api/queryOptions/userPreferencesOptions";

export const ThemeSelect = () => {
  const { preference, isSaving } = useTheme();
  const preferences = useQuery(userPreferencesOptions());
  const { mutate, isPending, isError } = useUpdateUserPreference();
  const canSave =
    preferences.data?.some((pref) => pref.key === USER_PREFERENCE_KEY.THEME) &&
    !preferences.isPlaceholderData;

  return (
    <div className="max-w-sm">
      <StringSelect
        label="Theme"
        name="theme"
        description="Choose a color theme. System follows your device settings."
        options={THEME_OPTIONS}
        value={THEME_OPTIONS.find((option) => option.value === preference)}
        disabled={!canSave || isSaving || isPending}
        onChange={(option) =>
          mutate({ key: USER_PREFERENCE_KEY.THEME, value: option.value })
        }
        error={
          isError
            ? "Could not save theme. Your previous theme was restored."
            : undefined
        }
      />
      {preferences.isError && (
        <p role="alert" className="text-danger-text mt-2 text-sm">
          Could not load theme preference. Reload to try again.
        </p>
      )}
    </div>
  );
};
