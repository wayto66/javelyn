import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { DateTimeResolver } from "graphql-scalars";
import GraphQLJSON from "graphql-type-json";
import { join } from "path";
import { PrismaModule } from "prisma/prisma.module";
import { EncryptModule } from "./handlers/encrypt/encrypt.module";
import { GatewayModule } from "./handlers/gateway/gateway.module";
import { ExceptionModule } from "./infra/common/exception/exception.module";
import { AttributeModule } from "./modules/attribute/attribute.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { CompanyModule } from "./modules/company/company.module";
import { LeadModule } from "./modules/lead/lead.module";
import { ProductModule } from "./modules/product/product.module";
import { QuoteModule } from "./modules/quote/quote.module";
import { QuoteProductModule } from "./modules/quoteProduct/quoteProduct.module";
import { RoleModule } from "./modules/role/role.module";
import { TagModule } from "./modules/tag/tag.module";
import { TaskModule } from "./modules/task/task.module";
import { TaskCategoryModule } from "./modules/taskCategory/taskCategory.module";
import { ThrowModule } from "./modules/throw/throw.module";
import { TicketModule } from "./modules/ticket/ticket.module";
import { TicketProductModule } from "./modules/ticketProduct/ticketProduct.module";
import { UserModule } from "./modules/user/user.module";
import { WhatsappModule } from "./modules/whatsapp/whatsapp.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./src/**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "class",
      },
      resolvers: { JSON: GraphQLJSON, DateTime: DateTimeResolver },
    }),
    CompanyModule,
    CategoryModule,
    QuoteModule,
    TaskModule,
    ThrowModule,
    RoleModule,
    UserModule,
    LeadModule,
    ProductModule,
    QuoteProductModule,
    TicketProductModule,
    TicketModule,
    EncryptModule,
    PrismaModule,
    GatewayModule,
    AuthModule,
    ExceptionModule,
    TagModule,
    WhatsappModule,
    TaskCategoryModule,
    AttributeModule,
  ],
})
export class AppModule {}
