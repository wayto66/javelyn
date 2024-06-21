export interface ILeadgenValue {
  ad_id: string;
  form_id: string;
  leadgen_id: string;
  created_time: number;
  page_id: string;
  adgroup_id: string;
}

export interface ILeadgenChange {
  field: string;
  value: ILeadgenValue;
}

export interface ILeadgenEvent {
  id: string;
  time: number;
  changes: ILeadgenChange[];
}
