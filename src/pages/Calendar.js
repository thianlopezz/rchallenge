import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BaseModal from "../components/BaseModal";
import CalendarDay from "../components/CalendarDay";
import CalendarMonth from "../components/CalendarMonth";
import Form from "../components/form";
import RemindersDate from "../components/RemindersDate";

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative

  const [reminderSelected, setReminderSelected] = useState();
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [isRemindersModal, setIsRemindersModal] = useState(false);
  const [dateSelected, setDateSelected] = useState();

  const onNewReminder = (date) => {
    setReminderSelected({ date: dayjs(date).format("YYYY-MM-DD") });
    setIsRemindersModal(false);
    setIsOpenFormModal(true);
  };

  const onReminderClick = (date, reminder) => {
    setDateSelected(date);
    setReminderSelected(reminder);
    setIsRemindersModal(true);
  };

  const onEditReminder = (reminder) => {
    setIsRemindersModal(false);
    setIsOpenFormModal(true);
    setReminderSelected(reminder);
  };

  return (
    <div className="container">
      <CalendarMonth
        onNewReminder={onNewReminder}
        onReminderClick={onReminderClick}
      />
      {isOpenFormModal && (
        <BaseModal>
          <Form
            reminder={reminderSelected}
            onCancel={() => setIsOpenFormModal(false)}
          />
        </BaseModal>
      )}
      {isRemindersModal && (
        <BaseModal>
          <RemindersDate
            date={dateSelected}
            reminder={reminderSelected}
            onCancel={() => setIsRemindersModal(false)}
            onNewReminder={onNewReminder}
            onEdit={onEditReminder}
          />
        </BaseModal>
      )}
    </div>
  );
}

export default Calendar;
