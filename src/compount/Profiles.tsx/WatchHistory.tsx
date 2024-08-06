import AllVideoWrapper from '../AllVideoWrapper';
import useGetWatchHistory from "../../hook/usegetWatchHistory"
import AllVideoSkeleton from '../skeleton/AllVideoSkeleton';
import Avatar from '../helperCompount/Avatar';
import useAddWatchhistory from "../../hook/useAddWatchhistory"
import { useNavigate } from 'react-router-dom';
export default function WatchHistory() {
  const Navigator = useNavigate()
    const {watchHistory,isLoading} = useGetWatchHistory()
  

    if (watchHistory.length === 0) {
      return <div className="flex items-center justify-center h-screen bg-neutral-600 text-white">
        <h1>You haven't watched any videos yet.</h1>
      </div>;
  }
  console.log(watchHistory);
  
  return (
    <div>
        {
        !isLoading ? 
        <AllVideoWrapper className="grid grid-cols-1  gap-6">
          {
            watchHistory && watchHistory.map((video,index) => (
           video.isPublished && <div
              key={index}
              className="bg-background rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => Navigator(`/watch/${video._id}`)}
            >
              <div className="h-60 w-96 pb-5">
                <img className="w-full h-full" src={video.thumbnail} alt={video.thumbnail}   />
              </div>
              <h2 className="">{video.title}</h2>
              {/* <Avatar avatarImage={video.channalDetails[0].avatar} username={video.channalDetails[0].username} channalId={video.channalDetails[0]._id} createdAt={video.createdAt} /> */}
            </div>
            
          ))
          
       
        }
        </AllVideoWrapper> :
        <AllVideoSkeleton/>
        
        }

    </div>
  )
}
