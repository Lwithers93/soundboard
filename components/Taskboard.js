import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const poppinsSemiBold = Poppins({ subsets: ["latin"], weight: ["500"] });
const poppinsBold = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Taskboard(props) {
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
    <div className="flex-1 w-full max-w-[1000px] y-full grid grid-cols-1 md:grid-cols-3 border-2 gap-4 rounded-lg">
      {Object.keys(statusTypes).map((statType, statTypeIndex) => {
        return (
          <div
            key={statTypeIndex}
            className={
              "flex flex-col py-4 px-4 gap-4 " +
              (statTypeIndex === 0 ? " " : "border-l")
            }
          >
            <div className="border-b">
              <h4 className={"text-center " + poppinsSemiBold.className}>
                {statusTypes[statType]}
              </h4>
              {isData &&
                projects.episodes
                  .filter((project) => project.status === statTypeIndex)
                  .map((project, index) => {
                    return (
                      <Link
                        key={project.id}
                        href={data ? `/episodes/${project.id}` : "/"}
                        className=""
                      >
                        <button
                          className={
                            "flex flex-col items-center gap-2 w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 outline-none rounded-lg orangeShadow duration-200 bg-orange-50 hover:bg-[var(--gradientB)] focus:bg-[var(--gradientB)]"
                          }
                        >
                          <p
                            className={
                              "text-xl sm:text-2xl lg:text-3xl " +
                              poppinsSemiBold.className
                            }
                          >
                            {project.name}
                          </p>
                          <p className="">{project.title}</p>
                        </button>
                      </Link>
                    );
                  })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
