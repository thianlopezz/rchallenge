import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "../../store";
import { getCityWeather, setCityWeather } from "../../slices/weather";
import LoadingSpinner from "../LoadingSpinner";
import Task from "../Calendar/Task";

function RemindersDate({ date, reminder, onNewReminder, onCancel, onEdit }) {
  const dispatch = useDispatch();

  const [reminderSelected, setReminderSelected] = useState();

  const { reminders } = useSelector((state) => state.reminder);
  const { loading: loadingCityWeather, weathers } = useSelector(
    (state) => state.weather
  );

  const remindersFiltered = reminders.filter(
    (reminder) =>
      dayjs(reminder.date).format("YYYYMMDD") == dayjs(date).format("YYYYMMDD")
  );

  const getWeathers = (reminder) => {
    let today = dayjs();
    if (
      reminder &&
      reminder._id &&
      dayjs(date).isAfter(today) &&
      dayjs(date).diff(today, "days") < 5
    ) {
      dispatch(getCityWeather(reminder.city.value));
    } else {
      dispatch(setCityWeather([]));
    }
  };

  useEffect(() => {
    getWeathers(reminderSelected);
  }, [reminderSelected]);

  useEffect(() => {
    debugger;
    if (reminder) {
      setReminderSelected({ ...reminder });
      getWeathers(reminder);
    }
  }, [reminder]);

  let getForeCastDescription = () => {
    let found = weathers.find((weather) => {
      return (
        dayjs(weather.Date).format("YYYYMMDD") ==
        dayjs(reminderSelected.date).format("YYYYMMDD")
      );
    });
    return found ? found.Day.IconPhrase : " No info ";
  };

  return (
    <>
      <div className="grid grid-flow-col grid-cols-12 gap-4">
        <div className="col-span-6">
          <h1 className="text-lg mb-3">Reminders</h1>
          {remindersFiltered.map((reminder) => (
            <Task
              description={`${reminder.time} - ${reminder.detail}`}
              onClick={() => setReminderSelected(reminder)}
            />
          ))}
          <hr className="my-2 mx-1" />
          <div
            className="text-center mx-1 mt-1 mb-2 bg-green-300 rounded cursor-pointer border border-transparent shadow-sm text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
            onClick={() => onNewReminder(date)}
          >
            <span className="p-2">Add new reminder</span>
          </div>
        </div>
        <div className="col-span-6 border rounded-lg border-blue-900 p-1">
          <div className="bg-gray-50 px-1 pb-3 flex justify-between">
            <h2 className="text-lg">Details</h2>
            {reminderSelected && (
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-blue-300 shadow-sm px-4 py-1 bg-white text-base font-medium text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onEdit(reminderSelected)}
              >
                Edit
              </button>
            )}
          </div>
          {reminderSelected ? (
            <div>
              <h3>
                {reminderSelected.time}{" "}
                <small>
                  / {dayjs(reminderSelected.date).format("DD ddd MMM YYYY")}
                </small>
              </h3>
              <h4>{reminderSelected.city.text}</h4>

              {loadingCityWeather ? (
                <LoadingSpinner />
              ) : (
                <h5 className="text-lg">{getForeCastDescription()}</h5>
              )}
              <p>{reminderSelected.detail}</p>
            </div>
          ) : (
            <div>
              <p className="text-center">Select a reminder</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-1 py-3 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onCancel}
        >
          Close
        </button>
      </div>
    </>
  );
}

RemindersDate.propTypes = {
  date: PropTypes.objectOf(dayjs).isRequired,
  onCancel: PropTypes.func,
  onEdit: PropTypes.func
};

export default RemindersDate;
