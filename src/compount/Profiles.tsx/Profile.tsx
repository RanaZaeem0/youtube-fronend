
import { Link, NavLink, useNavigate } from "react-router-dom"
import img1 from "../../compount/img/icon.webp"
import img2 from "../../compount/img/youtube.webp"
import AllVideoSkeleton from "../skeleton/AllVideoSkeleton"
import AllVideoWrapper from "../AllVideoWrapper"
import useGetUserVideo from "../../hook/useGetUserVideo.ts"
export default function Component() {

     const {video,isLoading} = useGetUserVideo()
   const Navigator  = useNavigate()

    return (
    <div className="flex flex-col min-h-dvh">
      <header className="relative h-52 overflow-hidden">
        <img
          src={img2}
          alt="Cover image"
          width={1920}
          height={480}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ aspectRatio: "1920/480", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <img src={img1} className="h-12 w-12" alt="" />
          <div className="space-y-1 text-white">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-sm">john@example.com</p>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <AllVideoSkeleton className=" grid-cols-3" />
        ) : (
          <AllVideoWrapper className="grid grid-cols-1 items-center justify-center  ">
            {video &&
              video.map((video, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg overflow-hidden group cursor-pointer flex"
                  onClick={() => Navigator(`/watch/${video._id}`)}
                >
                  <div className="h-28 w-72 pb-5">
                    <img
                      className="w-full h-full"
                      src={video.thumbnail}
                      alt={video.thumbnail}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="">
                      <NavLink
                        to={`/profile?channal=${video.UserDetails[0]._id}`}
                      >
                        <div className="flex flex-col items-start ">
                        <h2 className="font-normal
                         text-white text-start hover:underline text-1xl pl-2 pr-4">
                            {video.title}
                          </h2>
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            {video.UserDetails[0].username}
                          </h2>
                          <h2 className="font-medium text-gray-400 hover:underline text-sm text-center pl-2 pr-4">
                            views {video.views}
                          </h2>
                          
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
          </AllVideoWrapper>
        )}
      </div>
      </main>
    </div>
  )
}