import { NavLink } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Avatar({
  username = "A",
  channalId = "1",
  createdAt = "a",
  avatarImage = "",
  videoViews = 0,
  videoTitle,
}: {
  videoTitle?:string
  username: string | undefined;
  videoViews:number;
  channalId?: string;
  createdAt: string;
  avatarImage: string | undefined;
}) {
  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
 

  return (
    <NavLink to={`/channal/profile/${username}`}>
      <div className="flex flex-col items-start ">
        <div className="flex flex-col p-1">
          <div className="flex w-full items-center justify-between ">
          <div className=" inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
            <span className="font-medium text-white dark:text-gray-300">
              <img src={avatarImage} alt="" />
            </span>
          </div>
          <h2 className="text-base pl-2 font-semibold overflow-hidden ">{videoTitle} </h2>
          </div>
          
          
          <h2 className="font-normal text-gray-400 hover:underline text-1xl pl-9 text-start  pr-2 ">
            {username}<FontAwesomeIcon className="pl-1" icon={faCircleCheck} />
          </h2>
        </div>
          <div className="flex pl-10 text-sm ">
          <h3 className="text-neutral-400 text-medium mr-1">{videoViews}K views </h3>
            <h3 className="text-neutral-400 text-medium">
              {formatDateRelative(createdAt)}
            </h3>
            
          </div>
      </div>
    </NavLink>
  );
}
