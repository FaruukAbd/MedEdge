import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";

function PatientProfile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;

  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [bloodgroup, setBloodgroup] = useState();
  const [pincode, setPincode] = useState();
  const [gender, setGender] = useState();
  const [reports, setReports] = useState();
  const [username, setUsername] = useState();
  const [prescriptions, setPrescriptions] = useState();
  // const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = () => {
    const url = `http://localhost:3000/api/getpatientprofile/?email=${emailt}`;
    return axios.get(url).then((response) => {
      setProfile(response.data);
      setAge(response.data.age);
      setAddress(response.data.address);
      setBloodgroup(response.data.bloodgroup);
      setPincode(response.data.pincode);
      setGender(response.data.gender);
    });
  };

  const fetchreports = () => {
    const url = `http://localhost:3000/api/getreport/?username=${profile?.username}`;
    return axios.get(url).then((response) => {
      setReports(response.data);
    });
  };
  const fetchprescriptions = () => {
    const url = `http://localhost:3000/api/getprescription/?username=${profile?.username}`;
    return axios.get(url).then((response) => {
      setPrescriptions(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchreports();
  }, [profile]);

  useEffect(() => {
    fetchprescriptions();
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
    const res = await fetch(`http://localhost:3000/api/updatepatientprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        address,
        age,
        pincode,
        bloodgroup,
        gender,
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
      <div className=" rounded-lg pb-8">
        <div className=" ml-16 p-4">
          <h3 className="ml-16 pl-4 pb-2 text-red-500 font-bold ">
            Patient Details
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
        
        <div class="fixed z-50 w-36 mt-10 mr-3  h-60 right-4 bottom-1/2 transform translate-y-1/2 bg-white border border-gray-200  dark:bg-gray-700 dark:border-gray-600 hover:opacity-70">
          <div class="grid h-full grid-rows-2 mx-auto">
            <button data-tooltip-target="tooltip-home" class="inline-flex   flex-col items-center justify-center px-2  hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 group"
              type="submit"
              onClick={(e) => updateProfile(e)}>

              Update Profile

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
      <div className="bg-blue-200 p-8 mt-4 rounded-lg grid grid-cols-2 gap-3">
        <div>
          <h3 className=" flex  font-bold  text-indigo-900 text-xl">Patient Lab Reports</h3>

          {reports?.map((report) => (
            <div>
              <p className="font-mono font-semibold">
                <span className="font-bold text-indigo-900">Lab:</span>
              </p>
              <p className="font-mono font-semibold">{report.labName}</p>
              <p className="font-mono font-semibold">{report.labAddress}</p>

              <Image
                className="ml-10 mt-3"
                src={report.imageUrl}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>

        <div className="ml-6 ">
          <h3 className=" font-bold text-indigo-900 text-xl">Patient prescription</h3>
          {prescriptions?.map((prescription) => (
            <div className="mt-4">
              <p className="font-mono font-semibold  text-indigo-900">
                <span className="font-bold text-indigo-900">Doctor:</span>
                {prescription.doctorName}
              </p>
              <Image
                className="ml-10 mt-3  text-indigo-900 cursor-pointer"
                src={prescription.imageUrl}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
   

      </div>
    </div>
  );
}

export default PatientProfile;


