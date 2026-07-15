import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateFarmerData {
  farmer_insert: Farmer_Key;
}

export interface CreateHarvestData {
  harvest_insert: Harvest_Key;
}

export interface CreateInventoryData {
  inventory_insert: Inventory_Key;
}

export interface CreatePlotData {
  plot_insert: Plot_Key;
}

export interface CreateTaskData {
  task_insert: Task_Key;
}

export interface DeleteFarmerData {
  farmer_delete?: Farmer_Key | null;
}

export interface DeleteHarvestData {
  harvest_delete?: Harvest_Key | null;
}

export interface DeleteInventoryData {
  inventory_delete?: Inventory_Key | null;
}

export interface DeletePlotData {
  plot_delete?: Plot_Key | null;
}

export interface DeleteTaskData {
  task_delete?: Task_Key | null;
}

export interface Farmer_Key {
  id: UUIDString;
  __typename?: 'Farmer_Key';
}

export interface GetFarmerData {
  farmer?: {
    name: string;
    farmName?: string | null;
  };
}

export interface GetHarvestData {
  harvest?: {
    cropName: string;
    quantity: number;
  };
}

export interface GetInventoryData {
  inventory?: {
    itemName: string;
    quantity: number;
  };
}

export interface GetPlotData {
  plot?: {
    plotName: string;
    currentCrop?: string | null;
  };
}

export interface GetTaskData {
  task?: {
    taskName: string;
    status: string;
  };
}

export interface Harvest_Key {
  id: UUIDString;
  __typename?: 'Harvest_Key';
}

export interface Inventory_Key {
  id: UUIDString;
  __typename?: 'Inventory_Key';
}

export interface ListFarmersData {
  farmers: ({
    name: string;
    farmName?: string | null;
  })[];
}

export interface ListHarvestsData {
  harvests: ({
    cropName: string;
    harvestDate: DateString;
  })[];
}

export interface ListInventoryData {
  inventories: ({
    itemName: string;
    quantity: number;
  })[];
}

export interface ListPlotsData {
  plots: ({
    plotName: string;
    sizeInAcres: number;
  })[];
}

export interface ListTasksData {
  tasks: ({
    taskName: string;
    dueDate: TimestampString;
  })[];
}

export interface Plot_Key {
  id: UUIDString;
  __typename?: 'Plot_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface UpdateFarmerData {
  farmer_update?: Farmer_Key | null;
}

export interface UpdateHarvestData {
  harvest_update?: Harvest_Key | null;
}

export interface UpdateInventoryData {
  inventory_update?: Inventory_Key | null;
}

export interface UpdatePlotData {
  plot_update?: Plot_Key | null;
}

export interface UpdateTaskData {
  task_update?: Task_Key | null;
}

interface CreateFarmerRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateFarmerData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateFarmerData, undefined>;
  operationName: string;
}
export const createFarmerRef: CreateFarmerRef;

export function createFarmer(): MutationPromise<CreateFarmerData, undefined>;
export function createFarmer(dc: DataConnect): MutationPromise<CreateFarmerData, undefined>;

interface CreatePlotRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreatePlotData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreatePlotData, undefined>;
  operationName: string;
}
export const createPlotRef: CreatePlotRef;

export function createPlot(): MutationPromise<CreatePlotData, undefined>;
export function createPlot(dc: DataConnect): MutationPromise<CreatePlotData, undefined>;

interface CreateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTaskData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateTaskData, undefined>;
  operationName: string;
}
export const createTaskRef: CreateTaskRef;

export function createTask(): MutationPromise<CreateTaskData, undefined>;
export function createTask(dc: DataConnect): MutationPromise<CreateTaskData, undefined>;

interface CreateHarvestRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateHarvestData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateHarvestData, undefined>;
  operationName: string;
}
export const createHarvestRef: CreateHarvestRef;

export function createHarvest(): MutationPromise<CreateHarvestData, undefined>;
export function createHarvest(dc: DataConnect): MutationPromise<CreateHarvestData, undefined>;

interface CreateInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateInventoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateInventoryData, undefined>;
  operationName: string;
}
export const createInventoryRef: CreateInventoryRef;

export function createInventory(): MutationPromise<CreateInventoryData, undefined>;
export function createInventory(dc: DataConnect): MutationPromise<CreateInventoryData, undefined>;

interface DeleteFarmerRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteFarmerData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteFarmerData, undefined>;
  operationName: string;
}
export const deleteFarmerRef: DeleteFarmerRef;

export function deleteFarmer(): MutationPromise<DeleteFarmerData, undefined>;
export function deleteFarmer(dc: DataConnect): MutationPromise<DeleteFarmerData, undefined>;

interface DeletePlotRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeletePlotData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeletePlotData, undefined>;
  operationName: string;
}
export const deletePlotRef: DeletePlotRef;

export function deletePlot(): MutationPromise<DeletePlotData, undefined>;
export function deletePlot(dc: DataConnect): MutationPromise<DeletePlotData, undefined>;

interface DeleteTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTaskData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteTaskData, undefined>;
  operationName: string;
}
export const deleteTaskRef: DeleteTaskRef;

export function deleteTask(): MutationPromise<DeleteTaskData, undefined>;
export function deleteTask(dc: DataConnect): MutationPromise<DeleteTaskData, undefined>;

interface DeleteHarvestRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteHarvestData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteHarvestData, undefined>;
  operationName: string;
}
export const deleteHarvestRef: DeleteHarvestRef;

export function deleteHarvest(): MutationPromise<DeleteHarvestData, undefined>;
export function deleteHarvest(dc: DataConnect): MutationPromise<DeleteHarvestData, undefined>;

interface DeleteInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteInventoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteInventoryData, undefined>;
  operationName: string;
}
export const deleteInventoryRef: DeleteInventoryRef;

export function deleteInventory(): MutationPromise<DeleteInventoryData, undefined>;
export function deleteInventory(dc: DataConnect): MutationPromise<DeleteInventoryData, undefined>;

interface UpdateFarmerRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateFarmerData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateFarmerData, undefined>;
  operationName: string;
}
export const updateFarmerRef: UpdateFarmerRef;

export function updateFarmer(): MutationPromise<UpdateFarmerData, undefined>;
export function updateFarmer(dc: DataConnect): MutationPromise<UpdateFarmerData, undefined>;

interface UpdatePlotRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdatePlotData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdatePlotData, undefined>;
  operationName: string;
}
export const updatePlotRef: UpdatePlotRef;

export function updatePlot(): MutationPromise<UpdatePlotData, undefined>;
export function updatePlot(dc: DataConnect): MutationPromise<UpdatePlotData, undefined>;

interface UpdateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateTaskData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateTaskData, undefined>;
  operationName: string;
}
export const updateTaskRef: UpdateTaskRef;

export function updateTask(): MutationPromise<UpdateTaskData, undefined>;
export function updateTask(dc: DataConnect): MutationPromise<UpdateTaskData, undefined>;

interface UpdateHarvestRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateHarvestData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateHarvestData, undefined>;
  operationName: string;
}
export const updateHarvestRef: UpdateHarvestRef;

export function updateHarvest(): MutationPromise<UpdateHarvestData, undefined>;
export function updateHarvest(dc: DataConnect): MutationPromise<UpdateHarvestData, undefined>;

interface UpdateInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateInventoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateInventoryData, undefined>;
  operationName: string;
}
export const updateInventoryRef: UpdateInventoryRef;

export function updateInventory(): MutationPromise<UpdateInventoryData, undefined>;
export function updateInventory(dc: DataConnect): MutationPromise<UpdateInventoryData, undefined>;

interface GetFarmerRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFarmerData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetFarmerData, undefined>;
  operationName: string;
}
export const getFarmerRef: GetFarmerRef;

export function getFarmer(options?: ExecuteQueryOptions): QueryPromise<GetFarmerData, undefined>;
export function getFarmer(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetFarmerData, undefined>;

interface GetPlotRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPlotData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPlotData, undefined>;
  operationName: string;
}
export const getPlotRef: GetPlotRef;

export function getPlot(options?: ExecuteQueryOptions): QueryPromise<GetPlotData, undefined>;
export function getPlot(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetPlotData, undefined>;

interface GetTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTaskData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTaskData, undefined>;
  operationName: string;
}
export const getTaskRef: GetTaskRef;

export function getTask(options?: ExecuteQueryOptions): QueryPromise<GetTaskData, undefined>;
export function getTask(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTaskData, undefined>;

interface GetHarvestRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetHarvestData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetHarvestData, undefined>;
  operationName: string;
}
export const getHarvestRef: GetHarvestRef;

export function getHarvest(options?: ExecuteQueryOptions): QueryPromise<GetHarvestData, undefined>;
export function getHarvest(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetHarvestData, undefined>;

interface GetInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetInventoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetInventoryData, undefined>;
  operationName: string;
}
export const getInventoryRef: GetInventoryRef;

export function getInventory(options?: ExecuteQueryOptions): QueryPromise<GetInventoryData, undefined>;
export function getInventory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetInventoryData, undefined>;

interface ListFarmersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFarmersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFarmersData, undefined>;
  operationName: string;
}
export const listFarmersRef: ListFarmersRef;

export function listFarmers(options?: ExecuteQueryOptions): QueryPromise<ListFarmersData, undefined>;
export function listFarmers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFarmersData, undefined>;

interface ListPlotsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPlotsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPlotsData, undefined>;
  operationName: string;
}
export const listPlotsRef: ListPlotsRef;

export function listPlots(options?: ExecuteQueryOptions): QueryPromise<ListPlotsData, undefined>;
export function listPlots(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPlotsData, undefined>;

interface ListTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTasksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTasksData, undefined>;
  operationName: string;
}
export const listTasksRef: ListTasksRef;

export function listTasks(options?: ExecuteQueryOptions): QueryPromise<ListTasksData, undefined>;
export function listTasks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTasksData, undefined>;

interface ListHarvestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListHarvestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListHarvestsData, undefined>;
  operationName: string;
}
export const listHarvestsRef: ListHarvestsRef;

export function listHarvests(options?: ExecuteQueryOptions): QueryPromise<ListHarvestsData, undefined>;
export function listHarvests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListHarvestsData, undefined>;

interface ListInventoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInventoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListInventoryData, undefined>;
  operationName: string;
}
export const listInventoryRef: ListInventoryRef;

export function listInventory(options?: ExecuteQueryOptions): QueryPromise<ListInventoryData, undefined>;
export function listInventory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInventoryData, undefined>;

