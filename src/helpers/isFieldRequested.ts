import { GraphQLResolveInfo, SelectionNode } from "graphql";

export const isFieldRequested = (
  info: GraphQLResolveInfo,
  fieldName: string,
): boolean | Record<string, any> => {
  // Ajustado para permitir retorno de objetos aninhados
  const firstLevelSelectionSets = info.fieldNodes[0].selectionSet.selections;

  for (const selection of firstLevelSelectionSets) {
    const verify = verifySelection(selection, fieldName);
    if (verify.success) {
      // Utilize mountPrismaIncludeObject para construir o objeto de seleção, incluindo seleções aninhadas
      const includeSchema = mountPrismaIncludeObject(verify.schema);

      // Se o includeSchema for um objeto (indicando seleções aninhadas), retorne o objeto; caso contrário, retorne true
      return typeof includeSchema === "object"
        ? { select: includeSchema }
        : true;
    }
  }
};

const verifySelection = (
  selection: SelectionNode,
  requestedFieldName: string,
): { success: boolean; schema?: Readonly<SelectionNode[]> } => {
  if ("name" in selection && selection.name.value === requestedFieldName) {
    if ("selectionSet" in selection && selection.selectionSet?.selections) {
      return { success: true, schema: selection.selectionSet.selections };
    }
    return { success: true };
  }

  if ("selectionSet" in selection && selection.selectionSet?.selections) {
    for (const subSelection of selection.selectionSet.selections) {
      const subResult = verifySelection(subSelection, requestedFieldName);
      if (subResult.success) return { success: true, schema: subResult.schema };
    }
  }

  return { success: false };
};

const mountPrismaIncludeObject = (
  schema?: readonly SelectionNode[],
): boolean | Record<string, any> => {
  if (!schema) return true;

  const prismaIncludeSchema: Record<string, any> = {};
  for (const selection of schema) {
    if (
      !("name" in selection) ||
      !selection.name.value ||
      selection.name.value === "__typename"
    )
      continue;

    const nestedSelections =
      "selectionSet" in selection && selection.selectionSet
        ? mountPrismaIncludeObject(selection.selectionSet.selections)
        : true;

    prismaIncludeSchema[selection.name.value] = { select: nestedSelections };
  }
  return prismaIncludeSchema;
};
