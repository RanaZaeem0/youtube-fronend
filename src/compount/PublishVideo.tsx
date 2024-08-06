import axios from "axios";
import{ useState } from "react";
import { useNavigate } from "react-router";


import Input from "./helperCompount/Input";
import Button from "./helperCompount/Button";
import ButtonWarning from "./helperCompount/ButtonWarning";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

export default function PublishVideo() {
  
  const [error, setError] = useState("");
  const Naviagte = useNavigate();
  const Dispatch = useDispatch();
  const [createBtn ,setCreateBtn ] = useState(false)

   interface CreateuserSchema{
    title:string,
    description:string,
    videoFile:File
    ,thumbnail:File
   }

  const { register, handleSubmit,watch } = useForm<CreateuserSchema>();

  const thumbnail = watch('thumbnail')
  const videoFile  = watch('videoFile') 
  
  const createUser = async (data:CreateuserSchema) => {
     
    const formData = new FormData()
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);


    try {
     const token = localStorage.getItem('refreshToken')
        const userDetails = data;
      console.log(userDetails ,"sa");

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}video/publish`,
        formData,
        {  headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
          },
        }
      );
      console.log(response);
      
      if (response.status >= 200 && response.status < 300) {
   
       
         console.log(response.data);
         

         
       
      }

      return userDetails;
    } catch (error :any ) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(`Error response from server: ${error.response.status} - ${error.response.data}`);
        setError(`Error: ${error.response.data.message || 'Server Error'}`);
      } else if (error.request) {
        // No response received from server
        console.log('No response received from server', error.request);
        setError('No response received from server. Please try again later.');
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    
    }
  };

  return (
    <div className="bg-slate-700 h-screen flex justify-center">
      {
        !createBtn && <button 
        onClick={()=>setCreateBtn(true)}
        className="rounded-md bg-black h-9 text-white px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            Create
          </button>
      }
      {
        createBtn && <div className="flex w-full justify-center">
        <div className=" bg-white h-full w-1/2 max-lg:w-full  text-center flex items-center justify-center flex-col ">
          <h2 className="!text-black font-semibold text-2xl pb-3">Create an account</h2>
          
          <form onSubmit={handleSubmit(createUser)}>
            <div className="flex flex-col w-96 max-lg:w-full justify-center items-center" >

            
            
            <Input
              {...register("title", { required: true, minLength: 2 })}
              type={"text"}
              placeholder={"title..."}
              label={"Title"}
            />
            <Input
              {...register("description", { required: true, })}
              type={"text"}
              placeholder={"description"}
              label={"Description"}
            />
            
            <Input
              {...register("thumbnail", { required: true})}
              placeholder="Thumnail Image"
              type="file"
              label={"thumnail"}
            />
            <Input
              {...register("videoFile", { required: true})}
              placeholder="Video"
              type='file'
              label={"videoFile"}
            />
            </div>
          <Button label={'Publish Video'} type="submit" className={'bg-gray-800'} />
          </form>
          <h2 className="text-red-500 font-normal">{error}</h2>
          
          
          
        </div>
        
      </div>
      }
    </div>
  );
}

// return (
//   <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
//           Create
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create New Item</DialogTitle>
//           <DialogDescription>Fill out the form to create a new item.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid items-center grid-cols-4 gap-4">
//             <Label htmlFor="file" className="text-right">
//               File
//             </Label>
//             <Input id="file" type="file" className="col-span-3" />
//           </div>
//           <div className="grid items-center grid-cols-4 gap-4">
//             <Label htmlFor="title" className="text-right">
//               Title
//             </Label>
//             <Input id="title" placeholder="Enter a title" className="col-span-3" />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" className="mr-auto">
//             Cancel
//           </Button>
//           <Button type="submit">Next</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   </div>
// )
