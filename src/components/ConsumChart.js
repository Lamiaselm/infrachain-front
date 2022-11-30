import { isUndefined } from "lodash";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { stringToColor } from "../utils/antennaUtils";

const MAX_EMF_VALUE = 20;
const UNIT = "Kwh";

const ConsumChart = ({ data, showLimit }) => {
  // const [linesVisibility, setLinesVisibility] = useState(
  //   frequencies.reduce((a, { name }) => {
  //     a[name] = false;
  //     return a;
  //   }, {})
  // );

  // const selectLine = (e) => {
  //   setLinesVisibility({
  //     ...linesVisibility,
  //     [e.value]: !linesVisibility[e.value],
  //   });
  // };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart>
        <CartesianGrid strokeDasharray="3 4" />
        <XAxis dataKey="month" xAxisId="month" />
        <YAxis unit={UNIT} ticks={[5, 10, 15, 20, 25, 30]} />
        <Tooltip />
        <Line
          dot={false}
          xAxisId="month"
          data={data}
          name="Total Consumption"
          type="monotone"
          dataKey="consumption"
          strokeWidth={3}
          stroke="#000000"
        />
        {showLimit && (
          <ReferenceLine
            alwaysShow
            xAxisId="month"
            y={MAX_EMF_VALUE}
            stroke="red"
            strokeWidth={3}
          />
        )}

        {/* {frequencies.map((frequency) => (
          <>
            <XAxis dataKey="name" xAxisId={frequency.name} hide />
            <Line
              dot={false}
              hide={
                linesVisibility[frequency.name] === false ||
                isUndefined(linesVisibility[frequency.name])
              }
              xAxisId={frequency.name}
              data={frequency.data}
              name={frequency.name}
              type="monotone"
              dataKey="value"
              strokeWidth={1}
              stroke={stringToColor(frequency.name)}
            />
          </>
        ))} */}
        {/* <Legend onClick={selectLine} /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ConsumChart;
