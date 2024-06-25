import { Test, TestingModule } from "@nestjs/testing";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateTaskPermissionInput,
  CreateTaskPermissionsInput,
  FiltersInput,
  UpdateTaskPermissionInput,
} from "src/graphql";
import { prismaMock } from "../../mocks/prisma.service.mock";
import { TaskPermissionService } from "./task-permission.service";

describe("TaskPermissionService", () => {
  let service: TaskPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskPermissionService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TaskPermissionService>(TaskPermissionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a task permission", async () => {
      const input: CreateTaskPermissionInput = {
        canEdit: true,
        userId: 1,
        taskId: 1,
      };
      prismaMock.taskPermission.create.mockResolvedValue({ ...input, id: 1 });

      const result = await service.create(input);
      expect(result).toEqual({ taskPermission: { ...input, id: 1 } });
      expect(prismaMock.taskPermission.create).toHaveBeenCalledWith({
        data: { canEdit: true, userId: 1, taskId: 1 },
      });
    });
  });

  describe("createMany", () => {
    it("should create multiple task permissions", async () => {
      const input: CreateTaskPermissionsInput = {
        taskPermissions: [
          { canEdit: true, userId: 1, taskId: 1 },
          { canEdit: false, userId: 2, taskId: 2 },
        ],
      };
      prismaMock.taskPermission.create
        .mockResolvedValueOnce({ ...input.taskPermissions[0], id: 1 })
        .mockResolvedValueOnce({ ...input.taskPermissions[1], id: 2 });

      const result = await service.createMany(input);
      expect(result.count).toBe(2);
      expect(prismaMock.taskPermission.create).toHaveBeenCalledTimes(2);
    });
  });

  describe("findAll", () => {
    it("should return a list of task permissions", async () => {
      const info = {} as GraphQLResolveInfo;
      const filters: FiltersInput = { userId: 1 };
      prismaMock.taskPermission.findMany.mockResolvedValueOnce([
        { id: 1 },
        { id: 2 },
      ]);
      prismaMock.taskPermission.findMany.mockResolvedValueOnce([
        { id: 1, userId: 1, taskId: 1, canEdit: true },
        { id: 2, userId: 1, taskId: 2, canEdit: false },
      ]);

      const result = await service.findAll(info, 1, 10, filters);
      expect(result).toEqual({
        objects: [
          { id: 1, userId: 1, taskId: 1, canEdit: true },
          { id: 2, userId: 1, taskId: 2, canEdit: false },
        ],
        total: 2,
      });
      expect(prismaMock.taskPermission.findMany).toHaveBeenCalledTimes(2);
    });
  });

  describe("findOne", () => {
    it("should return a single task permission", async () => {
      const info = {} as GraphQLResolveInfo;
      prismaMock.taskPermission.findUnique.mockResolvedValue({
        id: 1,
        userId: 1,
        taskId: 1,
        canEdit: true,
      });

      const result = await service.findOne(info, 1);
      expect(result).toEqual({ id: 1, userId: 1, taskId: 1, canEdit: true });
      expect(prismaMock.taskPermission.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          user: undefined, // `isFieldRequested` result
          task: undefined, // `isFieldRequested` result
        },
      });
    });
  });

  describe("update", () => {
    it("should update a task permission", async () => {
      const input: UpdateTaskPermissionInput = {
        id: 1,
        userId: 2,
        taskId: 2,
        canEdit: false,
      };
      prismaMock.taskPermission.update.mockResolvedValue(input);

      const result = await service.update(1, input);
      expect(result).toEqual({ id: 1, userId: 2, taskId: 2, canEdit: false });
      expect(prismaMock.taskPermission.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { userId: 2, taskId: 2, canEdit: false },
      });
    });
  });

  describe("remove", () => {
    it("should remove a task permission", async () => {
      prismaMock.taskPermission.delete.mockResolvedValue({ id: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({ id: 1 });
      expect(prismaMock.taskPermission.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
