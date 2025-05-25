import React from "react";

export default function BoardPanel(props) {
  const { number, episodeData } = props;
  const statuses = ["New", "In Progress", "Complete"];

  return (
    <div>
      {episodeData.episodes
        .filter((episode) => episode.id === Number(number))
        .map((episode, episodeIndex) => {
          return (
            <div key={episodeIndex}>
              <div className="grid grid-cols-3 gap-3 border rounded">
                {statuses.map((status, statusIndex) => {
                  return (
                    <div
                      className={
                        " flex flex-col col-span-1 gap-3 p-2 " +
                        (statusIndex === 0 ? " " : "border-l")
                      }
                      key={statusIndex}
                    >
                      <h4 className="text-lg sm:text-xl md:text-2xl text-center">
                        {status}
                      </h4>
                      {(episodeData.episodeTasks[episode.id] || [])
                        .filter((task) => task.status === status)
                        .map((task, taskIndex) => {
                          return (
                            <div
                              className="flex flex-col items-center border rounded p-3 "
                              key={episode.id + "-" + taskIndex}
                            >
                              <p className="font-semibold">Task: {task.name}</p>
                              <p>Deadline: {task.deadline}</p>
                              <p>Status: {task.status}</p>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
