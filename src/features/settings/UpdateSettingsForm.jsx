import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, settingMutate } = useUpdateSetting();

  function handleUpdate(e, field) {
    if (!e.target.value) return;
    settingMutate({ [field]: e.target.value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={settings?.minBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="maxBookingLength"
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          defaultValue={settings?.maxBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="maxGuestPerBooking"
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
          defaultValue={settings?.maxGuestPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfastPrice"
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          defaultValue={settings?.breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
