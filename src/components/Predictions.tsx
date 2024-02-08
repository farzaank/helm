import { useState } from "react";
import type DisplayPrediction from "@/types/DisplayPrediction";
import type DisplayRequest from "@/types/DisplayRequest";
import Indicator from "@/components/Indicator";
import Request from "@/components/Request";
import { List, ListItem } from "@tremor/react";
import Preview from "@/components/Preview";

type Props = {
	predictions: DisplayPrediction[];
	requests: DisplayRequest[];
};

/**
 * @SEE https://github.com/stanford-crfm/helm/blob/cffe38eb2c814d054c778064859b6e1551e5e106/src/helm/benchmark/static/benchmarking.js#L583-L679
 */
export default function Predictions({ predictions, requests }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	if (predictions.length < 1) {
		return null;
	}

	return (
		<div>
			<div className="flex flex-wrap justify-start items-start">
				{predictions.map((prediction, idx) => (
					<div className="w-full" key={idx}>
						<div className="mt-2 w-full">
							<h3>
								<span className="mr-4">{`Prediction [trial ${prediction.train_trial_index}]`}</span>
								<Indicator stats={prediction.stats} />
							</h3>
							<Preview value={prediction.predicted_text} />
							<button
								className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
								onClick={toggleModal}
							>
								Prompt Details
							</button>
						</div>
						{isModalOpen && (
							<div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
								<div className="relative top-20 mx-auto p-5 border max-w-3xl shadow-lg rounded-md bg-white">
									<div className="mt-3 text-center">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Prompt Details
										</h3>
										<div className="mt-2">
											<div className="overflow-auto">
												<Request request={requests[idx]} />
											</div>
											<List>
												{(
													Object.keys(
														prediction.stats
													) as (keyof typeof prediction.stats)[]
												).map((statKey, idx) => (
													<ListItem key={idx}>
														<span>{statKey}:</span>
														<span>{prediction.stats[statKey]}</span>
													</ListItem>
												))}
											</List>
										</div>
									</div>
									{/* Close button */}
									<div className="mt-5 sm:mt-6">
										<button
											type="button"
											className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
											onClick={toggleModal}
										>
											Close
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
