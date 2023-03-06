import React, { useEffect, useState } from "react";
import "./profile.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const Profile = () => {
  const [cookies] = useCookies([]);

  const handleUpload = (e) => {
    e.preventDefault();
    try {
      console.log(values);
      upload([{ file: selectedImage, label: "img" }]);
    } catch (error) {
      throw error.message;
    }
  };
  const [tempImage, setTempImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  var token = cookies.jwt;
  var decoded = jwt_decode(token);
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
            try {
              const { data } = await axios.post(
                "http://localhost:4000/update/:" + decoded.id,
                {
                  image: url,
                },
                {
                  withCredentials: true,
                }
              );

              setSelectedImage(null);
            } catch (error) {
              throw error.message;
            }
          });
        }
      );
    });
  };

  return (
    <div className="edit">
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol></MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <label htmlFor="image">
                    <input type="file" onChange={imageChange} />
                  </label>
                  <MDBCardImage
                    src={
                      tempImage ||
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                    id="image"
                    onClick={handleUpload}
                  />

                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default Profile;
