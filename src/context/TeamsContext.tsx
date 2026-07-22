"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


export interface Team {

  id: string;

  name: string;

  createdAt?: string;

}




interface TeamsContextData {

  teams: Team[];

  addTeam: (
    name: string
  ) => Promise<boolean>;

  removeTeam: (
    id: string
  ) => Promise<void>;

}





const TeamsContext =
  createContext<TeamsContextData | null>(null);






export function TeamsProvider({

  children,

}: {

  children: ReactNode;

}) {



  const [teams, setTeams] = useState<Team[]>([]);



  async function loadTeams() {


    const response = await fetch(
      "/api/teams"
    );


    const data =
      await response.json();


    setTeams(data);


  }






  useEffect(() => {


    loadTeams();


  }, []);









  async function addTeam(
    name: string
  ) {


    try {


      const response =
        await fetch(
          "/api/teams",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              name,

            }),

          }
        );



      if (!response.ok) {

        return false;

      }




      const team =
        await response.json();



      setTeams((current) => [

        ...current,

        team,

      ]);



      return true;



    } catch {


      return false;


    }


  }









  async function removeTeam(
    id: string
  ) {


    await fetch(
      `/api/teams/${id}`,
      {

        method: "DELETE",

      }
    );



    setTeams((current) =>

      current.filter(

        (team) =>

          team.id !== id

      )

    );


  }








  return (

    <TeamsContext.Provider

      value={{

        teams,

        addTeam,

        removeTeam,

      }}

    >

      {children}

    </TeamsContext.Provider>

  );


}









export function useTeams() {


  const context =
    useContext(TeamsContext);



  if (!context) {


    throw new Error(

      "useTeams deve ser usado dentro de TeamsProvider."

    );


  }



  return context;


}