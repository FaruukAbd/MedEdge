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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
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