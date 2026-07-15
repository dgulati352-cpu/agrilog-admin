# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetFarmer*](#getfarmer)
  - [*GetPlot*](#getplot)
  - [*GetTask*](#gettask)
  - [*GetHarvest*](#getharvest)
  - [*GetInventory*](#getinventory)
  - [*ListFarmers*](#listfarmers)
  - [*ListPlots*](#listplots)
  - [*ListTasks*](#listtasks)
  - [*ListHarvests*](#listharvests)
  - [*ListInventory*](#listinventory)
- [**Mutations**](#mutations)
  - [*CreateFarmer*](#createfarmer)
  - [*CreatePlot*](#createplot)
  - [*CreateTask*](#createtask)
  - [*CreateHarvest*](#createharvest)
  - [*CreateInventory*](#createinventory)
  - [*DeleteFarmer*](#deletefarmer)
  - [*DeletePlot*](#deleteplot)
  - [*DeleteTask*](#deletetask)
  - [*DeleteHarvest*](#deleteharvest)
  - [*DeleteInventory*](#deleteinventory)
  - [*UpdateFarmer*](#updatefarmer)
  - [*UpdatePlot*](#updateplot)
  - [*UpdateTask*](#updatetask)
  - [*UpdateHarvest*](#updateharvest)
  - [*UpdateInventory*](#updateinventory)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetFarmer
You can execute the `GetFarmer` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFarmer(options?: ExecuteQueryOptions): QueryPromise<GetFarmerData, undefined>;

interface GetFarmerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFarmerData, undefined>;
}
export const getFarmerRef: GetFarmerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFarmer(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetFarmerData, undefined>;

interface GetFarmerRef {
  ...
  (dc: DataConnect): QueryRef<GetFarmerData, undefined>;
}
export const getFarmerRef: GetFarmerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFarmerRef:
```typescript
const name = getFarmerRef.operationName;
console.log(name);
```

### Variables
The `GetFarmer` query has no variables.
### Return Type
Recall that executing the `GetFarmer` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFarmerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFarmerData {
  farmer?: {
    name: string;
    farmName?: string | null;
  };
}
```
### Using `GetFarmer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFarmer } from '@dataconnect/generated';


// Call the `getFarmer()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFarmer();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFarmer(dataConnect);

console.log(data.farmer);

// Or, you can use the `Promise` API.
getFarmer().then((response) => {
  const data = response.data;
  console.log(data.farmer);
});
```

### Using `GetFarmer`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFarmerRef } from '@dataconnect/generated';


// Call the `getFarmerRef()` function to get a reference to the query.
const ref = getFarmerRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFarmerRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.farmer);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.farmer);
});
```

## GetPlot
You can execute the `GetPlot` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPlot(options?: ExecuteQueryOptions): QueryPromise<GetPlotData, undefined>;

interface GetPlotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPlotData, undefined>;
}
export const getPlotRef: GetPlotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPlot(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetPlotData, undefined>;

interface GetPlotRef {
  ...
  (dc: DataConnect): QueryRef<GetPlotData, undefined>;
}
export const getPlotRef: GetPlotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPlotRef:
```typescript
const name = getPlotRef.operationName;
console.log(name);
```

### Variables
The `GetPlot` query has no variables.
### Return Type
Recall that executing the `GetPlot` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPlotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPlotData {
  plot?: {
    plotName: string;
    currentCrop?: string | null;
  };
}
```
### Using `GetPlot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPlot } from '@dataconnect/generated';


// Call the `getPlot()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPlot();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPlot(dataConnect);

console.log(data.plot);

// Or, you can use the `Promise` API.
getPlot().then((response) => {
  const data = response.data;
  console.log(data.plot);
});
```

### Using `GetPlot`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPlotRef } from '@dataconnect/generated';


// Call the `getPlotRef()` function to get a reference to the query.
const ref = getPlotRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPlotRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.plot);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.plot);
});
```

## GetTask
You can execute the `GetTask` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTask(options?: ExecuteQueryOptions): QueryPromise<GetTaskData, undefined>;

interface GetTaskRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTaskData, undefined>;
}
export const getTaskRef: GetTaskRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTask(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTaskData, undefined>;

interface GetTaskRef {
  ...
  (dc: DataConnect): QueryRef<GetTaskData, undefined>;
}
export const getTaskRef: GetTaskRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTaskRef:
```typescript
const name = getTaskRef.operationName;
console.log(name);
```

### Variables
The `GetTask` query has no variables.
### Return Type
Recall that executing the `GetTask` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTaskData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTaskData {
  task?: {
    taskName: string;
    status: string;
  };
}
```
### Using `GetTask`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTask } from '@dataconnect/generated';


// Call the `getTask()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTask();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTask(dataConnect);

console.log(data.task);

// Or, you can use the `Promise` API.
getTask().then((response) => {
  const data = response.data;
  console.log(data.task);
});
```

### Using `GetTask`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTaskRef } from '@dataconnect/generated';


// Call the `getTaskRef()` function to get a reference to the query.
const ref = getTaskRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTaskRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.task);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.task);
});
```

## GetHarvest
You can execute the `GetHarvest` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getHarvest(options?: ExecuteQueryOptions): QueryPromise<GetHarvestData, undefined>;

interface GetHarvestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetHarvestData, undefined>;
}
export const getHarvestRef: GetHarvestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHarvest(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetHarvestData, undefined>;

interface GetHarvestRef {
  ...
  (dc: DataConnect): QueryRef<GetHarvestData, undefined>;
}
export const getHarvestRef: GetHarvestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHarvestRef:
```typescript
const name = getHarvestRef.operationName;
console.log(name);
```

### Variables
The `GetHarvest` query has no variables.
### Return Type
Recall that executing the `GetHarvest` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHarvestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetHarvestData {
  harvest?: {
    cropName: string;
    quantity: number;
  };
}
```
### Using `GetHarvest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHarvest } from '@dataconnect/generated';


// Call the `getHarvest()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHarvest();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHarvest(dataConnect);

console.log(data.harvest);

// Or, you can use the `Promise` API.
getHarvest().then((response) => {
  const data = response.data;
  console.log(data.harvest);
});
```

### Using `GetHarvest`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHarvestRef } from '@dataconnect/generated';


// Call the `getHarvestRef()` function to get a reference to the query.
const ref = getHarvestRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHarvestRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.harvest);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.harvest);
});
```

## GetInventory
You can execute the `GetInventory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInventory(options?: ExecuteQueryOptions): QueryPromise<GetInventoryData, undefined>;

interface GetInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetInventoryData, undefined>;
}
export const getInventoryRef: GetInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInventory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetInventoryData, undefined>;

interface GetInventoryRef {
  ...
  (dc: DataConnect): QueryRef<GetInventoryData, undefined>;
}
export const getInventoryRef: GetInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInventoryRef:
```typescript
const name = getInventoryRef.operationName;
console.log(name);
```

### Variables
The `GetInventory` query has no variables.
### Return Type
Recall that executing the `GetInventory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetInventoryData {
  inventory?: {
    itemName: string;
    quantity: number;
  };
}
```
### Using `GetInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInventory } from '@dataconnect/generated';


// Call the `getInventory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInventory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInventory(dataConnect);

console.log(data.inventory);

// Or, you can use the `Promise` API.
getInventory().then((response) => {
  const data = response.data;
  console.log(data.inventory);
});
```

### Using `GetInventory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInventoryRef } from '@dataconnect/generated';


// Call the `getInventoryRef()` function to get a reference to the query.
const ref = getInventoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInventoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventory);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventory);
});
```

## ListFarmers
You can execute the `ListFarmers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFarmers(options?: ExecuteQueryOptions): QueryPromise<ListFarmersData, undefined>;

interface ListFarmersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFarmersData, undefined>;
}
export const listFarmersRef: ListFarmersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFarmers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFarmersData, undefined>;

interface ListFarmersRef {
  ...
  (dc: DataConnect): QueryRef<ListFarmersData, undefined>;
}
export const listFarmersRef: ListFarmersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFarmersRef:
```typescript
const name = listFarmersRef.operationName;
console.log(name);
```

### Variables
The `ListFarmers` query has no variables.
### Return Type
Recall that executing the `ListFarmers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFarmersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFarmersData {
  farmers: ({
    name: string;
    farmName?: string | null;
  })[];
}
```
### Using `ListFarmers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFarmers } from '@dataconnect/generated';


// Call the `listFarmers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFarmers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFarmers(dataConnect);

console.log(data.farmers);

// Or, you can use the `Promise` API.
listFarmers().then((response) => {
  const data = response.data;
  console.log(data.farmers);
});
```

### Using `ListFarmers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFarmersRef } from '@dataconnect/generated';


// Call the `listFarmersRef()` function to get a reference to the query.
const ref = listFarmersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFarmersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.farmers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.farmers);
});
```

## ListPlots
You can execute the `ListPlots` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPlots(options?: ExecuteQueryOptions): QueryPromise<ListPlotsData, undefined>;

interface ListPlotsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPlotsData, undefined>;
}
export const listPlotsRef: ListPlotsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPlots(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPlotsData, undefined>;

interface ListPlotsRef {
  ...
  (dc: DataConnect): QueryRef<ListPlotsData, undefined>;
}
export const listPlotsRef: ListPlotsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPlotsRef:
```typescript
const name = listPlotsRef.operationName;
console.log(name);
```

### Variables
The `ListPlots` query has no variables.
### Return Type
Recall that executing the `ListPlots` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPlotsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPlotsData {
  plots: ({
    plotName: string;
    sizeInAcres: number;
  })[];
}
```
### Using `ListPlots`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPlots } from '@dataconnect/generated';


// Call the `listPlots()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPlots();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPlots(dataConnect);

console.log(data.plots);

// Or, you can use the `Promise` API.
listPlots().then((response) => {
  const data = response.data;
  console.log(data.plots);
});
```

### Using `ListPlots`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPlotsRef } from '@dataconnect/generated';


// Call the `listPlotsRef()` function to get a reference to the query.
const ref = listPlotsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPlotsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.plots);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.plots);
});
```

## ListTasks
You can execute the `ListTasks` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTasks(options?: ExecuteQueryOptions): QueryPromise<ListTasksData, undefined>;

interface ListTasksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTasksData, undefined>;
}
export const listTasksRef: ListTasksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTasks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTasksData, undefined>;

interface ListTasksRef {
  ...
  (dc: DataConnect): QueryRef<ListTasksData, undefined>;
}
export const listTasksRef: ListTasksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTasksRef:
```typescript
const name = listTasksRef.operationName;
console.log(name);
```

### Variables
The `ListTasks` query has no variables.
### Return Type
Recall that executing the `ListTasks` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTasksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTasksData {
  tasks: ({
    taskName: string;
    dueDate: TimestampString;
  })[];
}
```
### Using `ListTasks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTasks } from '@dataconnect/generated';


// Call the `listTasks()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTasks();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTasks(dataConnect);

console.log(data.tasks);

// Or, you can use the `Promise` API.
listTasks().then((response) => {
  const data = response.data;
  console.log(data.tasks);
});
```

### Using `ListTasks`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTasksRef } from '@dataconnect/generated';


// Call the `listTasksRef()` function to get a reference to the query.
const ref = listTasksRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTasksRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tasks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tasks);
});
```

## ListHarvests
You can execute the `ListHarvests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listHarvests(options?: ExecuteQueryOptions): QueryPromise<ListHarvestsData, undefined>;

interface ListHarvestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListHarvestsData, undefined>;
}
export const listHarvestsRef: ListHarvestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listHarvests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListHarvestsData, undefined>;

interface ListHarvestsRef {
  ...
  (dc: DataConnect): QueryRef<ListHarvestsData, undefined>;
}
export const listHarvestsRef: ListHarvestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listHarvestsRef:
```typescript
const name = listHarvestsRef.operationName;
console.log(name);
```

### Variables
The `ListHarvests` query has no variables.
### Return Type
Recall that executing the `ListHarvests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListHarvestsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListHarvestsData {
  harvests: ({
    cropName: string;
    harvestDate: DateString;
  })[];
}
```
### Using `ListHarvests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listHarvests } from '@dataconnect/generated';


// Call the `listHarvests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listHarvests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listHarvests(dataConnect);

console.log(data.harvests);

// Or, you can use the `Promise` API.
listHarvests().then((response) => {
  const data = response.data;
  console.log(data.harvests);
});
```

### Using `ListHarvests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listHarvestsRef } from '@dataconnect/generated';


// Call the `listHarvestsRef()` function to get a reference to the query.
const ref = listHarvestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listHarvestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.harvests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.harvests);
});
```

## ListInventory
You can execute the `ListInventory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listInventory(options?: ExecuteQueryOptions): QueryPromise<ListInventoryData, undefined>;

interface ListInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInventoryData, undefined>;
}
export const listInventoryRef: ListInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInventory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInventoryData, undefined>;

interface ListInventoryRef {
  ...
  (dc: DataConnect): QueryRef<ListInventoryData, undefined>;
}
export const listInventoryRef: ListInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInventoryRef:
```typescript
const name = listInventoryRef.operationName;
console.log(name);
```

### Variables
The `ListInventory` query has no variables.
### Return Type
Recall that executing the `ListInventory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInventoryData {
  inventories: ({
    itemName: string;
    quantity: number;
  })[];
}
```
### Using `ListInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInventory } from '@dataconnect/generated';


// Call the `listInventory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInventory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInventory(dataConnect);

console.log(data.inventories);

// Or, you can use the `Promise` API.
listInventory().then((response) => {
  const data = response.data;
  console.log(data.inventories);
});
```

### Using `ListInventory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInventoryRef } from '@dataconnect/generated';


// Call the `listInventoryRef()` function to get a reference to the query.
const ref = listInventoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInventoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateFarmer
You can execute the `CreateFarmer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createFarmer(): MutationPromise<CreateFarmerData, undefined>;

interface CreateFarmerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateFarmerData, undefined>;
}
export const createFarmerRef: CreateFarmerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFarmer(dc: DataConnect): MutationPromise<CreateFarmerData, undefined>;

interface CreateFarmerRef {
  ...
  (dc: DataConnect): MutationRef<CreateFarmerData, undefined>;
}
export const createFarmerRef: CreateFarmerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFarmerRef:
```typescript
const name = createFarmerRef.operationName;
console.log(name);
```

### Variables
The `CreateFarmer` mutation has no variables.
### Return Type
Recall that executing the `CreateFarmer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFarmerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFarmerData {
  farmer_insert: Farmer_Key;
}
```
### Using `CreateFarmer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFarmer } from '@dataconnect/generated';


// Call the `createFarmer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFarmer();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFarmer(dataConnect);

console.log(data.farmer_insert);

// Or, you can use the `Promise` API.
createFarmer().then((response) => {
  const data = response.data;
  console.log(data.farmer_insert);
});
```

### Using `CreateFarmer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFarmerRef } from '@dataconnect/generated';


// Call the `createFarmerRef()` function to get a reference to the mutation.
const ref = createFarmerRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFarmerRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.farmer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.farmer_insert);
});
```

## CreatePlot
You can execute the `CreatePlot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPlot(): MutationPromise<CreatePlotData, undefined>;

interface CreatePlotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreatePlotData, undefined>;
}
export const createPlotRef: CreatePlotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPlot(dc: DataConnect): MutationPromise<CreatePlotData, undefined>;

interface CreatePlotRef {
  ...
  (dc: DataConnect): MutationRef<CreatePlotData, undefined>;
}
export const createPlotRef: CreatePlotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPlotRef:
```typescript
const name = createPlotRef.operationName;
console.log(name);
```

### Variables
The `CreatePlot` mutation has no variables.
### Return Type
Recall that executing the `CreatePlot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePlotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePlotData {
  plot_insert: Plot_Key;
}
```
### Using `CreatePlot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPlot } from '@dataconnect/generated';


// Call the `createPlot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPlot();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPlot(dataConnect);

console.log(data.plot_insert);

// Or, you can use the `Promise` API.
createPlot().then((response) => {
  const data = response.data;
  console.log(data.plot_insert);
});
```

### Using `CreatePlot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPlotRef } from '@dataconnect/generated';


// Call the `createPlotRef()` function to get a reference to the mutation.
const ref = createPlotRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPlotRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.plot_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.plot_insert);
});
```

## CreateTask
You can execute the `CreateTask` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTask(): MutationPromise<CreateTaskData, undefined>;

interface CreateTaskRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTaskData, undefined>;
}
export const createTaskRef: CreateTaskRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTask(dc: DataConnect): MutationPromise<CreateTaskData, undefined>;

interface CreateTaskRef {
  ...
  (dc: DataConnect): MutationRef<CreateTaskData, undefined>;
}
export const createTaskRef: CreateTaskRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTaskRef:
```typescript
const name = createTaskRef.operationName;
console.log(name);
```

### Variables
The `CreateTask` mutation has no variables.
### Return Type
Recall that executing the `CreateTask` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTaskData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTaskData {
  task_insert: Task_Key;
}
```
### Using `CreateTask`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTask } from '@dataconnect/generated';


// Call the `createTask()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTask();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTask(dataConnect);

console.log(data.task_insert);

// Or, you can use the `Promise` API.
createTask().then((response) => {
  const data = response.data;
  console.log(data.task_insert);
});
```

### Using `CreateTask`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTaskRef } from '@dataconnect/generated';


// Call the `createTaskRef()` function to get a reference to the mutation.
const ref = createTaskRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTaskRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.task_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.task_insert);
});
```

## CreateHarvest
You can execute the `CreateHarvest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHarvest(): MutationPromise<CreateHarvestData, undefined>;

interface CreateHarvestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateHarvestData, undefined>;
}
export const createHarvestRef: CreateHarvestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHarvest(dc: DataConnect): MutationPromise<CreateHarvestData, undefined>;

interface CreateHarvestRef {
  ...
  (dc: DataConnect): MutationRef<CreateHarvestData, undefined>;
}
export const createHarvestRef: CreateHarvestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHarvestRef:
```typescript
const name = createHarvestRef.operationName;
console.log(name);
```

### Variables
The `CreateHarvest` mutation has no variables.
### Return Type
Recall that executing the `CreateHarvest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHarvestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHarvestData {
  harvest_insert: Harvest_Key;
}
```
### Using `CreateHarvest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHarvest } from '@dataconnect/generated';


// Call the `createHarvest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHarvest();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHarvest(dataConnect);

console.log(data.harvest_insert);

// Or, you can use the `Promise` API.
createHarvest().then((response) => {
  const data = response.data;
  console.log(data.harvest_insert);
});
```

### Using `CreateHarvest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHarvestRef } from '@dataconnect/generated';


// Call the `createHarvestRef()` function to get a reference to the mutation.
const ref = createHarvestRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHarvestRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.harvest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.harvest_insert);
});
```

## CreateInventory
You can execute the `CreateInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInventory(): MutationPromise<CreateInventoryData, undefined>;

interface CreateInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateInventoryData, undefined>;
}
export const createInventoryRef: CreateInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInventory(dc: DataConnect): MutationPromise<CreateInventoryData, undefined>;

interface CreateInventoryRef {
  ...
  (dc: DataConnect): MutationRef<CreateInventoryData, undefined>;
}
export const createInventoryRef: CreateInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInventoryRef:
```typescript
const name = createInventoryRef.operationName;
console.log(name);
```

### Variables
The `CreateInventory` mutation has no variables.
### Return Type
Recall that executing the `CreateInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInventoryData {
  inventory_insert: Inventory_Key;
}
```
### Using `CreateInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInventory } from '@dataconnect/generated';


// Call the `createInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInventory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInventory(dataConnect);

console.log(data.inventory_insert);

// Or, you can use the `Promise` API.
createInventory().then((response) => {
  const data = response.data;
  console.log(data.inventory_insert);
});
```

### Using `CreateInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInventoryRef } from '@dataconnect/generated';


// Call the `createInventoryRef()` function to get a reference to the mutation.
const ref = createInventoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInventoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventory_insert);
});
```

## DeleteFarmer
You can execute the `DeleteFarmer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFarmer(): MutationPromise<DeleteFarmerData, undefined>;

interface DeleteFarmerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteFarmerData, undefined>;
}
export const deleteFarmerRef: DeleteFarmerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFarmer(dc: DataConnect): MutationPromise<DeleteFarmerData, undefined>;

interface DeleteFarmerRef {
  ...
  (dc: DataConnect): MutationRef<DeleteFarmerData, undefined>;
}
export const deleteFarmerRef: DeleteFarmerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFarmerRef:
```typescript
const name = deleteFarmerRef.operationName;
console.log(name);
```

### Variables
The `DeleteFarmer` mutation has no variables.
### Return Type
Recall that executing the `DeleteFarmer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFarmerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFarmerData {
  farmer_delete?: Farmer_Key | null;
}
```
### Using `DeleteFarmer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFarmer } from '@dataconnect/generated';


// Call the `deleteFarmer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFarmer();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFarmer(dataConnect);

console.log(data.farmer_delete);

// Or, you can use the `Promise` API.
deleteFarmer().then((response) => {
  const data = response.data;
  console.log(data.farmer_delete);
});
```

### Using `DeleteFarmer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFarmerRef } from '@dataconnect/generated';


// Call the `deleteFarmerRef()` function to get a reference to the mutation.
const ref = deleteFarmerRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFarmerRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.farmer_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.farmer_delete);
});
```

## DeletePlot
You can execute the `DeletePlot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePlot(): MutationPromise<DeletePlotData, undefined>;

interface DeletePlotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeletePlotData, undefined>;
}
export const deletePlotRef: DeletePlotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePlot(dc: DataConnect): MutationPromise<DeletePlotData, undefined>;

interface DeletePlotRef {
  ...
  (dc: DataConnect): MutationRef<DeletePlotData, undefined>;
}
export const deletePlotRef: DeletePlotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePlotRef:
```typescript
const name = deletePlotRef.operationName;
console.log(name);
```

### Variables
The `DeletePlot` mutation has no variables.
### Return Type
Recall that executing the `DeletePlot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePlotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePlotData {
  plot_delete?: Plot_Key | null;
}
```
### Using `DeletePlot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePlot } from '@dataconnect/generated';


// Call the `deletePlot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePlot();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePlot(dataConnect);

console.log(data.plot_delete);

// Or, you can use the `Promise` API.
deletePlot().then((response) => {
  const data = response.data;
  console.log(data.plot_delete);
});
```

### Using `DeletePlot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePlotRef } from '@dataconnect/generated';


// Call the `deletePlotRef()` function to get a reference to the mutation.
const ref = deletePlotRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePlotRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.plot_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.plot_delete);
});
```

## DeleteTask
You can execute the `DeleteTask` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTask(): MutationPromise<DeleteTaskData, undefined>;

interface DeleteTaskRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTaskData, undefined>;
}
export const deleteTaskRef: DeleteTaskRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTask(dc: DataConnect): MutationPromise<DeleteTaskData, undefined>;

interface DeleteTaskRef {
  ...
  (dc: DataConnect): MutationRef<DeleteTaskData, undefined>;
}
export const deleteTaskRef: DeleteTaskRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTaskRef:
```typescript
const name = deleteTaskRef.operationName;
console.log(name);
```

### Variables
The `DeleteTask` mutation has no variables.
### Return Type
Recall that executing the `DeleteTask` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTaskData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTaskData {
  task_delete?: Task_Key | null;
}
```
### Using `DeleteTask`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTask } from '@dataconnect/generated';


// Call the `deleteTask()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTask();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTask(dataConnect);

console.log(data.task_delete);

// Or, you can use the `Promise` API.
deleteTask().then((response) => {
  const data = response.data;
  console.log(data.task_delete);
});
```

### Using `DeleteTask`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTaskRef } from '@dataconnect/generated';


// Call the `deleteTaskRef()` function to get a reference to the mutation.
const ref = deleteTaskRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTaskRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.task_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.task_delete);
});
```

## DeleteHarvest
You can execute the `DeleteHarvest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteHarvest(): MutationPromise<DeleteHarvestData, undefined>;

interface DeleteHarvestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteHarvestData, undefined>;
}
export const deleteHarvestRef: DeleteHarvestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteHarvest(dc: DataConnect): MutationPromise<DeleteHarvestData, undefined>;

interface DeleteHarvestRef {
  ...
  (dc: DataConnect): MutationRef<DeleteHarvestData, undefined>;
}
export const deleteHarvestRef: DeleteHarvestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteHarvestRef:
```typescript
const name = deleteHarvestRef.operationName;
console.log(name);
```

### Variables
The `DeleteHarvest` mutation has no variables.
### Return Type
Recall that executing the `DeleteHarvest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteHarvestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteHarvestData {
  harvest_delete?: Harvest_Key | null;
}
```
### Using `DeleteHarvest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteHarvest } from '@dataconnect/generated';


// Call the `deleteHarvest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteHarvest();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteHarvest(dataConnect);

console.log(data.harvest_delete);

// Or, you can use the `Promise` API.
deleteHarvest().then((response) => {
  const data = response.data;
  console.log(data.harvest_delete);
});
```

### Using `DeleteHarvest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteHarvestRef } from '@dataconnect/generated';


// Call the `deleteHarvestRef()` function to get a reference to the mutation.
const ref = deleteHarvestRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteHarvestRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.harvest_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.harvest_delete);
});
```

## DeleteInventory
You can execute the `DeleteInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteInventory(): MutationPromise<DeleteInventoryData, undefined>;

interface DeleteInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteInventoryData, undefined>;
}
export const deleteInventoryRef: DeleteInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteInventory(dc: DataConnect): MutationPromise<DeleteInventoryData, undefined>;

interface DeleteInventoryRef {
  ...
  (dc: DataConnect): MutationRef<DeleteInventoryData, undefined>;
}
export const deleteInventoryRef: DeleteInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteInventoryRef:
```typescript
const name = deleteInventoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteInventory` mutation has no variables.
### Return Type
Recall that executing the `DeleteInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteInventoryData {
  inventory_delete?: Inventory_Key | null;
}
```
### Using `DeleteInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteInventory } from '@dataconnect/generated';


// Call the `deleteInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteInventory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteInventory(dataConnect);

console.log(data.inventory_delete);

// Or, you can use the `Promise` API.
deleteInventory().then((response) => {
  const data = response.data;
  console.log(data.inventory_delete);
});
```

### Using `DeleteInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteInventoryRef } from '@dataconnect/generated';


// Call the `deleteInventoryRef()` function to get a reference to the mutation.
const ref = deleteInventoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteInventoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventory_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventory_delete);
});
```

## UpdateFarmer
You can execute the `UpdateFarmer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateFarmer(): MutationPromise<UpdateFarmerData, undefined>;

interface UpdateFarmerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateFarmerData, undefined>;
}
export const updateFarmerRef: UpdateFarmerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFarmer(dc: DataConnect): MutationPromise<UpdateFarmerData, undefined>;

interface UpdateFarmerRef {
  ...
  (dc: DataConnect): MutationRef<UpdateFarmerData, undefined>;
}
export const updateFarmerRef: UpdateFarmerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFarmerRef:
```typescript
const name = updateFarmerRef.operationName;
console.log(name);
```

### Variables
The `UpdateFarmer` mutation has no variables.
### Return Type
Recall that executing the `UpdateFarmer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFarmerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFarmerData {
  farmer_update?: Farmer_Key | null;
}
```
### Using `UpdateFarmer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFarmer } from '@dataconnect/generated';


// Call the `updateFarmer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFarmer();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFarmer(dataConnect);

console.log(data.farmer_update);

// Or, you can use the `Promise` API.
updateFarmer().then((response) => {
  const data = response.data;
  console.log(data.farmer_update);
});
```

### Using `UpdateFarmer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFarmerRef } from '@dataconnect/generated';


// Call the `updateFarmerRef()` function to get a reference to the mutation.
const ref = updateFarmerRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFarmerRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.farmer_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.farmer_update);
});
```

## UpdatePlot
You can execute the `UpdatePlot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePlot(): MutationPromise<UpdatePlotData, undefined>;

interface UpdatePlotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdatePlotData, undefined>;
}
export const updatePlotRef: UpdatePlotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePlot(dc: DataConnect): MutationPromise<UpdatePlotData, undefined>;

interface UpdatePlotRef {
  ...
  (dc: DataConnect): MutationRef<UpdatePlotData, undefined>;
}
export const updatePlotRef: UpdatePlotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePlotRef:
```typescript
const name = updatePlotRef.operationName;
console.log(name);
```

### Variables
The `UpdatePlot` mutation has no variables.
### Return Type
Recall that executing the `UpdatePlot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePlotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePlotData {
  plot_update?: Plot_Key | null;
}
```
### Using `UpdatePlot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePlot } from '@dataconnect/generated';


// Call the `updatePlot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePlot();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePlot(dataConnect);

console.log(data.plot_update);

// Or, you can use the `Promise` API.
updatePlot().then((response) => {
  const data = response.data;
  console.log(data.plot_update);
});
```

### Using `UpdatePlot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePlotRef } from '@dataconnect/generated';


// Call the `updatePlotRef()` function to get a reference to the mutation.
const ref = updatePlotRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePlotRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.plot_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.plot_update);
});
```

## UpdateTask
You can execute the `UpdateTask` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTask(): MutationPromise<UpdateTaskData, undefined>;

interface UpdateTaskRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateTaskData, undefined>;
}
export const updateTaskRef: UpdateTaskRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTask(dc: DataConnect): MutationPromise<UpdateTaskData, undefined>;

interface UpdateTaskRef {
  ...
  (dc: DataConnect): MutationRef<UpdateTaskData, undefined>;
}
export const updateTaskRef: UpdateTaskRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTaskRef:
```typescript
const name = updateTaskRef.operationName;
console.log(name);
```

### Variables
The `UpdateTask` mutation has no variables.
### Return Type
Recall that executing the `UpdateTask` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTaskData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTaskData {
  task_update?: Task_Key | null;
}
```
### Using `UpdateTask`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTask } from '@dataconnect/generated';


// Call the `updateTask()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTask();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTask(dataConnect);

console.log(data.task_update);

// Or, you can use the `Promise` API.
updateTask().then((response) => {
  const data = response.data;
  console.log(data.task_update);
});
```

### Using `UpdateTask`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTaskRef } from '@dataconnect/generated';


// Call the `updateTaskRef()` function to get a reference to the mutation.
const ref = updateTaskRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTaskRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.task_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.task_update);
});
```

## UpdateHarvest
You can execute the `UpdateHarvest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateHarvest(): MutationPromise<UpdateHarvestData, undefined>;

interface UpdateHarvestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateHarvestData, undefined>;
}
export const updateHarvestRef: UpdateHarvestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateHarvest(dc: DataConnect): MutationPromise<UpdateHarvestData, undefined>;

interface UpdateHarvestRef {
  ...
  (dc: DataConnect): MutationRef<UpdateHarvestData, undefined>;
}
export const updateHarvestRef: UpdateHarvestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateHarvestRef:
```typescript
const name = updateHarvestRef.operationName;
console.log(name);
```

### Variables
The `UpdateHarvest` mutation has no variables.
### Return Type
Recall that executing the `UpdateHarvest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateHarvestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateHarvestData {
  harvest_update?: Harvest_Key | null;
}
```
### Using `UpdateHarvest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateHarvest } from '@dataconnect/generated';


// Call the `updateHarvest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateHarvest();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateHarvest(dataConnect);

console.log(data.harvest_update);

// Or, you can use the `Promise` API.
updateHarvest().then((response) => {
  const data = response.data;
  console.log(data.harvest_update);
});
```

### Using `UpdateHarvest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateHarvestRef } from '@dataconnect/generated';


// Call the `updateHarvestRef()` function to get a reference to the mutation.
const ref = updateHarvestRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateHarvestRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.harvest_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.harvest_update);
});
```

## UpdateInventory
You can execute the `UpdateInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInventory(): MutationPromise<UpdateInventoryData, undefined>;

interface UpdateInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateInventoryData, undefined>;
}
export const updateInventoryRef: UpdateInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInventory(dc: DataConnect): MutationPromise<UpdateInventoryData, undefined>;

interface UpdateInventoryRef {
  ...
  (dc: DataConnect): MutationRef<UpdateInventoryData, undefined>;
}
export const updateInventoryRef: UpdateInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInventoryRef:
```typescript
const name = updateInventoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateInventory` mutation has no variables.
### Return Type
Recall that executing the `UpdateInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInventoryData {
  inventory_update?: Inventory_Key | null;
}
```
### Using `UpdateInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInventory } from '@dataconnect/generated';


// Call the `updateInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInventory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInventory(dataConnect);

console.log(data.inventory_update);

// Or, you can use the `Promise` API.
updateInventory().then((response) => {
  const data = response.data;
  console.log(data.inventory_update);
});
```

### Using `UpdateInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInventoryRef } from '@dataconnect/generated';


// Call the `updateInventoryRef()` function to get a reference to the mutation.
const ref = updateInventoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInventoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventory_update);
});
```

