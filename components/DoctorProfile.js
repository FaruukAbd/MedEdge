import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";
function Doctorprofile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;
  const [speciality, setSpeciality] = useState();
  const [age, setAge] = useState();
  const [currentworkplace, setCurrentworkplace] = useState();
  const [gender, setGender] = useState();
  const [role, setrole] = useState();
  const [experience, setExperience] = useState();
  const [reports, setReports] = useState();
  const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = () => {
    const url = `http://localhost:3000/api/getdoctorprofile/?email=${emailt}`;
    return axios.get(url).then((response) => {
      setProfile(response.data);
      setAge(response.data.age);
      setCurrentworkplace(response.data.currentworkplace);
      setExperience(response.data.experience);
      setGender(response.data.gender);
      setrole(response.data.role);
      setSpeciality(response.data.speciality);
      setImage(response.data.profilephoto);
    });
  };

  const fetchreports = () => {
    const url = `http://localhost:3000/api/getreport/?username=${profile?.username}`;
    return axios.get(url).then((response) => {
      setReports(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchreports();
  }, [profile]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const formData = new FormData();
    formData.append("file", imagefile);
    formData.append("upload_preset", "profilephotos"); // Replace with your Cloudinary upload preset
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.secure_url; // Get the uploaded image URL
    const res = await fetch(`http://localhost:3000/api/updatedoctorprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        age,
        gender,
        experience,
        currentworkplace,
        speciality,
        profilephoto: imageUrl,
      }),
    });
    Router.reload();
  };
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
  return (



    <div className="bg-gradient-to-r from-slate-900 to-slate-700 font-mono text-white">
      {/* <div className=" rounded-md pb-4"> */}
      {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
      {/* <Image
          className=" mx-auto pt-2 pb-2 rounded-lg "
          src={selectedImage || profile?.profilephoto}
          alt="Picture of the author"
          width={200}
          height={200} 
        />
        <input type="file" accept="image/*" onChange={handleImageChange} /> */}
      <div className="mx-auto w-64 pt-3 text-center">
        <div className="relative w-64">
          <img
            className="w-64 h-64 rounded-full absolute"
            src={selectedImage || profile?.profilephoto}
            alt="Picture of the author"
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
            Doctor Details
          </h3>
          <div className=" mt-2  font-mono ml-2 text-lg ">
            Name :
            <span className="font-semibold font-mono text-gray-400 pl-2 ">{profile?.firstname} {profile?.lastname}</span>
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
                  Age:
                </span>

                <input
                  placeholder="Enter Your Age"
                  class="peer h-full w-[30%] flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Experience:
                </span>

                <input
                  placeholder="Experience"
                  class="peer h-full w-[30%] flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="experience"
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Currentworkplace:
                </span>

                <input
                  placeholder="Please fill the entry"
                  class="peer h-full w-[40%] flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="currentworkplace"
                  type="text"
                  value={currentworkplace}
                  onChange={(e) => setCurrentworkplace(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Speciality:
                </span>

                <input
                  placeholder="Enter Your Specialisation"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="speciality"
                  type="text"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Gender:
                </span>

                <input
                  placeholder="Enter Your Gender"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
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
                href="http://localhost:3000/prescription">
                Upload Prescription
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

export default Doctorprofile;
// export async function getServerSideProps() {
//   const session = await getSession(context);
//   const email = session.user.email;
//   const profile = await fetch(
//     `http://localhost:3000/api/getpatientprofile/?email=${email}`
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
