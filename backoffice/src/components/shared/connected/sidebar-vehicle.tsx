import { IconSpeed, IconTemperature } from "components/shared/icons";
import { observer } from "mobx-react";
import React from "react";
import { classNamesPrefix } from "utils/react";
import "./sidebar-vehicle.scss";

const block = "sidebar-vehicle";
const cx = classNamesPrefix(block);

type DriverProps = {
  id: string;
  name: string;
  vehicle: string;
  online: boolean;
  plate: string;
  speed: number;
  temperature: number;
  onClick: (e: any) => void;
};

const Vehicle = observer(
  ({
    name,
    vehicle,
    online,
    plate,
    speed,
    temperature,
    onClick,
  }: DriverProps) => {
    // const onConnectClick = useCallback(() => {
    //   state.vehicles.setOnline(id, true);
    // }, []);
    // const onDisconnectClick = useCallback(() => {
    //   state.vehicles.setOnline(id, false);
    // }, []);
    return (
      <div className={block}>
        {/* Info */}
        <div
          className={cx("__group", "__vehicle", {
            "__vehicle-online": online,
          })}
          onClick={(e) => onClick(e)}
        >
          <div className={cx("__column")}>
            <div className={cx("__vehicle-name")}>{name}</div>
            <div className={cx("__vehicle-description")}>
              {vehicle} ({plate})
            </div>
            <div className={cx("__vehicle-speed-temperature")}>
              {speed} km/h - {temperature}&deg;C
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Vehicle;
