import React, { FC } from "react";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import { css } from "emotion";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Props {
  title: string;
}

const styles = {
  top: css`
    width: 100%;
    height: 60%;
    background-color: blue;
    color: white;
    border-style: solid;
    border-width: thin;
    text-align: center;
  `,
  days: css`
    height: 40%;
    width: 100%;
    display: table;
    background-color: blue;
    color: white;
    text-align: center;
  `,
  day: css`
    display: table-cell;
    background-color: blue;
  `,
};

export const Header: FC<Props> = (props) => {
  return (
    <div>
      <div className={styles.top}>{props.title}</div>
      <div className={styles.days}>
        {pipe(
          weekDays,
          A.map((day) => <div className={styles.day}> {day}</div>)
        )}
      </div>
    </div>
  );
};
