export const getTrack = (boardId:string, selectedTaskId: string) => {
	const promise = fetch(
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