import { css } from "emotion";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import React, { FC, useState } from "react";
import { Subject } from "rxjs";
import { getWeeks } from "../helpers/functions/getWeeks";
import { Header } from "./Header";
import { Props as ReminderProps, Reminder } from "./ReminderDetails";
import { Week } from "./Week";

interface Position {
  x: number;
  y: number;
}

interface Props {
  date: Date;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Month: FC<Props> = (props) => {
  const [weeks] = useState(getWeeks(props.date));
  const [displayReminder, setDisplayReminder] = useState(false);
  const reminders: Array<ReminderProps> = [];
  const [displayReminder$] = useState(() => new Subject<boolean>());

  displayReminder$.subscribe({
    next: (b) => setDisplayReminder(b),
  });

  let id = 0;
  const defaultReminder: ReminderProps = {
    id: id++,
    color: "white",
    day: props.date,
    message: "",
    time: "00:00",
    city: "",
  };

  const [currentReminder, setCurrentReminder] = useState<ReminderProps>(
    defaultReminder
  );
  const [reminderPosition, setReminderPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const styles = {
    reminderPosition: css`
      position: absolute;
      width: 40%;
      height: 80%;
      x: ${reminderPosition.x};
      y: ${reminderPosition.y};
    `,
    daysArea: css`
      display: table;
      width: 100%;
      height: 88%;
      padding: 0;
      margin: 0;
    `,
    header: css`
      width: 100%;
      display: height: 12%;
    `,
    component: css`
      height: 95vh;
    `,
  };

  return (
    <div className={styles.component}>
      <Header title={monthNames[props.date.getMonth()]} />
      <ul className={styles.daysArea}>
        {pipe(
          weeks,
          A.map((week) => (
            <Week
              start={week.start}
              end={week.end}
              month={new Date(props.date.getFullYear(), props.date.getMonth())}
              displayReminder$={displayReminder$}
            />
          ))
        )}
      </ul>
      {displayReminder && (
        <div className={styles.reminderPosition}>
          <Reminder {...currentReminder} />
        </div>
      )}
    </div>
  );
};
