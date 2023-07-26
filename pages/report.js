
import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";

export default function report() {
  const { data: session } = useSession();
  if (session.user.role !== "lab") {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );
  }

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "reportdata"); // Replace with your Cloudinary upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.secure_url; // Get the uploaded image URL

    // Save the URL and username to MongoDB
    const patientData = {
      username,
      imageUrl,
      labName: session.user.name,
    };

    const saveResponse = await fetch("/api/savereportdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });
    
    let datat = await saveResponse.json();
    if (datat.message) {
      setMessage(datat.message);
    }
    if (datat.message === "Patient data saved successfully.") {
      window.location.reload();
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-screen pt-20 ">
      <div className="p-5">
        <a href="http://localhost:3000/profile">
          <button type="button" class="text-red-600 border border-red-600 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-400 dark:hover:bg-red-500">
            <span class="sr-only">Icon description</span>
            <svg aria-hidden="true" class="w-5 h-5 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </a>

      </div>
      <div className=" grid justify-center items-center">
        <form onSubmit={handleSubmit}>
          {/* <div className="pt-3 pb-3 mt-20 font-semibold font-mono ml-2 text-lg">
          <label className="text-white">Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div> */}


          <div class="relative mb-2">
            <input
              type="text" value={username} onChange={handleUsernameChange}
              class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-200 focus:outline-none peer-focus:text-primary hover:border-red-600 darkr:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"

              placeholder="Username" />
            <label
              for="floatingInput"
              class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >UserName</label
            >
          </div>





          <div className="pt-3 pb-3  font-semibold font-mono ml-2 text-lg">
            {/* <label className="text-white">Image:</label>
          <input className="ml-2" type="file" accept="image/*" onChange={handleImageChange} /> */}
            <label
              for="formFileMultiple"
              class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >Choice Patient's Lab Report </label
            >
            <input
              class="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-300 focus:shadow-te-primary focus:outline-none hover:border-red-600 dark:border-neutral-400 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file" accept="image/*" onChange={handleImageChange}
              id="formFileMultiple"
              multiple />
          </div>
          {/* <Button variant="gradient" className="flex items-center gap-3 text-bold">
          <label htmlFor="image-input">
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <CloudArrowUpIcon strokeWidth={2} className="h-10 w-10" /> Upload Files
          </label>
        </Button> */}

          <div className="flex items-center pr-10 pl-5   mt-10  ml-2 border-1 font-bold mr-40  border-gray-500 rounded-md">
            {/* <button
            className="bg-green-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            type="submit"
            disabled={processing}
          >
            {processing ? "Uploading..." : "Upload"}
          </button> */}
            <button
              className="  text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-400 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "
              type="submit"
              disabled={processing}
              onClick={handleSubmit}
            >
              <div className="flex items-center mr-[24px]">
                <div className={`h-5 w-5 animate-spin border-t-transparent border-solid rounded-full border-white border-4 ${processing ? '' : 'invisible'}`}></div>
                <span className="ml-2">{processing ? 'Uploading...' : 'Upload'}</span>
              </div>
            </button>
          </div>
        </form>

        <p className={message.startsWith(" Upload successful") ? "text-green-500" : "text-red-500 "}>
          {message}
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
