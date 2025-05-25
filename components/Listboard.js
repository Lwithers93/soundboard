import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const poppinsSemiBold = Poppins({ subsets: ["latin"], weight: ["500"] });
const poppinsBold = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Listboard(props) {
  const { data } = props;
  const statusTypes = {
    0: "New Tasks",
    1: "In Progress",
    2: "Published",
  };

  let isData = false;

  data && Object.keys(data).length > 0 ? (isData = true) : (isData = false);
  const projects = data;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="grid grid-cols-4 border">
          <div className="font-semibold border p-2">number</div>
          <div className="font-semibold border p-2">title</div>
          <div className="font-semibold border p-2">status</div>
          <div className="font-semibold border p-2">deadline</div>
        </div>
        {isData &&
          projects.episodes.map((project, projectIndex) => {
            return (
              <Link
                key={projectIndex}
                href={data ? `/episodes/${project.id}` : "/"}
              >
                <div className="grid grid-cols-4">
                  <div className="border p-2">{project.name}</div>
                  <div className="border p-2">{project.title}</div>
                  <div className="border p-2">
                    {statusTypes[project.status]}
                  </div>
                  <div className="border p-2">episode deadline</div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
