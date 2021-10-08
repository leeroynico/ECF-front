import React from "react";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Export,
  Legend,
  Margin,
  Tooltip,
  Label,
  Format,
} from "devextreme-react/chart";

const sharingStatisticsInfo = [
  {
    year: 1997,
    smp: 263,
    mmp: 226,
    cnstl: 10,
    cluster: 1,
  },
  {
    year: 1999,
    smp: 169,
    mmp: 256,
    cnstl: 66,
    cluster: 7,
  },
  {
    year: 2001,
    smp: 57,
    mmp: 257,
    cnstl: 143,
    cluster: 43,
  },
  {
    year: 2003,
    smp: 0,
    mmp: 163,
    cnstl: 127,
    cluster: 210,
  },
];

function Charts() {
  return (
    <>
      <Chart
        palette="Violet"
        dataSource={sharingStatisticsInfo}
        title="Architecture Share Over Time (Count)"
      >
        <CommonSeriesSettings argumentField="year" type={"line"} />
        <CommonAxisSettings>
          <Grid visible={true} />
        </CommonAxisSettings>
        <Series key={"year"} valueField={"smp"} />
        <Margin bottom={20} />
        <ArgumentAxis allowDecimals={false} axisDivisionFactor={60}>
          <Label>
            <Format type="decimal" />
          </Label>
        </ArgumentAxis>
        <Legend verticalAlignment="top" horizontalAlignment="right" />
        <Export enabled={true} />
        <Tooltip enabled={true} />
      </Chart>
    </>
  );
}

export default Charts;
