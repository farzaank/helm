import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";
import LeaderboardTables from "@/components/LeaderboardTables";
import type GroupsTable from "@/types/GroupsTable";
import type GroupMetadata from "@/types/GroupMetadata";
import getGroupsTablesByName from "@/services/getGroupTablesByName";
import getGroupsMetadata from "@/services/getGroupsMetadata";
import Loading from "@/components/Loading";
import getGroupsTables from "@/services/getGroupsTables";

interface GroupDisplayData {
  title: string;
  name: string;
}

export default function Leaderboard() {
  const defaultGroup = { title: "Core Scenarios", name: "core_scenarios" };
  const [verbose, setVerbose] = useState<boolean>(false);
  const [allGroupData, setAllGroupData] = useState<GroupDisplayData[]>([]);
  const [selectedGroupDisplayData, setSelectedGroupDisplayData] =
    useState(defaultGroup);
  const [groupsTables, setGroupsTables] = useState<GroupsTable[]>([]);
  const [groupMetadata, setGroupMetadata] = useState<
    GroupMetadata | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeGroup, setActiveGroup] = useState<number>(0);
  console.log(allGroupData);

  function findMatchingGroup(
    allGroupData: GroupDisplayData[],
    target: string,
  ): GroupDisplayData {
    console.log(allGroupData, target);
    const searchResult = allGroupData.find((group) => group.title === target);
    if (searchResult != undefined) {
      return searchResult;
    } else {
      return defaultGroup;
    }
  }

  function updateLeaderboard(allGroupData: GroupDisplayData[], target: string) {
    setSelectedGroupDisplayData(findMatchingGroup(allGroupData, target));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      if (selectedGroupDisplayData.name === undefined) {
        return;
      }
      const groups = await getGroupsTables(controller.signal);
      const result: GroupDisplayData[] = [];
      groups.forEach((group) => {
        group.rows.forEach((row) => {
          result.push({
            title: String(row[0].value),
            name: row[0].href.replace("?group=", ""),
          });
        });
      });
      setAllGroupData(result);

      const [group, metadata] = await Promise.all([
        getGroupsTablesByName(selectedGroupDisplayData.name, controller.signal),
        getGroupsMetadata(controller.signal),
      ]);
      setGroupsTables(group);
      setGroupMetadata(metadata[selectedGroupDisplayData.name]);
      setIsLoading(false);
    }

    void fetchData();
    return () => controller.abort();
  }, [selectedGroupDisplayData]);

  if (isLoading || groupMetadata === undefined) {
    return <Loading />;
  }

  if (groupsTables.length === 0) {
    return (
      <>
        <PageTitle
          title={groupMetadata.display_name}
          subtitle={groupMetadata.description}
          markdown={true}
          className="mr-8"
        />
        <div className="divider"></div>
        <p className="text-center mt-8">Group currently has no results.</p>
      </>
    );
  }

  const handleToggleVerbose = () => {
    setVerbose(!verbose);
  };

  return (
    <>
      {verbose ? (
        <>
          <div className="flex flex-row justify-between">
            <PageTitle
              title={"HELM Leaderboard"}
              subtitle={
                "HELM is a framework for evaluating foundation models. Our leaderboard shows how the various models (with particular adaptation procedures) perform across different groups of scenarios and different metrics."
              }
              markdown={true}
              className="mr-8 mb-16"
            />
            <div className="w-64 py-10 ">
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
              >
                Select a group:
              </label>
              <select
                id="group"
                name="group"
                value={selectedGroupDisplayData.title}
                onChange={(e) =>
                  updateLeaderboard(allGroupData, e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring focus:border-blue-300 rounded-md"
              >
                {allGroupData.map((group, index) => (
                  <option key={index} value={group.title}>
                    {group.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end items-center mb-4">
              <div className="pl-5">
                <label htmlFor="verbose-toggle" className="mr-2">
                  Show All?
                </label>
              </div>
              <div className="p-5">
                <input
                  id="verbose-toggle"
                  type="checkbox"
                  checked={verbose}
                  onChange={handleToggleVerbose}
                  className="toggle toggle-accent"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            {groupsTables.length > 1 ? (
              <Tabs>
                {groupsTables.map((groupsTable, idx) => (
                  <Tab
                    key={idx}
                    active={idx === activeGroup}
                    onClick={() => setActiveGroup(idx)}
                  >
                    {groupsTable.title}
                  </Tab>
                ))}
              </Tabs>
            ) : null}
          </div>
          <LeaderboardTables
            groupsTables={groupsTables}
            activeGroup={activeGroup}
            ignoreHref={true}
          />
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <PageTitle
              title={"HELM Leaderboard"}
              subtitle={
                "HELM is a framework for evaluating foundation models. Our leaderboard shows how the various models (with particular adaptation procedures) perform across different groups of scenarios and different metrics."
              }
              markdown={true}
              className="mr-8 mb-16"
            />
            <div className="w-64 py-10 ">
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
              >
                Selected Group:
              </label>
              <select
                id="group"
                name="group"
                value={selectedGroupDisplayData.title}
                onChange={(e) =>
                  updateLeaderboard(allGroupData, e.target.value)
                }
                disabled
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring focus:border-blue-300 rounded-md"
              >
                {allGroupData.map((group, index) => (
                  <option key={index} value={group.title}>
                    {"Leaderboard"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end items-center mb-4">
              <div className="pl-5">
                <label htmlFor="verbose-toggle" className="mr-2">
                  Show All?
                </label>
              </div>
              <div className="p-5">
                <input
                  id="verbose-toggle"
                  type="checkbox"
                  checked={verbose}
                  onChange={handleToggleVerbose}
                  className="toggle toggle-accent"
                />
              </div>
            </div>
          </div>
          <LeaderboardTables
            groupsTables={groupsTables}
            activeGroup={activeGroup}
            ignoreHref={true}
            filtered
            filteredModels={[
              "Llama 2 (70B)",
              "LLaMA (65B)",
              "text-davinci-002",
              "Mistral v0.1 (7B)",
              "Cohere Command beta (52.4B)",
              "text-davinci-003",
              "Jurassic-2 Jumbo (178B)",
              "Llama 2 (13B)",
              "gpt-3.5-turbo-0613",
              "LLaMA (30B)",
            ]}
          />
        </>
      )}
    </>
  );
}
