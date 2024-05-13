import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateLeadInput,
  CreateLeadsInput,
  FiltersInput,
  UpdateLeadInput,
} from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";
import { prismaCollectionConnect } from "src/helpers/prismaCollectionConnect";
import { prismaCollectionSet } from "src/helpers/prismaCollectionSet";
import { sortMap } from "src/helpers/sortMap";

@Injectable()
export class LeadService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLeadInput: CreateLeadInput) {
    const {
      companyId,
      name,
      phone,
      userId,
      CPF,
      adOrigin,
      adress,
      birthday,
      mail,
      observation,
      profession,
      tagsIds,
      zipCode,
      houseNumber,
      customFields,
    } = createLeadInput;
    const lead = await this.prismaService.lead.create({
      data: {
        companyId,
        name,
        phone,
        userId,
        CPF,
        adOrigin,
        adress,
        birthday,
        mail,
        observation,
        profession,
        status: "CREATED",
        tags: prismaCollectionConnect(tagsIds),
        zipCode,
        houseNumber,
        customFields,
      },
    });

    return {
      lead,
    };
  }

  async createMany(createLeadsInput: CreateLeadsInput) {
    const leadCreations = createLeadsInput.leads.map((input) =>
      this.prismaService.lead
        .create({
          data: input,
        })
        .catch(() => {
          console.error("Erro ao criar lead:", input.name);
          return null;
        }),
    );

    const results = await Promise.allSettled(leadCreations);

    const successfulCreations = results.filter(
      (result) => result.status === "fulfilled" && result.value !== null,
    ).length;

    return {
      count: successfulCreations,
    };
  }

  async findAll(
    info: GraphQLResolveInfo,
    page: number,
    pageSize: number,
    filters: FiltersInput,
  ) {
    const {
      phone,
      name,
      sort,
      includeInactive,
      tagIds,
      demandAllConditions,
      userId,
      companyId,
      dateGt,
      dateLt,
      CPF,
      customFilters: inputCustomFilters,
    } = filters;

    let customFilters;

    if (inputCustomFilters && Object.entries(inputCustomFilters).length > 0) {
      customFilters = [];
      for (const [key, value] of Object.entries(inputCustomFilters)) {
        customFilters.push({
          customFields: {
            path: [key],
            equals: value,
          },
        });
      }
    }

    const isFiltersEmpty = (filters: FiltersInput) => {
      if (
        filters.name?.length > 0 ||
        filters.phone?.length > 0 ||
        filters.CPF?.length > 0 ||
        filters.tagIds?.length > 0 ||
        customFilters
      )
        return false;
      return true;
    };

    const tagIdsFilter =
      tagIds && tagIds.length > 0
        ? {
            some: {
              id: {
                in: tagIds,
              },
            },
          }
        : undefined;

    const where = isFiltersEmpty(filters)
      ? {
          isActive: includeInactive ? undefined : true,
          companyId,
          userId,
          createdAt: {
            gt: dateGt ? dateGt : undefined,
            lt: dateGt ? dateLt : undefined,
          },
        }
      : {
          [demandAllConditions ? "AND" : "OR"]: [
            name && name.length > 0
              ? {
                  name: {
                    contains: name,
                    mode: "insensitive",
                  },
                }
              : {},

            phone && phone.length > 0
              ? {
                  phone: {
                    contains: phone,
                    mode: "insensitive",
                  },
                }
              : {},

            CPF && CPF.length > 0
              ? {
                  CPF: {
                    contains: CPF,
                    mode: "insensitive",
                  },
                }
              : {},
            { tags: tagIdsFilter },
            ...(customFilters ?? []),
          ],
          isActive: includeInactive ? undefined : true,
          companyId,
          userId,
          createdAt: {
            gt: dateGt ? dateGt : undefined,
            lt: dateGt ? dateLt : undefined,
          },
        };

    const total = await this.prismaService.lead.findMany({
      where,
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.lead.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        tags: isFieldRequested(info, "tags"),
      },

      orderBy: sortMap.get(sort),
    });

    let filteredLeads = [...objects];

    if (tagIds?.length > 0) {
      filteredLeads = filteredLeads.filter((obj) => obj.tags.length > 0);
      if (demandAllConditions) {
        filteredLeads = filteredLeads.filter(
          (obj) =>
            obj.tags.length >= tagIds.length &&
            tagIds.every((id) => obj.tags.map((tag) => tag.id).includes(id)),
        );
      }
    }

    return {
      objects: filteredLeads,
      total: total.length,
    };
  }

  async findOne(info: GraphQLResolveInfo, id: number) {
    return await this.prismaService.lead.findUnique({
      where: { id },
      include: {
        tags: isFieldRequested(info, "tags"),
        tasks: isFieldRequested(info, "tasks"),
        throws: isFieldRequested(info, "throws"),
        tickets: isFieldRequested(info, "tickets"),
        quotes: isFieldRequested(info, "quotes"),
        company: isFieldRequested(info, "company"),
        user: isFieldRequested(info, "user"),
      },
    });
  }

  async update(id: number, updateLeadInput: UpdateLeadInput) {
    const {
      CPF,
      adOrigin,
      adress,
      age,
      birthday,
      birthdayDay,
      birthdayMonth,
      birthdayYear,
      houseNumber,
      isActive,
      isRescue,
      mail,
      name,
      neighborhood,
      observation,
      phone,
      profession,
      status,
      tagsIds,
      userId,
      zipCode,
      customFields,
    } = updateLeadInput;
    return await this.prismaService.lead.update({
      where: {
        id,
      },
      data: {
        CPF,
        adOrigin,
        adress,
        age,
        birthday,
        birthdayDay,
        birthdayMonth,
        birthdayYear,
        houseNumber,
        isActive,
        isRescue,
        mail,
        name,
        neighborhood,
        observation,
        phone,
        profession,
        status,
        tags: prismaCollectionSet(tagsIds),
        userId,
        zipCode,
        customFields,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.lead.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
