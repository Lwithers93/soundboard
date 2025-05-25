"use client";
import { Poppins } from "next/font/google";
import { React, useEffect, useState } from "react";
import Taskboard from "./Taskboard";
import Button from "./Button";
import Listboard from "./Listboard";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import Login from "./Login";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const poppinsBold = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("board");
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});

  const testing = true; // LW debug

  const testData = {
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
          status: "Published", // status of this task
        },
        {
          id: 1, // id of this task
          name: "Edit", // name of this task
          deadline: "20/02/2025", // deadline of  this task
          status: "Published", // status of this task
        },
        {
          id: 2, // id of this task
          name: "Publish", // name of this task
          deadline: "21/02/2025", // deadline of  this task
          status: "Published", // status of this task
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

  const timeStats = {
    episodes_published:
      data && Object.keys(data).length > 0
        ? data.episodes.filter((episode) => episode.status === 2).length
        : 0,
    days_until_next_episode_due: 2,
    todays_date: new Date().toDateString(),
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    if (testing) {
      setData(testData);
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-6 sm:gap-8 md:gap-12 ">
      <div className="grid grid-cols-6 sm:grid-cols-6 bg-orange-50 text-orange-500 rounded-lg ">
        {Object.keys(timeStats).map((stat, statIndex) => {
          return (
            <div
              key={statIndex}
              className={
                "p-4 flex flex-col gap-1 sm:gap-2 col-span-2 sm:col-span-2 text-center " +
                (statIndex !== 2 ? "col-span-3 " : "hidden sm:flex")
              }
            >
              <p
                className={
                  "uppercase text-xs sm:text-sm " + poppinsBold.className
                }
              >
                {stat.replaceAll("_", " ").replaceAll("todays", "today's")}
              </p>
              <p className={"text-base sm:text-lg " + poppins.className}>
                {timeStats[stat]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + poppins.className
        }
      >
        What are we <span className="textGradient">working</span> on today?
      </h4>

      <Button
        dark
        flexBtn
        text={
          "Switch to " + (currentView === "board" ? "list" : "board") + " view"
        }
        clickHandler={() =>
          setCurrentView(currentView === "board" ? "list" : "board")
        }
      />

      {currentView === "board" ? (
        <Taskboard data={data} />
      ) : (
        <Listboard data={data} />
      )}
    </div>
  );
}
