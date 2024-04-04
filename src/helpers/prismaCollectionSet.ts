export const prismaCollectionSet = (ids: number[] | undefined) => {
  if (!ids) return undefined;
  return {
    set: ids.map((objId) => {
      return {
        id: objId,
      };
    }),
  };
};
