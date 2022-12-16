import React, { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import UserContext from "../context";
import { Patterns } from "../winningpattern";
import { useNavigate } from "react-router-dom";

function Board() {
  const nav = useNavigate();
  const { setroomid, roomid, socket, setname, name } = useContext(UserContext);
  const [board, setboard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [play, setplay] = useState(true);
  useEffect(() => {
    checkWin();
    socket.on("updateGame", (id) => {
      setboard((data) => ({ ...data, [id]: "o" }));
      setplay(true);
    });
    return () => socket.off("updateGame");
  });
  useEffect(() => {
    setroomid(localStorage.getItem("room"));
    setname(localStorage.getItem("user"));
    if (roomid) {
      socket.emit("joinroom", { roomid, name });
    }
  }, []);
  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (play && board[id] == "") {
      setboard((data) => ({ ...data, [id]: "x" }));
      socket.emit("play", { id, roomid });
      setplay(false);
    } else {
      alert("your oponent turn");
    }
  };
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        if (firstPlayer == "x") {
          alert("you won");
          nav("/")
        } else {
          alert("you loose");
          nav("/")
        }
      }
    });
  };
  const checkIfTie = () => {
    let filled = 0;
    for(let i=0;i<8;i++){
      if(board[i] != ""){
        filled++
      }
      if(filled == 8){
        alert("game is drawed")
        nav('/')
      }
    }
  };
  useEffect(() => {
    window.onbeforeunload = () => {
      return "";
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const leave = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("room");
    nav("/");
  };
  useEffect(()=>{
    checkIfTie()
  },[board])
  return (
    <>
      {roomid && name ? (
        <>
          <div className="main-section">
            <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
            <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
            <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />
            <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
            <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
            <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />
            <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
            <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
            <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
          </div>
          <div className="flex">
            <button className="btn" onClick={() => nav("/")}>
              restart
            </button>
            <button className="btn" onClick={leave}>
              leave
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Board;
