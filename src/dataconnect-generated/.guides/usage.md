# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateFarmer, useCreatePlot, useCreateTask, useCreateHarvest, useCreateInventory, useDeleteFarmer, useDeletePlot, useDeleteTask, useDeleteHarvest, useDeleteInventory } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateFarmer();

const { data, isPending, isSuccess, isError, error } = useCreatePlot();

const { data, isPending, isSuccess, isError, error } = useCreateTask();

const { data, isPending, isSuccess, isError, error } = useCreateHarvest();

const { data, isPending, isSuccess, isError, error } = useCreateInventory();

const { data, isPending, isSuccess, isError, error } = useDeleteFarmer();

const { data, isPending, isSuccess, isError, error } = useDeletePlot();

const { data, isPending, isSuccess, isError, error } = useDeleteTask();

const { data, isPending, isSuccess, isError, error } = useDeleteHarvest();

const { data, isPending, isSuccess, isError, error } = useDeleteInventory();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createFarmer, createPlot, createTask, createHarvest, createInventory, deleteFarmer, deletePlot, deleteTask, deleteHarvest, deleteInventory } from '@dataconnect/generated';


// Operation CreateFarmer: 
const { data } = await CreateFarmer(dataConnect);

// Operation CreatePlot: 
const { data } = await CreatePlot(dataConnect);

// Operation CreateTask: 
const { data } = await CreateTask(dataConnect);

// Operation CreateHarvest: 
const { data } = await CreateHarvest(dataConnect);

// Operation CreateInventory: 
const { data } = await CreateInventory(dataConnect);

// Operation DeleteFarmer: 
const { data } = await DeleteFarmer(dataConnect);

// Operation DeletePlot: 
const { data } = await DeletePlot(dataConnect);

// Operation DeleteTask: 
const { data } = await DeleteTask(dataConnect);

// Operation DeleteHarvest: 
const { data } = await DeleteHarvest(dataConnect);

// Operation DeleteInventory: 
const { data } = await DeleteInventory(dataConnect);


```