import { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";



export default function Layout() {

  const loadFromStorage = useAppStore(state=>state.loadFromStorage)
  useEffect(()=> loadFromStorage(), [])
  
  return (
    <>
        <Header/>

        <main className="p-16 container mx-auto">
            <Outlet/>
        </main>

        <Modal/>
        <Notification/>
    </>
  )
}
