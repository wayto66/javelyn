export interface ILeadGenData {
  object: "page";
  entry: {
    field: "leadgen";
    value: {
      ad_id: string;
      form_id: string;
      leadgen_id: string;
      created_time: number;
      page_id: string;
      adgroup_id: string;
    };
  };
}
