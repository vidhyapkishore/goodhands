// Import necessary modules and functions 
import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useState, useEffect } from "react";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function Room() {
  // Retrieve roomID and role values from the URL with default fallbacks or generate random IDs
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let role_str = getUrlParams(window.location.href).get("role") || "Host";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;
  
  let sharedLinks = [];
  // Create shared links for Co-Hosts and Audience members
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        "&role=Cohost",
    });
  }
  sharedLinks.push({
    name: "Join as audience",
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID +
      "&role=Audience",
  });
  
  // generate Kit Token
  const appID = 1271443434;
  const serverSecret = "fa6bf3300476ec6ee8e17d7b6dcb58d3";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  // start the call
  let myMeeting = async (element) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      lowerLeftNotification: {
        showTextChat: false, // Whether to display the latest messages on the lower left area. Displayed by default.
      },
      showTextChat: false,
      sharedLinks,
    });
  };

  const [sentcode, setSentCode] = useState(false);
  // Email sent only once to the intended recipient with details of the current call
  console.log(sentcode);
  if (sentcode === false) {
    setSentCode(true);
    const receiving_email = "vidhyapk4@gmail.com";
    const content_email =
      "On behalf of our organization, I would like to extend my heartfelt thanks for your recent donation. \nWe will be live streaming the video of the day we spend your donation. In this mail we have attached a url to join incase if you are not able to join us here. It would always great if you could join us.\nOnce again, thank you for your kind donation. We deeply appreciate your support and look forward to your continued involvement with our organization.  " +
      "Thank You\n Love from all our hearts\n\n\nThis is the URL to join : " +
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID +
      "&role=Audience";
    const subject_line = "Thank you for your donation";
    const senders_email = "techtalkque@gmail.com";
    const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];
    fetch(`${process.env.REACT_APP_API_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        content_email,
        receiving_email,
        subject_line,
        senders_email,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
    console.log(content_email,receiving_email,subject_line,senders_email);
  }
  // Render the Zego call interface
  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}