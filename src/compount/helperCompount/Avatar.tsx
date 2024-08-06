import { NavLink } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";

export default function Avatar({
  username = "A",
  channalId = "1",
  createdAt = "a",
  avatarImage = "",
  videoViews = "1",
}: {
  username: string;
  videoViews: string;
  channalId?: string;
  createdAt: string;
  avatarImage: string;
}) {
  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  return (
    <NavLink to={`/profile?channal=${channalId}`}>
      <div className="flex flex-col items-start ">
        <div className="flex p-1">
          <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
            <span className="font-medium text-white dark:text-gray-300">
              <img src={avatarImage} alt="" />
            </span>
          </div>
          <h2 className="font-medium text-gray-600 hover:underline text-1xl text-center pl-2 pr-4">
            {username}
          </h2>
        </div>
          <div className="flex p-1 ">
          <h3 className="text-neutral-500 mr-1">{videoViews}K views </h3>
            <h3 className="text-neutral-500">
              {formatDateRelative(createdAt)}
            </h3>
            
          </div>
      </div>
    </NavLink>
  );
}
