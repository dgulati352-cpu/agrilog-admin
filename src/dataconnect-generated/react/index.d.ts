import { CreateFarmerData, CreatePlotData, CreateTaskData, CreateHarvestData, CreateInventoryData, DeleteFarmerData, DeletePlotData, DeleteTaskData, DeleteHarvestData, DeleteInventoryData, UpdateFarmerData, UpdatePlotData, UpdateTaskData, UpdateHarvestData, UpdateInventoryData, GetFarmerData, GetPlotData, GetTaskData, GetHarvestData, GetInventoryData, ListFarmersData, ListPlotsData, ListTasksData, ListHarvestsData, ListInventoryData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateFarmer(options?: useDataConnectMutationOptions<CreateFarmerData, FirebaseError, void>): UseDataConnectMutationResult<CreateFarmerData, undefined>;
export function useCreateFarmer(dc: DataConnect, options?: useDataConnectMutationOptions<CreateFarmerData, FirebaseError, void>): UseDataConnectMutationResult<CreateFarmerData, undefined>;

export function useCreatePlot(options?: useDataConnectMutationOptions<CreatePlotData, FirebaseError, void>): UseDataConnectMutationResult<CreatePlotData, undefined>;
export function useCreatePlot(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePlotData, FirebaseError, void>): UseDataConnectMutationResult<CreatePlotData, undefined>;

export function useCreateTask(options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, void>): UseDataConnectMutationResult<CreateTaskData, undefined>;
export function useCreateTask(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, void>): UseDataConnectMutationResult<CreateTaskData, undefined>;

export function useCreateHarvest(options?: useDataConnectMutationOptions<CreateHarvestData, FirebaseError, void>): UseDataConnectMutationResult<CreateHarvestData, undefined>;
export function useCreateHarvest(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHarvestData, FirebaseError, void>): UseDataConnectMutationResult<CreateHarvestData, undefined>;

export function useCreateInventory(options?: useDataConnectMutationOptions<CreateInventoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateInventoryData, undefined>;
export function useCreateInventory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateInventoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateInventoryData, undefined>;

export function useDeleteFarmer(options?: useDataConnectMutationOptions<DeleteFarmerData, FirebaseError, void>): UseDataConnectMutationResult<DeleteFarmerData, undefined>;
export function useDeleteFarmer(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFarmerData, FirebaseError, void>): UseDataConnectMutationResult<DeleteFarmerData, undefined>;

export function useDeletePlot(options?: useDataConnectMutationOptions<DeletePlotData, FirebaseError, void>): UseDataConnectMutationResult<DeletePlotData, undefined>;
export function useDeletePlot(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePlotData, FirebaseError, void>): UseDataConnectMutationResult<DeletePlotData, undefined>;

export function useDeleteTask(options?: useDataConnectMutationOptions<DeleteTaskData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTaskData, undefined>;
export function useDeleteTask(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTaskData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTaskData, undefined>;

export function useDeleteHarvest(options?: useDataConnectMutationOptions<DeleteHarvestData, FirebaseError, void>): UseDataConnectMutationResult<DeleteHarvestData, undefined>;
export function useDeleteHarvest(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteHarvestData, FirebaseError, void>): UseDataConnectMutationResult<DeleteHarvestData, undefined>;

export function useDeleteInventory(options?: useDataConnectMutationOptions<DeleteInventoryData, FirebaseError, void>): UseDataConnectMutationResult<DeleteInventoryData, undefined>;
export function useDeleteInventory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteInventoryData, FirebaseError, void>): UseDataConnectMutationResult<DeleteInventoryData, undefined>;

export function useUpdateFarmer(options?: useDataConnectMutationOptions<UpdateFarmerData, FirebaseError, void>): UseDataConnectMutationResult<UpdateFarmerData, undefined>;
export function useUpdateFarmer(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFarmerData, FirebaseError, void>): UseDataConnectMutationResult<UpdateFarmerData, undefined>;

export function useUpdatePlot(options?: useDataConnectMutationOptions<UpdatePlotData, FirebaseError, void>): UseDataConnectMutationResult<UpdatePlotData, undefined>;
export function useUpdatePlot(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePlotData, FirebaseError, void>): UseDataConnectMutationResult<UpdatePlotData, undefined>;

export function useUpdateTask(options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, void>): UseDataConnectMutationResult<UpdateTaskData, undefined>;
export function useUpdateTask(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, void>): UseDataConnectMutationResult<UpdateTaskData, undefined>;

export function useUpdateHarvest(options?: useDataConnectMutationOptions<UpdateHarvestData, FirebaseError, void>): UseDataConnectMutationResult<UpdateHarvestData, undefined>;
export function useUpdateHarvest(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHarvestData, FirebaseError, void>): UseDataConnectMutationResult<UpdateHarvestData, undefined>;

export function useUpdateInventory(options?: useDataConnectMutationOptions<UpdateInventoryData, FirebaseError, void>): UseDataConnectMutationResult<UpdateInventoryData, undefined>;
export function useUpdateInventory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInventoryData, FirebaseError, void>): UseDataConnectMutationResult<UpdateInventoryData, undefined>;

export function useGetFarmer(options?: useDataConnectQueryOptions<GetFarmerData>): UseDataConnectQueryResult<GetFarmerData, undefined>;
export function useGetFarmer(dc: DataConnect, options?: useDataConnectQueryOptions<GetFarmerData>): UseDataConnectQueryResult<GetFarmerData, undefined>;

export function useGetPlot(options?: useDataConnectQueryOptions<GetPlotData>): UseDataConnectQueryResult<GetPlotData, undefined>;
export function useGetPlot(dc: DataConnect, options?: useDataConnectQueryOptions<GetPlotData>): UseDataConnectQueryResult<GetPlotData, undefined>;

export function useGetTask(options?: useDataConnectQueryOptions<GetTaskData>): UseDataConnectQueryResult<GetTaskData, undefined>;
export function useGetTask(dc: DataConnect, options?: useDataConnectQueryOptions<GetTaskData>): UseDataConnectQueryResult<GetTaskData, undefined>;

export function useGetHarvest(options?: useDataConnectQueryOptions<GetHarvestData>): UseDataConnectQueryResult<GetHarvestData, undefined>;
export function useGetHarvest(dc: DataConnect, options?: useDataConnectQueryOptions<GetHarvestData>): UseDataConnectQueryResult<GetHarvestData, undefined>;

export function useGetInventory(options?: useDataConnectQueryOptions<GetInventoryData>): UseDataConnectQueryResult<GetInventoryData, undefined>;
export function useGetInventory(dc: DataConnect, options?: useDataConnectQueryOptions<GetInventoryData>): UseDataConnectQueryResult<GetInventoryData, undefined>;

export function useListFarmers(options?: useDataConnectQueryOptions<ListFarmersData>): UseDataConnectQueryResult<ListFarmersData, undefined>;
export function useListFarmers(dc: DataConnect, options?: useDataConnectQueryOptions<ListFarmersData>): UseDataConnectQueryResult<ListFarmersData, undefined>;

export function useListPlots(options?: useDataConnectQueryOptions<ListPlotsData>): UseDataConnectQueryResult<ListPlotsData, undefined>;
export function useListPlots(dc: DataConnect, options?: useDataConnectQueryOptions<ListPlotsData>): UseDataConnectQueryResult<ListPlotsData, undefined>;

export function useListTasks(options?: useDataConnectQueryOptions<ListTasksData>): UseDataConnectQueryResult<ListTasksData, undefined>;
export function useListTasks(dc: DataConnect, options?: useDataConnectQueryOptions<ListTasksData>): UseDataConnectQueryResult<ListTasksData, undefined>;

export function useListHarvests(options?: useDataConnectQueryOptions<ListHarvestsData>): UseDataConnectQueryResult<ListHarvestsData, undefined>;
export function useListHarvests(dc: DataConnect, options?: useDataConnectQueryOptions<ListHarvestsData>): UseDataConnectQueryResult<ListHarvestsData, undefined>;

export function useListInventory(options?: useDataConnectQueryOptions<ListInventoryData>): UseDataConnectQueryResult<ListInventoryData, undefined>;
export function useListInventory(dc: DataConnect, options?: useDataConnectQueryOptions<ListInventoryData>): UseDataConnectQueryResult<ListInventoryData, undefined>;
