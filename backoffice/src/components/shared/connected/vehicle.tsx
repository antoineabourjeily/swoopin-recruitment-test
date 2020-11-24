import React from "react";
import { observer } from "mobx-react";

import { classNamesPrefix } from "utils/react";

import state from "state";

import { useCallback } from "hooks";

import {
  IconTruck,
  IconLocation,
  IconTemperature,
  IconSpeed,
} from "components/shared/icons";

import "./vehicle.scss";
import { Button } from "../inputs";
import moment from "moment";

const block = "driver";
const cx = classNamesPrefix(block);

type DriverProps = {
  id: string;
  name: string;
  vehicle: string;
  location: number[];
  online: boolean;
  lastUpdate: string;
  plate: string;
  speed: number;
  temperature: number;
};

const Vehicle = observer(
  ({
    id,
    name,
    vehicle,
    location,
    lastUpdate,
    online,
    plate,
    speed,
    temperature,
  }: DriverProps) => {
    const onConnectClick = useCallback(() => {
      state.vehicles.setOnline(id, true);
    }, []);
    const onDisconnectClick = useCallback(() => {
      state.vehicles.setOnline(id, false);
    }, []);
    return (
      <div className={block}>
        {/* Info (name, vehicle and update time */}
        <div
          className={cx("__group", "__vehicle", {
            "no-mobile": !name,
          })}
        >
          <IconTruck className={cx("__icon", "__vehicle-icon")} />
          <div className={cx("__column", "__vehicle-info")}>
            <div className={cx("__vehicle-name")}>{name}</div>
            <div className={cx("__vehicle-description")}>
              {vehicle} ({plate})
            </div>
            <div className={cx("__vehicle-update")}>
              {moment(lastUpdate).format("DD/MM/YYYY-HH:mm:ss")}
            </div>
          </div>
        </div>

        {/* Speed */}
        <div
          className={cx("__group", "__speed", {
            "__speed--hidden": !name,
          })}
        >
          <IconSpeed className={cx("__icon", "__speed-icon")} />
          <div className={cx("__column", "__speed-info")}>
            <div className={cx("__speed-theme")}>{speed} km/h</div>
          </div>
        </div>

        {/* Temperature */}
        <div
          className={cx("__group", "__temperature", {
            "__temperature--hidden": !name,
          })}
        >
          <IconTemperature className={cx("__icon", "__temperature-icon")} />
          <div className={cx("__column", "__temperature-info")}>
            <div className={cx("__temperature-theme")}>{temperature}&deg;C</div>
          </div>
        </div>

        {/* Location */}
        <div
          className={cx("__group", "__location", {
            "__location--hidden": !location,
          })}
        >
          <IconLocation className={cx("__icon", "__location-icon")} />
          <div className={cx("__column", "__location-info")}>
            <div className={cx("__location-theme")}>
              {parseFloat(location[0].toFixed(3))}
              {", "}
              {parseFloat(location[1].toFixed(3))}
            </div>
          </div>
        </div>

        {/* Buttons ([Online|Offline]) */}
        <div className={cx("__group", "__buttons")}>
          <Button
            onClick={onConnectClick}
            className={cx("__button", { "__button--hidden": online })}
          >
            Connecter
          </Button>

          <Button
            onClick={onDisconnectClick}
            className={cx("__button", { "__button--hidden": !online })}
          >
            Déconnecter
          </Button>
        </div>
      </div>
    );
  }
);

export default Vehicle;
