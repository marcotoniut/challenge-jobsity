import React, { FC, useEffect, useState } from "react";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import { Props as Dayprops, Day } from "./Day";
import { css } from "emotion";
import { Subject } from "rxjs";

export interface Props {
  start: number;
  end: number;
  month: Date;
  displayReminder$: Subject<boolean>;
}

export const Week: FC<Props> = ({ start, end, month, displayReminder$ }) => {
  const isFirst = start > end;
  const isLast = !isFirst && end - start < 7;
  const [displayReminder, setDisplayReminder] = useState<boolean>(false);
  const days: Array<Dayprops> = [];
  
  useEffect(() => {
    const s = displayReminder$.subscribe(d => displayReminder);
    return () => s.unsubscribe();
  }, [displayReminder]);

  if (isFirst) {
    const lastDayOfMonth = start + 6 - end;
    let d = start;
    let active = false;
    let currentMonth = new Date(month.getFullYear(), month.getMonth() - 1);

    while (d > 7 || d <= end) {
      days.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d),
        active,
        displayReminder$,
      });
      if (d === lastDayOfMonth) {
        d = 0;
        active = true;
        currentMonth = month;
      }
      d++;
    }
  } else if (isLast) {
    const lastDayOfWeek = (end - start - 6) * -1;
    let d = start;
    let active = true;
    let currentMonth = month;
    while (d > 7 || d <= lastDayOfWeek) {
      days.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d),
        active,
        displayReminder$,
      });
      if (d === end) {
        d = 0;
        active = false;
        currentMonth = new Date(month.getFullYear(), month.getMonth() + 1);
      }
      d++;
    }
  } else {
    for (let d = start - 1; d <= end; d++) {
      days.push({
        date: new Date(month.getFullYear(), month.getMonth(), d),
        active: true,
        displayReminder$
      });
    }
  }

  return (
    <div className={styles.component}>
      <ul className={styles.list}>
        {pipe(
          days,
          A.map((day) => <Day date={day.date} active={day.active} displayReminder$={displayReminder$} />)
        )}
      </ul>
    </div>
  );
};

const styles = {
  component: css`
    display: table;
    border-style: solid;
    border-width: thin;
    width: 100%;
    height: 15%;
    padding: 0;
  `,
  list: css`
    display: table-row;
    border-style: solid;
    border-width: thin;
    width: 100%;
    height: 100%;
    padding: 0;
  `,
};
