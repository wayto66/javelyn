
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AtributeType {
    LEAD = "LEAD",
    QUOTE = "QUOTE",
    TICKET = "TICKET",
    PRODUCT = "PRODUCT"
}

export enum AtributeValueType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    STRING_ARRAY = "STRING_ARRAY",
    NUMBER_ARRAY = "NUMBER_ARRAY",
    JSON = "JSON"
}

export enum SortBy {
    CHEAPER = "CHEAPER",
    COSTLIER = "COSTLIER",
    NEWER = "NEWER",
    OLDER = "OLDER",
    AZ = "AZ",
    ZA = "ZA"
}

export class CreateAttributeInput {
    companyId: number;
    userId: number;
    name: string;
    observation?: Nullable<string>;
    types: Nullable<AtributeType>[];
    valueType: AtributeValueType;
}

export class UpdateAttributeInput {
    id: number;
    companyId?: Nullable<number>;
    name?: Nullable<string>;
    observation?: Nullable<string>;
    types?: Nullable<Nullable<AtributeType>[]>;
    valueType?: Nullable<AtributeValueType>;
    isActive?: Nullable<boolean>;
}

export class SignInInput {
    username: string;
    password: string;
}

export class CreateCategoryInput {
    companyId: number;
    name: string;
}

export class UpdateCategoryInput {
    id: number;
    name: string;
    companyId: number;
}

export class CreateCompanyInput {
    name: string;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    plan?: Nullable<string>;
    max_whatsapp_slots?: Nullable<number>;
    whatsapp_slots?: Nullable<number>;
    is_active?: Nullable<boolean>;
    customFields?: Nullable<CustomScalar>;
}

export class UpdateCompanyInput {
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    plan?: Nullable<string>;
    max_whatsapp_slots?: Nullable<number>;
    whatsapp_slots?: Nullable<number>;
    is_active?: Nullable<boolean>;
    customFields?: Nullable<CustomScalar>;
}

export class CreateLeadInput {
    companyId: number;
    userId: number;
    name: string;
    CPF?: Nullable<string>;
    phone?: Nullable<string>;
    mail?: Nullable<string>;
    adOrigin?: Nullable<string>;
    status?: Nullable<string>;
    observation?: Nullable<string>;
    customFields?: Nullable<CustomScalar>;
    age?: Nullable<number>;
    neighborhood?: Nullable<string>;
    adress?: Nullable<string>;
    zipCode?: Nullable<string>;
    houseNumber?: Nullable<number>;
    profession?: Nullable<string>;
    birthday?: Nullable<DateTime>;
    birthdayDay?: Nullable<number>;
    birthdayMonth?: Nullable<number>;
    birthdayYear?: Nullable<number>;
    isRescue?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    tagsIds?: Nullable<Nullable<number>[]>;
}

export class CreateLeadsInput {
    leads: CreateLeadInput[];
}

export class UpdateLeadInput {
    id: number;
    companyId?: Nullable<number>;
    userId?: Nullable<number>;
    name?: Nullable<string>;
    CPF?: Nullable<string>;
    phone?: Nullable<string>;
    mail?: Nullable<string>;
    adOrigin?: Nullable<string>;
    status?: Nullable<string>;
    observation?: Nullable<string>;
    age?: Nullable<number>;
    neighborhood?: Nullable<string>;
    customFields?: Nullable<CustomScalar>;
    adress?: Nullable<string>;
    zipCode?: Nullable<string>;
    houseNumber?: Nullable<number>;
    profession?: Nullable<string>;
    birthday?: Nullable<DateTime>;
    birthdayDay?: Nullable<number>;
    birthdayMonth?: Nullable<number>;
    birthdayYear?: Nullable<number>;
    isRescue?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    tagsIds?: Nullable<Nullable<number>[]>;
}

export class FiltersInput {
    userId?: Nullable<number>;
    companyId?: Nullable<number>;
    filterId?: Nullable<number>;
    tagIds?: Nullable<Nullable<number>[]>;
    productIds?: Nullable<Nullable<number>[]>;
    categoryId?: Nullable<number>;
    categoryName?: Nullable<string>;
    name?: Nullable<string>;
    CPF?: Nullable<string>;
    phone?: Nullable<string>;
    sort?: Nullable<SortBy>;
    includeInactive?: Nullable<boolean>;
    includeHandled?: Nullable<boolean>;
    demandAllConditions?: Nullable<boolean>;
    dateGt?: Nullable<string>;
    dateLt?: Nullable<string>;
    customFilters?: Nullable<CustomScalar>;
}

export class CreateProductInput {
    companyId: number;
    sku: string;
    categoryId: number;
    tagsIds?: Nullable<Nullable<number>[]>;
    name: string;
    value?: Nullable<number>;
    customFields?: Nullable<CustomScalar>;
}

export class UpdateProductInput {
    id: number;
    sku?: Nullable<string>;
    companyId?: Nullable<number>;
    categoryId?: Nullable<number>;
    tagsIds?: Nullable<Nullable<number>[]>;
    name?: Nullable<string>;
    value?: Nullable<number>;
    isActive?: Nullable<boolean>;
    customFields?: Nullable<CustomScalar>;
}

export class QuoteProductInput {
    productId: number;
    value: number;
    amount: number;
}

export class CreateQuoteInput {
    companyId: number;
    userId: number;
    leadId: number;
    ticketId?: Nullable<number>;
    observation?: Nullable<string>;
    value: number;
    products?: Nullable<Nullable<QuoteProductInput>[]>;
    tagsIds?: Nullable<Nullable<number>[]>;
    customFields?: Nullable<CustomScalar>;
}

export class UpdateQuoteInput {
    id: number;
    companyId?: Nullable<number>;
    userId?: Nullable<number>;
    leadId?: Nullable<number>;
    ticketId?: Nullable<number>;
    observation?: Nullable<string>;
    value?: Nullable<number>;
    products?: Nullable<Nullable<QuoteProductInput>[]>;
    tagsIds?: Nullable<Nullable<number>[]>;
    handledAt?: Nullable<DateTime>;
    isActive?: Nullable<boolean>;
    customFields?: Nullable<CustomScalar>;
}

export class CreateQuoteProductInput {
    productId: number;
    quoteId: number;
    amount: number;
    value: number;
}

export class UpdateQuoteProductInput {
    id: number;
    productId: number;
    quoteId: number;
    amount: number;
    value: number;
}

export class CreateRoleInput {
    companyId: number;
    name: string;
    permissions?: Nullable<JSON>;
    isActive: boolean;
}

export class UpdateRoleInput {
    id: number;
    companyId: number;
    name: string;
    permissions?: Nullable<JSON>;
    isActive: boolean;
}

export class CreateTagInput {
    companyId: number;
    name: string;
    colorHex: string;
    description?: Nullable<string>;
}

export class UpdateTagInput {
    id: number;
    companyId?: Nullable<number>;
    name?: Nullable<string>;
    colorHex?: Nullable<string>;
    description?: Nullable<string>;
    quotesIds?: Nullable<Nullable<number>[]>;
    leadsIds?: Nullable<Nullable<number>[]>;
    ticketsIds?: Nullable<Nullable<number>[]>;
    productsIds?: Nullable<Nullable<number>[]>;
    isActive?: Nullable<boolean>;
}

export class CreateTaskInput {
    companyId: number;
    userId: number;
    title: string;
    body: string;
    observation?: Nullable<string>;
    conclusion?: Nullable<string>;
    categoryId: number;
    leadIds: Nullable<number>[];
    quoteIds?: Nullable<Nullable<number>[]>;
    taskIds?: Nullable<Nullable<number>[]>;
    targetDate: DateTime;
}

export class UpdateTaskInput {
    id: number;
    companyId?: Nullable<number>;
    userId?: Nullable<number>;
    title?: Nullable<string>;
    body?: Nullable<string>;
    observation?: Nullable<string>;
    conclusion?: Nullable<string>;
    categoryId?: Nullable<number>;
    leadIds?: Nullable<Nullable<number>[]>;
    quoteIds?: Nullable<Nullable<number>[]>;
    taskIds?: Nullable<Nullable<number>[]>;
    isHandled?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    targetDate?: Nullable<DateTime>;
    handledAt?: Nullable<DateTime>;
}

export class CreateTaskCategoryInput {
    companyId: number;
    name: string;
    color: string;
}

export class UpdateTaskCategoryInput {
    id: number;
    name: string;
    color: string;
    companyId: number;
}

export class LeadInput {
    id: number;
}

export class CreateThrowInput {
    companyId: number;
    userId: number;
    body: string;
    targets?: Nullable<Nullable<LeadInput>[]>;
}

export class UpdateThrowInput {
    id: number;
    companyId?: Nullable<number>;
    userId?: Nullable<number>;
    body?: Nullable<string>;
    targets?: Nullable<Nullable<LeadInput>[]>;
}

export class CreateTicketTicketProductInput {
    productId: number;
    amount: number;
    value: number;
}

export class QuoteInput {
    id: number;
}

export class CreateTicketInput {
    userId: number;
    leadId: number;
    companyId: number;
    tagsIds?: Nullable<Nullable<number>[]>;
    value: number;
    origin?: Nullable<string>;
    observation?: Nullable<string>;
    quotes?: Nullable<Nullable<QuoteInput>[]>;
    products?: Nullable<Nullable<CreateTicketTicketProductInput>[]>;
    customFields?: Nullable<CustomScalar>;
}

export class UpdateTicketInput {
    id: number;
    userId?: Nullable<number>;
    leadId?: Nullable<number>;
    tagsIds?: Nullable<Nullable<number>[]>;
    companyId?: Nullable<number>;
    value?: Nullable<number>;
    origin?: Nullable<string>;
    observation?: Nullable<string>;
    quotes?: Nullable<Nullable<QuoteInput>[]>;
    products?: Nullable<Nullable<CreateTicketTicketProductInput>[]>;
    isActive?: Nullable<boolean>;
    customFields?: Nullable<CustomScalar>;
}

export class CreateTicketProductInput {
    productId: number;
    ticketId: number;
    amount: number;
    value: number;
}

export class UpdateTicketProductInput {
    id: number;
    productId?: Nullable<number>;
    ticketId?: Nullable<number>;
    amount?: Nullable<number>;
    value?: Nullable<number>;
}

export class CreateUserInput {
    companyId: number;
    permissions?: Nullable<CustomScalar>;
    username: string;
    password: string;
    name: string;
}

export class UpdateUserInput {
    id: number;
    companyId?: Nullable<number>;
    permissions?: Nullable<CustomScalar>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    name?: Nullable<string>;
    zapQrcode?: Nullable<string>;
    zapStatus?: Nullable<string>;
    isActive?: Nullable<boolean>;
}

export class ConnectWhatsappInput {
    companyId: number;
    userId: number;
}

export class DisconnectWhatsappInput {
    companyId: number;
    userId: number;
}

export class ShutdownWhatsappInput {
    userId: number;
    companyId: number;
}

export class SendMessageInput {
    userId: number;
    message: string;
    leadIds?: Nullable<Nullable<number>[]>;
    companyId: number;
    file?: Nullable<CustomScalar>;
    phoneNumbers?: Nullable<Nullable<string>[]>;
}

export class Attribute {
    id: number;
    companyId: number;
    userId: number;
    name: string;
    observation?: Nullable<string>;
    types: Nullable<AtributeType>[];
    valueType: AtributeValueType;
    company: Company;
    user: User;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyAttributeReponse {
    objects: Nullable<Attribute>[];
    total: number;
}

export abstract class IQuery {
    abstract attributes(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyAttributeReponse | Promise<FindManyAttributeReponse>;

    abstract attribute(id: number): Nullable<Attribute> | Promise<Nullable<Attribute>>;

    abstract categories(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyCategoryResponse | Promise<FindManyCategoryResponse>;

    abstract category(id: number): Nullable<Category> | Promise<Nullable<Category>>;

    abstract companies(): Nullable<Company>[] | Promise<Nullable<Company>[]>;

    abstract company(id?: Nullable<number>): Nullable<Company> | Promise<Nullable<Company>>;

    abstract leads(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyLeadsResponse | Promise<FindManyLeadsResponse>;

    abstract lead(id: number): Nullable<Lead> | Promise<Nullable<Lead>>;

    abstract products(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyProductsResponse | Promise<FindManyProductsResponse>;

    abstract product(id: number): Nullable<Product> | Promise<Nullable<Product>>;

    abstract quotes(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyQuotesResponse | Promise<FindManyQuotesResponse>;

    abstract quote(id: number): Nullable<Quote> | Promise<Nullable<Quote>>;

    abstract quoteProducts(): Nullable<QuoteProduct>[] | Promise<Nullable<QuoteProduct>[]>;

    abstract quoteProduct(id: number): Nullable<QuoteProduct> | Promise<Nullable<QuoteProduct>>;

    abstract roles(): Nullable<Role>[] | Promise<Nullable<Role>[]>;

    abstract role(id: number): Nullable<Role> | Promise<Nullable<Role>>;

    abstract tags(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyTagReponse | Promise<FindManyTagReponse>;

    abstract tag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract tasks(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyTasksResponse | Promise<FindManyTasksResponse>;

    abstract task(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract taskCategories(page: number, pageSize: number): FindManyTaskCategoryResponse | Promise<FindManyTaskCategoryResponse>;

    abstract taskCategory(id: number): Nullable<TaskCategory> | Promise<Nullable<TaskCategory>>;

    abstract throws(): Nullable<Throw>[] | Promise<Nullable<Throw>[]>;

    abstract throw(id: number): Nullable<Throw> | Promise<Nullable<Throw>>;

    abstract tickets(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyTicketsResponse | Promise<FindManyTicketsResponse>;

    abstract ticket(id: number): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract ticketProducts(): Nullable<TicketProduct>[] | Promise<Nullable<TicketProduct>[]>;

    abstract ticketProduct(id: number): Nullable<TicketProduct> | Promise<Nullable<TicketProduct>>;

    abstract users(page: number, pageSize: number, filters?: Nullable<FiltersInput>): FindManyUserResponse | Promise<FindManyUserResponse>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createAttribute(createAttributeInput: CreateAttributeInput): Attribute | Promise<Attribute>;

    abstract updateAttribute(updateAttributeInput: UpdateAttributeInput): Attribute | Promise<Attribute>;

    abstract removeAttribute(id: number): Nullable<Attribute> | Promise<Nullable<Attribute>>;

    abstract signIn(signInInput: SignInInput): AuthResponse | Promise<AuthResponse>;

    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract removeCategory(id: number): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createCompany(createCompanyInput: CreateCompanyInput): Company | Promise<Company>;

    abstract updateCompany(updateCompanyInput: UpdateCompanyInput): Nullable<Company> | Promise<Nullable<Company>>;

    abstract removeCompany(id: number): Nullable<Company> | Promise<Nullable<Company>>;

    abstract createLead(createLeadInput: CreateLeadInput): CreateLeadResponse | Promise<CreateLeadResponse>;

    abstract createLeads(createLeadsInput: CreateLeadsInput): CreateLeadsResponse | Promise<CreateLeadsResponse>;

    abstract updateLead(updateLeadInput: UpdateLeadInput): Lead | Promise<Lead>;

    abstract removeLead(id: number): Nullable<Lead> | Promise<Nullable<Lead>>;

    abstract createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(updateProductInput: UpdateProductInput): Product | Promise<Product>;

    abstract removeProduct(id: number): Nullable<Product> | Promise<Nullable<Product>>;

    abstract createQuote(createQuoteInput: CreateQuoteInput): Quote | Promise<Quote>;

    abstract updateQuote(updateQuoteInput: UpdateQuoteInput): Quote | Promise<Quote>;

    abstract removeQuote(id: number): Nullable<Quote> | Promise<Nullable<Quote>>;

    abstract createQuoteProduct(createQuoteProductInput: CreateQuoteProductInput): QuoteProduct | Promise<QuoteProduct>;

    abstract updateQuoteProduct(updateQuoteProductInput: UpdateQuoteProductInput): QuoteProduct | Promise<QuoteProduct>;

    abstract removeQuoteProduct(id: number): Nullable<QuoteProduct> | Promise<Nullable<QuoteProduct>>;

    abstract createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;

    abstract updateRole(updateRoleInput: UpdateRoleInput): Role | Promise<Role>;

    abstract removeRole(id: number): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createTag(createTagInput: CreateTagInput): Tag | Promise<Tag>;

    abstract updateTag(updateTagInput: UpdateTagInput): Tag | Promise<Tag>;

    abstract removeTag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract createTask(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract removeTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createTaskCategory(createTaskCategoryInput: CreateTaskCategoryInput): TaskCategory | Promise<TaskCategory>;

    abstract updateTaskCategory(updateTaskCategoryInput: UpdateTaskCategoryInput): TaskCategory | Promise<TaskCategory>;

    abstract removeTaskCategory(id: number): Nullable<TaskCategory> | Promise<Nullable<TaskCategory>>;

    abstract createThrow(createThrowInput: CreateThrowInput): Throw | Promise<Throw>;

    abstract updateThrow(updateThrowInput: UpdateThrowInput): Throw | Promise<Throw>;

    abstract removeThrow(id: number): Nullable<Throw> | Promise<Nullable<Throw>>;

    abstract createTicket(createTicketInput: CreateTicketInput): Ticket | Promise<Ticket>;

    abstract updateTicket(updateTicketInput: UpdateTicketInput): Ticket | Promise<Ticket>;

    abstract removeTicket(id: number): Nullable<Ticket> | Promise<Nullable<Ticket>>;

    abstract createTicketProduct(createTicketProductInput: CreateTicketProductInput): TicketProduct | Promise<TicketProduct>;

    abstract updateTicketProduct(updateTicketProductInput: UpdateTicketProductInput): TicketProduct | Promise<TicketProduct>;

    abstract removeTicketProduct(id: number): Nullable<TicketProduct> | Promise<Nullable<TicketProduct>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract connectWhatsapp(connectWhatsappInput: ConnectWhatsappInput): WhatsappConnectionResponse | Promise<WhatsappConnectionResponse>;

    abstract disconnectWhatsapp(disconnectWhatsappInput: DisconnectWhatsappInput): WhatsappConnectionResponse | Promise<WhatsappConnectionResponse>;

    abstract shutdownWhatsapp(shutdownWhatsappInput: ShutdownWhatsappInput): ShutdownResponse | Promise<ShutdownResponse>;

    abstract sendMessage(sendMessageInput: SendMessageInput): SendMessageResponse | Promise<SendMessageResponse>;
}

export class AuthResponse {
    access_token?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
    username?: Nullable<string>;
    isAuthenticated: boolean;
    permissions: JSON;
}

export class Category {
    id: number;
    companyId: number;
    name: string;
    products?: Nullable<Nullable<Product>[]>;
    company: Company;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyCategoryResponse {
    objects: Nullable<Category>[];
    total: number;
}

export class Company {
    id: number;
    name: string;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    plan: string;
    maxWhatsappSlots: number;
    whatsappSlots: number;
    leads?: Nullable<Nullable<Lead>[]>;
    users?: Nullable<Nullable<User>[]>;
    tickets?: Nullable<Nullable<Ticket>[]>;
    products?: Nullable<Nullable<Product>[]>;
    tasks?: Nullable<Nullable<Task>[]>;
    quotes?: Nullable<Nullable<Quote>[]>;
    roles?: Nullable<Nullable<Role>[]>;
    categories?: Nullable<Nullable<Category>[]>;
    attributes?: Nullable<Nullable<Attribute>[]>;
    customFields?: Nullable<CustomScalar>;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class Lead {
    id: number;
    uuid?: Nullable<string>;
    companyId: number;
    userId: number;
    name: string;
    CPF?: Nullable<string>;
    phone?: Nullable<string>;
    mail?: Nullable<string>;
    adOrigin?: Nullable<string>;
    status?: Nullable<string>;
    observation?: Nullable<string>;
    customFields?: Nullable<CustomScalar>;
    age?: Nullable<number>;
    neighborhood?: Nullable<string>;
    adress?: Nullable<string>;
    zipCode?: Nullable<string>;
    houseNumber?: Nullable<number>;
    profession?: Nullable<string>;
    birthday?: Nullable<DateTime>;
    birthdayDay?: Nullable<number>;
    birthdayMonth?: Nullable<number>;
    birthdayYear?: Nullable<number>;
    throws?: Nullable<Nullable<Throw>[]>;
    tasks?: Nullable<Nullable<Task>[]>;
    tickets?: Nullable<Nullable<Ticket>[]>;
    tags?: Nullable<Nullable<Tag>[]>;
    quotes?: Nullable<Nullable<Quote>[]>;
    user: User;
    company: Company;
    isRescue: boolean;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyLeadsResponse {
    objects: Nullable<Lead>[];
    total: number;
}

export class ErrorResponse {
    message: string;
    status: string;
}

export class CreateLeadResponse {
    lead?: Nullable<Lead>;
    error?: Nullable<ErrorResponse>;
}

export class CreateLeadsResponse {
    count: number;
}

export class Product {
    id: number;
    sku: string;
    companyId: number;
    categoryId: number;
    name: string;
    value?: Nullable<number>;
    ticketProducts?: Nullable<Nullable<TicketProduct>[]>;
    quoteProducts?: Nullable<Nullable<QuoteProduct>[]>;
    tags?: Nullable<Nullable<Tag>[]>;
    customFields?: Nullable<CustomScalar>;
    company: Company;
    category: Category;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyProductsResponse {
    objects: Nullable<Product>[];
    total: number;
}

export class Quote {
    id: number;
    companyId: number;
    userId: number;
    leadId: number;
    ticketId?: Nullable<number>;
    observation?: Nullable<string>;
    value: number;
    products?: Nullable<Nullable<QuoteProduct>[]>;
    customFields?: Nullable<CustomScalar>;
    ticket?: Nullable<Ticket>;
    tasks?: Nullable<Nullable<Task>[]>;
    tags?: Nullable<Nullable<Tag>[]>;
    company: Company;
    user: User;
    lead?: Nullable<Lead>;
    handledAt?: Nullable<DateTime>;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyQuotesResponse {
    objects: Nullable<Quote>[];
    total: number;
}

export class QuoteProduct {
    id: number;
    productId: number;
    quoteId: number;
    amount: number;
    value: number;
    product: Product;
    quote: Quote;
}

export class Role {
    id: number;
    companyId: number;
    name: string;
    permissions: JSON;
    company: Company;
    users?: Nullable<Nullable<User>[]>;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class Tag {
    id: number;
    companyId: number;
    name: string;
    colorHex: string;
    description?: Nullable<string>;
    quotes?: Nullable<Nullable<Quote>[]>;
    leads?: Nullable<Nullable<Lead>[]>;
    tickets?: Nullable<Nullable<Ticket>[]>;
    products?: Nullable<Nullable<Product>[]>;
    tasks?: Nullable<Nullable<Task>[]>;
    company: Company;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyTagReponse {
    objects: Nullable<Tag>[];
    total: number;
}

export class Task {
    id: number;
    companyId: number;
    userId: number;
    title: string;
    body: string;
    observation?: Nullable<string>;
    conclusion: string;
    categoryid: number;
    category: TaskCategory;
    targets?: Nullable<Nullable<Lead>[]>;
    quotes?: Nullable<Nullable<Quote>[]>;
    tasks?: Nullable<Nullable<Task>[]>;
    user: User;
    company: Company;
    isHandled: boolean;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
    targetDate: DateTime;
    handledAt?: Nullable<DateTime>;
}

export class FindManyTasksResponse {
    objects: Nullable<Task>[];
    total: number;
}

export class TaskCategory {
    id: number;
    companyId: number;
    name: string;
    color: string;
    tasks?: Nullable<Nullable<Task>[]>;
    company: Company;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyTaskCategoryResponse {
    objects: Nullable<TaskCategory>[];
    total: number;
}

export class Throw {
    id: number;
    companyId: number;
    userId: number;
    body: string;
    targets?: Nullable<Nullable<Lead>[]>;
    user: User;
    createdAt: DateTime;
}

export class Ticket {
    id: number;
    userId: number;
    leadId: number;
    companyId: number;
    value: number;
    origin?: Nullable<string>;
    observation?: Nullable<string>;
    customFields?: Nullable<CustomScalar>;
    quotes?: Nullable<Nullable<Quote>[]>;
    tags?: Nullable<Nullable<Tag>[]>;
    lead: Lead;
    products?: Nullable<Nullable<TicketProduct>[]>;
    user: User;
    company: Company;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyTicketsResponse {
    objects: Nullable<Ticket>[];
    total: number;
}

export class TicketProduct {
    id: number;
    productId: number;
    ticketId: number;
    amount: number;
    value: number;
    product: Product;
    ticket: Ticket;
}

export class User {
    id: number;
    companyId: number;
    permissions: CustomScalar;
    username: string;
    password: string;
    name: string;
    zapQrcode: string;
    zapStatus: string;
    company: Company;
    tickets?: Nullable<Nullable<Ticket>[]>;
    throws?: Nullable<Nullable<Throw>[]>;
    tasks?: Nullable<Nullable<Task>[]>;
    quotes?: Nullable<Nullable<Quote>[]>;
    leads?: Nullable<Nullable<Lead>[]>;
    isActive: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class FindManyUserResponse {
    objects: Nullable<User>[];
    total: number;
}

export class WhatsappConnectionResponse {
    isConnected: boolean;
    qrCode?: Nullable<string>;
    message?: Nullable<string>;
}

export class SendMessageResponse {
    succeeded?: Nullable<boolean>;
}

export class ShutdownResponse {
    succeeded?: Nullable<boolean>;
}

export type DateTime = any;
export type JSON = any;
export type CustomScalar = any;
type Nullable<T> = T | null;
