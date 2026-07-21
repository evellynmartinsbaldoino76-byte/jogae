export function Header() {

  return (

    <header

      className="
      flex
      h-20
      items-center
      justify-between
      border-b
      border-white/10
      bg-transparent
      px-6
      "

    >




      <div

        className="
        flex
        items-center
        gap-3
        "

      >



        <div

          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-emerald-500/10
          text-xl
          shadow-lg
          shadow-emerald-500/10
          "

        >

          ⚽

        </div>





        <div>


          <h1

            className="
            text-xl
            font-bold
            text-white
            "

          >

            Jogaê

          </h1>



          <p

            className="
            text-xs
            text-slate-400
            "

          >

            Organize. Marque. Jogue.

          </p>


        </div>


      </div>







      <div

        className="
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-2
        text-sm
        text-slate-300
        backdrop-blur-xl
        "

      >

        Bem-vindo Gian


      </div>




    </header>

  );

}