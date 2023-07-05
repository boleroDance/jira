import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from  'react-router'
import { BoardScreen } from 'screens/board'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
  return <div>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      <Route path={'kanban'} element={<BoardScreen />} />
      <Route path={'epic'} element={<EpicScreen />} />
      {/* <Navigate to={window.location.pathname + '/board'}/> */}
      <Route index element={<BoardScreen />} />
      </Routes>
  </div>
}