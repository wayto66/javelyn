export const prismaCollectionConnect = (ids: number[] | undefined) => {
  if (!ids) return undefined;
  return {
    connect: ids.map((objId) => {
      return {
        id: objId,
      };
    }),
  };
};
