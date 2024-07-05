export class IMetaLeadBody {
  data: string;
  field_data: {
    full_name: string;
    email: string;
    phone_number: string;
  };
}

export class IMetaLeadData {
  data: {
    full_name: string;
    email: string;
    phone_number: string;
  };
  formId: string;
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
  data_nascimento: string;
  sexo: "m" | "f";
  companyId: number;
  userId: number;
}

export interface IHandleMetaLeadParams {
  mail: string;
  formId: string;
  name: string;
  phone: string;
  customFields: Record<string, any>;
}
