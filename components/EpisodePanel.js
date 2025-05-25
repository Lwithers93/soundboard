import React from "react";
import ListPanel from "./ListPanel";
import BoardPanel from "./BoardPanel";

export default function EpisodePanel(props) {
  const { view, number, data } = props;

  const listPanel = <ListPanel number={number} episodeData={data} />;
  const boardPanel = <BoardPanel number={number} episodeData={data} />;

  return <>{view === "list" ? listPanel : boardPanel}</>;
}
