export interface ILeadgenValue {
  ad_id: string;
  form_id: string;
  leadgen_id: string;
  created_time: number;
  page_id: string;
  adgroup_id: string;
}

export interface ILeadgenChange {
  field: "leadgen";
  value: ILeadgenValue;
}

export interface ILeadgenEntry {
  id: string;
  time: number;
  changes: ILeadgenChange[];
}

export interface ILeadgenEvent {
  object: "page";
  entry: ILeadgenEntry[];
}

export interface ILojaIntegradaTicketData {
  cliente: {
    id: number;
    email: string;
    nome: string;
    telefone_celular: string;
    telefone_principal: string;
    situacao: string;
    data_nascimento: "1990-12-12";
    sexo: "m" | "f";
    data_criacao: Date;
    data_modificacao: Date;
  };
  situacao: {
    id: number;
    codigo: string;
    nome: string;
    aprovado: boolean;
    cancelado: boolean;
    final: boolean;
    notificar_comprador: boolean;
    padrao: boolean;
    situacao_alterada: boolean;
  };
}

export interface IHandleLiLeadParams {
  email: string;
  nome: string;
  telefone_celular: string;
  telefone_principal: string;
  situacao: string;
  data_nascimento: "1990-12-12";
  sexo: "m" | "f";
  companyId: number;
  userId: number;
}
