"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


export interface Event {

  id: string;

  date: string;

  startTime: string;

  endTime: string;

  type: string;

  description: string;

}




interface EventsContextData {

  events: Event[];

  addEvent: (event: Event) => void;

  removeEvent: (id: string) => void;

}




const EventsContext =
  createContext<EventsContextData | null>(null);






export function EventsProvider({

  children,

}: {

  children: ReactNode;

}) {



  const [events, setEvents] =
    useState<Event[]>([]);





  function addEvent(event: Event) {


    setEvents((current) => [

      ...current,

      event,

    ]);

  }






  function removeEvent(id: string) {


    setEvents((current) =>

      current.filter(

        (event) => event.id !== id

      )

    );

  }







  return (


    <EventsContext.Provider

      value={{

        events,

        addEvent,

        removeEvent,

      }}

    >


      {children}


    </EventsContext.Provider>


  );

}







export function useEvents() {


  const context =
    useContext(EventsContext);



  if (!context) {


    throw new Error(

      "useEvents deve ser usado dentro de EventsProvider."

    );


  }




  return context;


}