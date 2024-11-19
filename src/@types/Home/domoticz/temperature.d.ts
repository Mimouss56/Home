export interface IDevices {
  BatteryLevel: number,
  Data: string,
  Description: string,
  HardwareDisabled: boolean,
  HardwareID: number,
  HardwareName: string,
  HardwareType: string,
  HardwareTypeVal: number,
  HaveTimeout: boolean,
  ID: string,
  LastUpdate: string,
  Name: string,
  SubType: string,
  Type: string,
  Temp: number,
  TypeImg: string,
  idx: string,

}

export interface ITempHumBaroDevice extends IDevices {
  Barometer: number,
  Forecast: number,
  ForecastStr: string,
  Humidity: number,
}

export type IVanneDevice = IDevices;

export interface IAirQualityDevice extends IDevices {
  Quality: string,
}
