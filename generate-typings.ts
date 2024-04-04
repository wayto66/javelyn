import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

export const generateTypings = async () => {
  const definitionsFactory = new GraphQLDefinitionsFactory();
  await definitionsFactory.generate({
    typePaths: ["./src/modules/**/*.graphql"],
    path: join(process.cwd(), "src/graphql.ts"),
    outputAs: "class",
  });
};

void generateTypings();
