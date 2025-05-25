"use client";
import React, { useState } from "react";
import EpisodePanel from "./EpisodePanel";
import Button from "./Button";

export default function EpisodeBoard(props) {
  const { number, data } = props;
  const [viewIndex, setViewIndex] = useState(0);
  const views = ["list", "board"];
  let currentView = views[viewIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex px-4 gap-4 justify-between">
        <h1 className="text-xl">
          Episode {number}: <span>{data.episodes[number - 1].title}</span>
        </h1>
        <Button
          text={`Change to ${views[viewIndex === 0 ? 1 : 0]} view`}
          onClick={() => setViewIndex(viewIndex === 0 ? 1 : 0)}
        />
      </div>
      <EpisodePanel view={currentView} number={number} data={data} />
    </div>
  );
}
