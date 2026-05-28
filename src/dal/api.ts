
export type TaskDetailsData = {
  id: string;
  attributes: {
    title: string | null;
    boardTitle: string;
    description: string;
  };
};

type GetTaskOutput = {
  data: TaskDetailsData
}

export const getTask = (boardId: string, selectedTaskId: string) => {
	const promise: Promise<GetTaskOutput> = fetch(
      `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${selectedTaskId}`,
      {
        headers: {
          'api-key': '75f7f7c7-61ad-44af-8de5-fb6f0f1975ab',
        },
      }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
	})
	return promise
}

export type GlobalTaskListItemDto = {
	title: string | null;
	status: number;
	priority: number;
	addedAt: string
}

export type GlobalTaskListItemJsonApiData = {
	id: string;
	attributes: GlobalTaskListItemDto
}

export type GlobalTaskListResponse = {
  data: Array<GlobalTaskListItemJsonApiData>
}

export const getTasks = () => {
  const promise: Promise<GlobalTaskListResponse> = fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
			headers: {
			// "api-key": "84c469a1-98df-4d87-94d9-1a68388c760e", // mine
			"api-key": "75f7f7c7-61ad-44af-8de5-fb6f0f1975ab",
		},
		})
    .then(res => res.json())
  return promise
}