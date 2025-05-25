import EpisodeBoard from "@/components/EpisodeBoard";
import Main from "@/components/Main";
import React from "react";
// import { useParams } from "next/navigation";

// This runs on the server
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Soundboard ⋅ Episode ${id}`, // Dynamically set the title based on the episode ID
  };
}

export default async function EpisodesPage({ params }) {
  const { id } = await params;
  // this is to be called from the database rather than defined here
  const myData = {
    episodes: [
      {
        id: 1,
        name: "Episode 1",
        title: "Introduction to the Podcast",
        status: 2,
      },
      {
        id: 2,
        name: "Episode 2",
        title: "Random thing that happened",
        status: 2,
      },
      {
        id: 3,
        name: "Episode 3",
        title: "Looking at something else",
        status: 1,
      },
      {
        id: 4,
        name: "Episode 4",
        title: "Looking forward to the next thing",
        status: 0,
      },
    ],
    episodeTasks: {
      1: [
        {
          id: 0, // id of this task
          name: "Record", // name of this task
          deadline: "18/02/2025", // deadline of this task
          status: "Complete", // status of this task
          notes: "set up link", // Notes go here
        },
        {
          id: 1, // id of this task
          name: "Edit", // name of this task
          deadline: "20/02/2025", // deadline of  this task
          status: "Complete", // status of this task
        },
        {
          id: 2, // id of this task
          name: "Publish", // name of this task
          deadline: "21/02/2025", // deadline of  this task
          status: "In Progress", // status of this task
        },
      ],
      2: [
        {
          id: 0, // id of this task
          name: "Record", // name of this task
          deadline: "18/02/2025", // deadline of  this task
          status: "Published", // status of this task
        },
        {
          id: 1, // id of this task
          name: "Edit", // name of this task
          deadline: "20/02/2025", // deadline of the taskflow
          status: "Published", // status of this task
        },
        {
          id: 2, // id of this task
          name: "Publish", // name of this task
          deadline: "21/02/2025", // deadline of the taskflow
          status: "Published", // status of this task
        },
      ],
    },
  };

  return (
    <Main>
      <EpisodeBoard number={id} data={myData} />
    </Main>
  );
}
