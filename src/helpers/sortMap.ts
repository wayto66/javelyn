import { SortBy } from "src/graphql";

export const sortMap = new Map<SortBy, any>([
  [
    SortBy.AZ,
    {
      name: "asc",
    },
  ],
  [
    SortBy.ZA,
    {
      name: "desc",
    },
  ],
  [
    SortBy.COSTLIER,
    {
      value: "asc",
    },
  ],
  [
    SortBy.CHEAPER,
    {
      value: "desc",
    },
  ],
  [
    SortBy.NEWER,
    {
      createdAt: "desc",
    },
  ],
  [
    SortBy.OLDER,
    {
      createdAt: "asc",
    },
  ],
]);
