
export default function GameOverScreen() {
  

    return (
        <div className={`z-10 text-center text-white space-y-6`}>
            <div className="text-2xl text-black">❤️❤️❤️🤍🤍</div>

            <h1 className="text-2xl text-orange-500 drop-shadow-[2px_2px_0px_#000] w-full">
                GAME OVER
            </h1>

            <div className="text-white text-3xl">
                TRY AGAIN?
            </div>

           <link href="/" className="text-white text-2xl underline">Return Home</link>

            <div className="absolute top-4 right-4 text-right text-white text-xs">
                <div>SCORE:</div>
                <div className="text-yellow-400 text-xl font-bold">320</div>
            </div>
        </div>
    )
}
