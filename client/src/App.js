
import './App.css';
import {useEffect, useState} from 'react'
import {getAllUser} from './api/api.js'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Component/Layout/MainLayout';
import AllTask from './Component/Pages/AllTask';
import TodayTask from './Component/Pages/TodayTask';
import ImportantTask from './Component/Pages/ImportatnTask';
import CompletedTask from './Component/Pages/CompletedTask';
import UnCompletedTask from './Component/Pages/UnCompletedTask';
import DirView from './Component/Pages/DirView';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';


function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<AllTask />} />
        <Route path='today' element={<TodayTask />} />
        <Route path='important' element={<ImportantTask />} />
        <Route path='completed' element={<CompletedTask />} />
        <Route path='uncompleted' element={<UnCompletedTask />} />
        <Route path='dir/:name' element={<DirView />} />
      </Route>

      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

    </Routes>
  );
}


export default App;
