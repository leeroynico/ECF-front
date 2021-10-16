import React from "react";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Crosshair,
  HorizontalLine,
  Grid,
  Export,
  Legend,
  Margin,
  Tooltip,
  Label,
  Format,
} from "devextreme-react/chart";

function ChartSpline(props) {
  return (
    <>
      <Chart dataSource={props.datas} title={props.title}>
        <CommonSeriesSettings argumentField="time" type="stackedspline" />
        <CommonAxisSettings>
          <Grid visible={false} />
        </CommonAxisSettings>
        <Series key="time" valueField="data" name="T°" color={props.color} />
        <Margin bottom={20} />
        <ArgumentAxis allowDecimals={false} axisDivisionFactor={40}>
          <Label>
            <Format type="decimal" />
          </Label>
        </ArgumentAxis>
        <Crosshair enabled={true}>
          <HorizontalLine visible={true} />
          <Label visible={true} />
        </Crosshair>
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="bottom"
          visible={false}
        />
        <Export enabled={true} />
        <Tooltip enabled={true} />
      </Chart>
    </>
  );
}

export default ChartSpline;
