import AllVideoWrapper from "../AllVideoWrapper";
import useGetWatchHistory from "../../hook/usegetWatchHistory";
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton";
import Avatar from "../helperCompount/Avatar";
import useAddWatchhistory from "../../hook/useAddWatchhistory";
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom"
import {formatDistanceToNow} from "date-fns"
 export default function WatchHistory() {
  const Navigator = useNavigate();
  const { watchHistory, isLoading } = useGetWatchHistory();

  console.log(watchHistory.map((item) => item.owner));

  function formatDateRelative(date: Date) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  if (watchHistory.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-600 text-white">
        <h1>You haven't watched any videos yet.</h1>
      </div>
    );
  }
  return (
    <div>
      {!isLoading ? (
        <AllVideoWrapper className="grid grid-cols-1  gap-6">
          <h1 className="font-bold text-2xl pl-5 pt-5">Watch History</h1>
          {watchHistory &&
            watchHistory.map(
              (video, index) =>
                video.isPublished && (
                  <div
                    key={index}
                    className="bg-background flex pl-7 rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => Navigator(`/watch/${video._id}`)}
                  >
                    <div className="h-60 w-96 pb-5">
                      <img
                        className="w-full h-full"
                        src={video.thumbnail}
                        alt={video.thumbnail}
                      />
                    
                    </div>
                    <NavLink
                        to={`/profile?channal=${video.owner._id}`}
                      >
                        <div className="flex flex-col items-start ">
                        <h2 className="font-normal
                         text-white text-start hover:underline text-sm  pl-2 pr-4">
                            {video.title}
                          </h2>
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            {video?.owner.username}
                          </h2>
                          <div className="flex">
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            viewss {video.views}
                          </h2>
                          <h3 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">{formatDateRelative(video.createdAt)}</h3>
                          </div>
                        </div>
                      </NavLink>
                  </div>
                )
            )}
            <div className="">

            </div>
        </AllVideoWrapper>
      ) : (
        <AllVideoSkeleton className="" />
      )}
    </div>
  );
}
