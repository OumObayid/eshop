/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * This file is part of the eShop application.
 * It is licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */


import { useState } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Helmet } from "../../components";


function Admin() {
  // State to store uploaded file
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(false);
  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    setProgress(true);
    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };
  const afficheProgress = progress ? `<p>${percent} % done</p>` : "";
  return (
    <Helmet title="Admin">
    <div style={{ marginTop: "15rem" }} className="container w-100">
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      {afficheProgress}
    </div>
    </Helmet>
  );
}

export default Admin;
