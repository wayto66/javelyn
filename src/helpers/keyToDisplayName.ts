const keyToDisplayNameMap = new Map<string, string>([
  ["companyid", ""],
  ["cpf", "CPF"],
  ["phone", "Telefone"],
  ["name", "Nome"],
  ["lead", "Lead"],
]);

export const keyToDisplayName = (key: string): string => {
  return keyToDisplayNameMap.get(key.toLocaleLowerCase()) ?? key ?? "???";
};
