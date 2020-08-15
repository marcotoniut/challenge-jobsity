import React, { FC, useState, useEffect } from "react";
import { css } from "emotion";
import { TextField } from '@material-ui/core';
import { TimePicker } from 'antd';
import moment, { Moment } from "moment";

export interface Props {
  id: number;
  color: string;
  day: Date;
  time: string;
  city: string;
  message: string;
}

export const Reminder: FC<Props> = (props) => {
  const [time, setTime] = useState(moment(props.time));
  const [city, setCity] = useState(props.city);
  const [color, setColor] = useState<string>(props.color);
  const [weather, setWeather] = useState<string>('');

  const onChangeTime = (t: Moment | null) => {
    if (t) setTime(t);
    else setTime(moment('00:00'));
  };

  useEffect(() => {
    if (city && time) {
      // Find weather
    }
  }, [city]);

  const styles = {
    component: css`
      width: 100%;
      background-color: ${color};
      text-color: #ffffff;
      text-align: center;
    `,
  };

  // Functionality to change date and city
  return (
    <div className={styles.component}>
      <label>Message: </label>
      <TextField
        defaultValue='Message'
        inputProps={{
          maxLength: 30
        }}
      /> <br />
      <label>Day: {props.day.getMonth() + '/' + props.day.getDate()}</label> <br />
      <TimePicker value={time} onChange={onChangeTime} /> <br />
      <label>City: </label>
      <TextField
        defaultValue='City'
        inputProps={{
          maxLength: 30
        }}
      /> <br />
    </div>
  );
};
