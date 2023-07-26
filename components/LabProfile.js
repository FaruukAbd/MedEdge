

import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
function LabProfile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;
  const [selectedImage, setSelectedImage] = useState(null);
  const [reports, setReports] = useState();
  const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const [age, setAge] = useState();
  const [address, setAddress] = useState();
  // const [bloodgroup, setBloodgroup] = useState();
  const [pincode, setPincode] = useState();
  // const [gender, setGender] = useState();

  const fetchData = () => {
    const url = `http://localhost:3000/api/getlabprofile/?email=${emailt}`;
    return axios.get(url).then((response) => {
      setProfile(response.data);
      // setAge(response.data.age)
      setAddress(response.data.address);
      // setBloodgroup(response.data.bloodgroup)
      setPincode(response.data.pincode);
      // setGender(response.data.gender)
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const res = await fetch(`http://localhost:3000/api/updatelabprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, address, pincode }),
    });
    Router.reload();
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 font-mono text-white">
    
    <div className="mx-auto w-64 pt-3 text-center">
      <div className="relative w-64">
        <img
          className="w-64 h-64 rounded-full absolute"
          src={selectedImage || profile?.profilephoto}
          alt="Picture of the lab"
        />
        <label
          htmlFor="image-upload"
          className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
        >
          <img
            className="hidden group-hover:block w-12"
            src="https://www.svgrepo.com/show/33565/upload.svg"
            alt=""
          />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>



    <div className="pt-[265px] text-center font-bold  ">
      {" "}
      <span className="font-semibold "> UserName :</span>{" "}
      <span className="text-red-700 "> {profile?.username}</span>
    </div>









    {/* </div> */}

    <div className=" rounded-lg pb-4">
      <div className=" ml-16 p-4">
        <h3 className="ml-16 pl-4 pb-2 text-red-500 font-bold ">
          Lab Details
        </h3>
        <div className=" mt-2  font-mono ml-2 text-lg ">
          Name :
          <span className="font-semibold font-mono text-gray-400 pl-2 ">{profile?.name}</span>
        </div>
        <div className=" mt-2  font-mono ml-2 text-lg">
          Contact :
          <span className="font-semibold font-mono text-gray-400 pl-2"> {profile?.phone}</span>
        </div>
        <div className="  mt-2  font-mono ml-2 text-lg ">
          Email :
          <span className="font-semibold font-mono text-gray-400 pl-2"> {profile?.email}</span>
        </div>
        <div className=" mt-2  font-mono ml-2 text-lg">
          Contact :
          <span className="font-semibold font-mono text-gray-400 pl-2"> {profile?.phone}</span>
        </div>
        <div className="  mt-2  font-mono ml-2 text-lg ">
          Role :
          <span className="font-semibold font-mono text-gray-400 pl-2"> {profile?.role}</span>
        </div>

        <div className=" grid-flow-col">
          <div class="relative h-11 mt-1 w-full min-w-[200px]">
            <div class="flex items-center">
            <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Address:
                </span>

                <input
                  placeholder="Enter Your Address"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 block w-[50%] overflow-hidden resize-both min-h-40px leading-20px font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="Enter Your Adress "
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

             
            </div>
          </div>
          <div class="relative h-11 mt-1 w-full min-w-[200px]">
            <div class="flex items-center">
           
            <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Pincode:
                </span>

                <input
                  placeholder="Pincode"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="pincode"
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              
            </div>
          </div>

          <div class="relative h-11 mt-1 w-full min-w-[200px]">
            <div class="flex items-center">
              

              
            </div>
          </div>

          <div class="relative h-11 mt-1 w-full min-w-[200px]">
            <div class="flex items-center">
             

              
            </div>
          </div>

         
        </div>
      </div>
      {/* <div className=" grid grid-cols-3  place-items-center mt-9 ">
        <div>
          <button
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            type="submit"
            onClick={(e) => updateProfile(e)}
          >
            Update
          </button>

        </div>
        <div >
          <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
            <a
              href="http://localhost:3000/prescription">
              Upload Prescription
            </a>
          </button>
        </div>

        <div>
          <button
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
          >
            Sign out
          </button>
        </div>
      </div> */}
      <div class="fixed z-50 w-36 mt-10 mr-3  h-80 right-4 bottom-1/2 transform translate-y-1/2 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 hover:opacity-70">
        <div class="grid h-full grid-rows-3 mx-auto">
          <button data-tooltip-target="tooltip-home" class="inline-flex   flex-col items-center justify-center px-2  hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 group"
            type="submit"
            onClick={(e) => updateProfile(e)}>

            Update Profile

          </button>
          <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 ">

            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>



          <button data-tooltip-target="tooltip-wallet" type="button" class="inline-flex pt-5  flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600  group"
          >
            <a
              href="http://localhost:3000/report">
              Upload Reports
            </a>


          </button>
          <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-white transition-opacity duration-300  bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 ">

            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button data-tooltip-target="tooltip-settings" type="button" class="inline-flex pt-9 pb-4  flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 group"
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
          >
            Sign out


          </button>
          <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">

            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>






    </div>
    <div></div>
  </div>
  );
}

export default LabProfile;
// export async function getServerSideProps() {
//   const session = await getSession(context);
//   const email = session.user.email;
//   const profile = await fetch(
//     `http://localhost:3000/api/getlabprofile/?email=${email}`
//   ).then((res) => res.json());
//   return {
//     props: {
//       session,
//       check,
//       profile,
//       email,
//     },
//   };
// }
