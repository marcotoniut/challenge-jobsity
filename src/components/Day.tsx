import React, { FC, useState, useEffect } from "react";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import { Props as ReminderProps, ReminderTumbnail } from './ReminderThumbnail';
import { css } from "emotion";
import { Subject } from "rxjs";

export interface Props {
  date: Date;
  active: boolean;
  displayReminder$ : Subject<boolean>;
}

export const Day: FC<Props> = ({date, active, displayReminder$}) => {
  const [reminders] = useState<Array<ReminderProps>>([]);
  const [displayReminder, setDisplayReminder] = useState<boolean>(false);

  const styles = {
    component: css`
      border-style: solid;
      border-width: thin;
      display: table-cell;
      height: 100%;
      background-color: ${active ? 'white' : 'grey'}
    `,
  };
  
  useEffect(() => {
    const s = displayReminder$.subscribe(d => displayReminder);
    return () => s.unsubscribe();
  }, [displayReminder]);

  return (
    <div className= {styles.component} onClick={() => { active ? 
    console.log(`Can't add reminders to inactive days`) : 
    setDisplayReminder(true) }}>
      <ul>
      {pipe(
          reminders,
          A.map((r) => (
            <ReminderTumbnail {...r} />
          ))
        )}
      </ul>
      <div>{date.getUTCDate()}</div>
    </div>
  );
};
