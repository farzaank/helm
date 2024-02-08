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
                className="mt-4 py-2 px-4 bg-red-700 text-white rounded hover:bg-red-900"
                onClick={toggleModal}
              >
                Prompt Details
              </button>
            </div>
            <dialog
              open={isModalOpen}
              className="modal p-16 bg-opacity-80 bg-white w-full h-full overflow-auto fixed top-30 left-0 right-0 bottom-0 z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="p-5 border shadow-lg rounded-md bg-white">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={toggleModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3 text-left">
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
                          prediction.stats,
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
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
