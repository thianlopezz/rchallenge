import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Task from "./Calendar/Task";

function CalendarDay(props) {
  const { dateDayjs, reminders, currentMonth, onNewReminder, onReminderClick } =
    props;

  let monthDay = dayjs(dateDayjs).format("DD");
  let isCurrentMonth =
    dayjs(dateDayjs).format("MM") == dayjs(currentMonth).format("MM");
  let isWeekend = [0, 6].some((x) => x == dayjs(dateDayjs).day());

  return (
    <div
      className={`overflow-y-auto w-full h-28 rounded-md cursor-pointer bg-blue-${
        isWeekend ? "100" : "200"
      } hover:bg-blue-${isWeekend ? "200" : "100"}`}
      onClick={(e) =>
        reminders.length == 0 ? onNewReminder() : onReminderClick()
      }
    >
      <span className="m-1">
        <strong
          className={`text-gray-800 ${
            !isCurrentMonth ? "text-opacity-50" : ""
          }`}
        >
          {monthDay}
        </strong>
      </span>
      {reminders.map((reminder) => (
        <Task
          description={reminder.detail}
          onClick={(e) => {
            if (reminders.length != 0) {
              e.stopPropagation();
              onReminderClick(reminder);
            }
          }}
        />
      ))}
    </div>
  );
}

CalendarDay.propTypes = {
  dateDayjs: PropTypes.objectOf(dayjs),
  reminders: PropTypes.arrayOf(PropTypes.object),
  currentMonth: PropTypes.objectOf(dayjs),
  onNewReminder: PropTypes.func
};

export default CalendarDay;
