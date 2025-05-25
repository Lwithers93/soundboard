import React, { useState } from "react";
import EditTask from "./EditTask";

export default function ListPanel(props) {
  const { number, episodeData } = props;
  const [episode, setEpisode] = useState(null);
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="grid grid-cols-4 border">
          <div className="font-semibold border p-2">Task</div>
          <div className="font-semibold border p-2">Notes</div>
          <div className="font-semibold border p-2">Status</div>
          <div className="font-semibold border p-2">Deadline</div>
        </div>
        {(episodeData.episodeTasks[number] || []).map((task, taskIndex) => {
          return (
            <div
              className="grid grid-cols-4"
              key={taskIndex}
              onClick={() => {
                setEpisode(number);
                setTask(taskIndex);
                setEditing(true);
              }}
            >
              <div className="border p-2">{task.name}</div>
              <div className="border p-2">
                {task.notes || "click to add notes"}
              </div>
              <div className="border p-2">{task.status}</div>
              <div className="border p-2">{task.deadline}</div>
            </div>
          );
        })}
      </div>
      {editing && (
        <EditTask
          episodeNum={episode}
          taskNum={task}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
}
