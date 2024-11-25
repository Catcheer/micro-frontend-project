// import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { addScore, delScore, selectScore } from "@/store/score";

import { updateName, updateAge } from "@/store/profileSlice";

import { setColor, changeEmail, changeSms } from "@/store/preferencesSlice";

export default function About() {
  let scores = useSelector(selectScore);
  let profile = useSelector((state) => state.user.profile);
  let preferences = useSelector((state) => state.user.preference);
  let dispatch = useDispatch();
  return (
    <div>
      <div>
        {scores.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
      <Button
        onClick={() => {
          dispatch(addScore((Math.floor(Math.random() * 40 + 60) * 100) / 100));
        }}
      >
        addScore
      </Button>
      <Button
        onClick={() => {
          dispatch(delScore());
        }}
      >
        delScore
      </Button>
      <div style={{ height: "100px" }}></div>
      <div>name:{profile.name}</div>
      <div>age:{profile.age}</div>
      <div>
        <Button
          onClick={() => {
            dispatch(updateAge());
          }}
        >
          addAge
        </Button>
        <Button
          onClick={() => {
            dispatch(updateName());
          }}
        >
          changeName
        </Button>
        <div style={{ height: "100px" }}></div>
        <div>color:{preferences.color}</div>
        <div>email:{+preferences.notifications.email}</div>
        <div>sms:{+preferences.notifications.sms}</div>
        <Button
        onClick={() => {
          dispatch(setColor());
        }}
      >
        setColor
      </Button>
      <Button
        onClick={() => {
          dispatch(changeEmail());
        }}
      >
        changeEmail
      </Button>
      <Button
        onClick={() => {
          dispatch(changeSms());
        }}
      >
        changeSms
      </Button>
      </div>
    </div>
  );
}
