import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../inputs/TextInput";
import { useDispatch, useSelector } from "../../store";
import { saveReminder } from "../../slices/reminder";
import LoadingSpinner from "../LoadingSpinner";
import { getCities } from "../../slices/weather";
import Select2Input from "../inputs/Select2Input";

export default function Form({ reminder, onCancel }) {
  const dispatch = useDispatch();

  const [_reminder, setReminder] = useState({});
  const [selectedCity, setSelectedCity] = useState();
  const [showCityError, setShowCityError] = useState(false);

  const { submitting } = useSelector((state) => state.reminder);
  const { loading: loadingCities, cities } = useSelector((state) => state.weather);

  useEffect(() => {
    setReminder({ ...reminder });
  }, [reminder]);

  const _saveReminder = (e) => {
    e.preventDefault();

    setShowCityError(false);

    let onSuccess = () => onCancel();

    if (!reminder._id) {
      if (!selectedCity) {
        setShowCityError(true);
        return;
      }
      
      setShowCityError(false);
      dispatch(saveReminder({ ..._reminder, city: selectedCity }, onSuccess));
    } else {

      setShowCityError(false);

      if (!_reminder.city)
        dispatch(
          saveReminder({ ..._reminder, city: reminder.city }, onSuccess)
        );
      else
        dispatch(saveReminder({ ..._reminder, city: selectedCity }, onSuccess));
    }
  };

  const onFormInputChange = (e) => {
    _reminder[e.target.name] = e.target.value;
    setReminder({ ..._reminder });
  };

  const onCityInputChange = (value) => {
    setSelectedCity();
    dispatch(getCities(value));
    setReminder({ ..._reminder, cityDesc: value });
  };

  const onCitySelectChange = (cityOption) => {
    setSelectedCity(cityOption);
    setReminder({ ..._reminder, cityDesc: cityOption.text });
  };

  const cityOptions = (() => {
    return cities && cities.length > 0
      ? cities.map((city) => {
          return {
            text: `${city.LocalizedName} - ${city.Country.LocalizedName}`,
            value: city.Key
          };
        })
      : [];
  })();

  return (
    <form onSubmit={_saveReminder}>
      {showCityError && (
        <div className="bg-red-500 p-1 rounded w-full my-2 text-center text-white">
          {"You should select a city."}
        </div>
      )}
      <TextInput
        id="date"
        name="date"
        label="Date"
        type="date"
        placeholder="YYYY-MM-DD"
        value={_reminder.date}
        onChange={onFormInputChange}
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        required
        disabled={submitting}
      />
      <TextInput
        id="time"
        name="time"
        label="Time"
        type="time"
        value={_reminder.time}
        onChange={onFormInputChange}
        required
        disabled={submitting}
      />
      <Select2Input
        id="city"
        name="city"
        label="City"
        inputText={_reminder.cityDesc}
        onInputTextChange={onCityInputChange}
        onInputSelectChange={onCitySelectChange}
        required
        disabled={submitting}
        options={cityOptions}
        loading={loadingCities}
      />
      <TextInput
        id="detail"
        name="detail"
        label="Details"
        value={_reminder.detail}
        onChange={onFormInputChange}
        required
        disabled={submitting || loadingCities}
      />
      <div className="bg-gray-50 px-1 py-3 sm:flex sm:flex-row-reverse">
        {submitting ? (
          <div className="p-2">
            <LoadingSpinner />
          </div>
        ) : (
          <button
            type="subtmit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save reminder
          </button>
        )}
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  onCancel: PropTypes.func.isRequired
};
