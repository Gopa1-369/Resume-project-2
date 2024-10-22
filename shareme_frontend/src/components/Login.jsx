import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { replace, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Note the capitalization of 'G'
import { jwtDecode } from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    // console.log('Login Success:', credentialResponse);

    // Get the credential (JWT) from the response
    const credential = credentialResponse.credential;

    // Decode the JWT to get user profile information
    const decoded = jwtDecode(credential); // Decode the credential using jwt-decode
    // console.log(decoded);

    // Accessing specific fields
    const accessToken = credentialResponse.access_token; // This may vary based on your setup
    // Unique Google ID

    // Construct the profile object
    const profileObj = {
      name: decoded.name,
      email: decoded.email,
      imageUrl: decoded.picture,
      googleId: decoded.sub, // Add googleId directly to profileObj
    };

    const tokenId = credential; // The JWT itself can act as the tokenId

    // console.log('Token ID:', tokenId);

    localStorage.setItem("user", JSON.stringify(profileObj));

    //by set this value in localstorage,we want to create a new sanity document for the user and that user is going to the database so
    const { name, googleId, imageUrl } = profileObj;

    //create the field for sanity document that we have specidied for our sanity user schema
    const doc = {
      //her _varible is used for sanity to know which document are creating and in this case it's the user
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    //create new document which don't exist in database
    client
      .createIfNotExists(doc)
      //what happen after creating document
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  return (
    <div className="flex  flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 ">
            <img src={logo} width="130px" alr="logo" />
          </div>
          <div className="shadow-2xl  flex flex-col items-center">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4 rounded-lg " />
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
