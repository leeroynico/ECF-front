import React from "react";
import { useState, useEffect } from "react";
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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Grid as GridMui } from "@mui/material";
import { url } from "../axios";
import SelectChambreFroide from "../special-features/SelectChambreFroide";
const axios = require("axios");

function Charts() {
  const [datas, setDatas] = useState([]);
  const [officine, setOfficine] = useState(1);
  const [chambreFroide, setChambreFroide] = useState("");
  const [date, setDate] = useState("");
  const [dates, setDates] = useState([]);
  const getDatas = () => {
    axios
      .get(url.resultats)
      .then(function (response) {
        if (response.status != 200) {
          alert("problème de chargement de data");
        }
        console.log(response.data["hydra:member"]);
        setDatas(response.data["hydra:member"][0].resultatTemperature[0]);
        setDates(
          response.data["hydra:member"].map((item) => item.date.slice(0, 10))
        );
        //   setDates(response.data["hydra:member"].filter((item)=>item.date.slice(0,10)===date));
      })
      .catch(function (error) {
        console.log("erreurs api - axios : " + error);
      });
  };
  useEffect(() => {
    getDatas();
  }, []);
  console.log(dates);
  console.log(datas);
  return (
    <>
      <GridMui
        container
        spacing={1}
        justifyContent="center"
        sx={{ marginTop: 3 }}
      >
        <GridMui item xs={10}>
          <SelectChambreFroide
            setChambreFroide={setChambreFroide}
            officine={officine}
          />
        </GridMui>
        <GridMui item xs={10}>
          <FormControl fullWidth>
            <InputLabel id="select_date">date</InputLabel>
            <Select
              labelId="select_date"
              id="select_date_id"
              value="date"
              label="date"
              // onChange={""}
            >
              {dates.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </GridMui>
      </GridMui>
      <GridMui item xs={11}>
        {datas.length === 0 ? (
          "pas de datas pour ce jour"
        ) : chambreFroide === "" ? (
          "veuillez sélectionner une chambre froide et une date"
        ) : (
          <Chart
            palette="Violet"
            dataSource={datas}
            title="température de la chambre froide"
          >
            <CommonSeriesSettings argumentField="time" type="stackedspline" />
            <CommonAxisSettings>
              <Grid visible={false} />
            </CommonAxisSettings>
            <Series key="time" valueField="data" name="T°" />
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
        )}
      </GridMui>
    </>
  );
}

export default Charts;
