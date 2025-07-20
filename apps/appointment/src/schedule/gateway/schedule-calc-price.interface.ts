export interface ScheduleCalcPrice {
  calc(startDate: Date, endDate: Date, discount?: number): number;
}
