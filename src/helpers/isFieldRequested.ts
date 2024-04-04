import { GraphQLResolveInfo, SelectionNode } from "graphql";

export const isFieldRequested = (
  info: GraphQLResolveInfo,
  fieldName: string,
): boolean | Record<string, any> => {
  const firstLevelSelectionSets = info.fieldNodes[0].selectionSet.selections;

  for (const selection of firstLevelSelectionSets) {
    const verify = verifySelection(selection, fieldName);
    if (verify.success) {
      const includeSchema = mountPrismaIncludeObject(verify.schema);
      if (typeof includeSchema === "boolean") return true;
      return {
        select: includeSchema,
      };
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
): boolean | Record<string, true> => {
  if (!schema) return true;
  const prismaIncludeSchema: Record<string, true> = {};
  for (const selection of schema) {
    if (
      !("name" in selection) ||
      !selection.name.value ||
      selection.name.value === "__typename"
    )
      continue;
    prismaIncludeSchema[selection.name.value] = true;
  }
  return prismaIncludeSchema;
};
