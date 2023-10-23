import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";
//import GroupsCharts from "@/components/GroupsCharts";
import ModelsTables from "@/components/ModelsTables";
import type ModelsTable from "@/types/ModelsTable";
import type ModelMetadata from "@/types/ModelMetadata";
//import getModelTablesByName from "@/services/getModelTablesByName";
//import getModelsMetadata from "@/services/getModelsMetadata";
import Loading from "@/components/Loading";

export default function Group() {
	const { modelName } = useParams();
	const [modelTables, setModelTables] = useState<ModelsTable[]>([]);
	const [modelMetadata, setModelMetadata] = useState<
		ModelMetadata | undefined
	>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	//const [showChart, setShowChart] = useState<boolean>(false);
	const [activeModel, setActiveModel] = useState<number>(0);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchData() {
			if (modelName === undefined) {
				return;
			}

			const [group, metadata] = await Promise.all([
				getModelTablesByName(modelName, controller.signal),
				getModelMetadata(controller.signal),
			]);
			setModelTables(group);
			setModelMetadata(metadata[modelName]);
			setIsLoading(false);
		}

		void fetchData();
		return () => controller.abort();
	}, [modelName]);

	if (isLoading || modelMetadata === undefined) {
		return <Loading />;
	}

	if (modelTables.length === 0) {
		return (
			<>
				<PageTitle
					title={modelMetadata.display_name}
					subtitle={modelMetadata.description}
					markdown={true}
					className="mr-8"
				/>
				<div className="divider"></div>
				<p className="text-center mt-8">Group currently has no results.</p>
			</>
		);
	}

	return (
		<>
			<div className="flex flex-row justify-between">
				<PageTitle
					title={modelMetadata.display_name}
					subtitle={modelMetadata.description}
					markdown={true}
					className="mr-8 mb-16"
				/>
				{/* 
        <button
          className="btn btn-xs btn-ghost self-end"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? "Show Table" : "Show Chart"}
        </button>
        */}
			</div>
			<div className="overflow-x-auto">
				{modelTables.length > 1 ? (
					<Tabs>
						{modelTables.map((groupsTable, idx) => (
							<Tab
								key={idx}
								active={idx === activeModel}
								onClick={() => setActiveModel(idx)}
							>
								{groupsTable.title}
							</Tab>
						))}
					</Tabs>
				) : null}
			</div>

			{/*showChart ? (
        <GroupsCharts modelTables={modelTables} activeModel={activeModel} />
      ) : ( */}
			<ModelsTables
				modelTables={modelTables}
				activeModel={activeModel}
				ignoreHref={true}
			/>
			{/* )*/}
		</>
	);
}
