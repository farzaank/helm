import type ModelsTable from "@/types/ModelsTable";
import getBenchmarkEndpoint from "@/utils/getBenchmarkEndpoint";
import getBenchmarkSuite from "@/utils/getBenchmarkSuite";

export default async function getGroupsTablesByName(
  modelName: string,
  signal: AbortSignal,
): Promise<ModelsTable[]> {
  try {
    const group = await fetch(
      getBenchmarkEndpoint(
        `/benchmark_output/runs/${getBenchmarkSuite()}/models/${modelName}.json`,
      ),
      { signal },
    );

    return (await group.json()) as ModelsTable[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
