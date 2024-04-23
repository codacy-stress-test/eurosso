import { ActionGroup, Button } from "@patternfly/react-core";
import { SelectVariant } from "@patternfly/react-core/deprecated";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectControl } from "@keycloak/keycloak-ui-shared";
import { useServerInfo } from "../../context/server-info/ServerInfoProvider";

type EventListenersFormProps = {
  form: UseFormReturn;
  reset: () => void;
};

export const EventListenersForm = ({
  form,
  reset,
}: EventListenersFormProps) => {
  const { t } = useTranslation();
  const {
    formState: { isDirty },
  } = form;

  const serverInfo = useServerInfo();
  const eventListeners = serverInfo.providers?.eventsListener.providers;

  return (
    <FormProvider {...form}>
      <SelectControl
        name="eventsListeners"
        label={t("eventListeners")}
        labelIcon={t("eventListenersHelpTextHelp")}
        controller={{
          defaultValue: "",
        }}
        className="kc_eventListeners_select"
        chipGroupProps={{
          numChips: 3,
          expandedText: t("hide"),
          collapsedText: t("showRemaining"),
        }}
        variant={SelectVariant.typeaheadMulti}
        options={Object.keys(eventListeners!)}
        typeAheadAriaLabel="Select"
      />
      <ActionGroup>
        <Button
          variant="primary"
          type="submit"
          data-testid={"saveEventListenerBtn"}
          isDisabled={!isDirty}
        >
          {t("save")}
        </Button>
        <Button
          variant="link"
          data-testid={"revertEventListenerBtn"}
          onClick={reset}
        >
          {t("revert")}
        </Button>
      </ActionGroup>
    </FormProvider>
  );
};
