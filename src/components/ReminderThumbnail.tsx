import React, { FC } from "react";
import { css } from "emotion";

export interface Props {
  id: number;
  color: string;
  message: string;
}

export const ReminderTumbnail: FC<Props> = ({color, id, message}) => {
    const styles = {
      component: css`
        width: 100%;
        height: 20%;
        background-color: ${color};
        border-style: solid;
        border-width: thick;
      `,
    };
  
    return <div className={styles.component} />;
};
