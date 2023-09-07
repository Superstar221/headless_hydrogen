import howToPoster from "../styles/Export/howToPoster.png"

export function HowToUse() {
  return (
    <div className="flex justify-center">
      <div className="py-8 max-w-screen-lg px-4">
        <div className="md:flex text-center gap-4 md:text-4xl text-2xl md:my-5 mt-5 text-black justify-center mb-2">
          <h2 className="font-light">How To Use The</h2>
          <h2 className="font-semibold">Lumin Glow</h2>
        </div>
        <div className="">
          <video src="https://cdn.shopify.com/videos/c/o/v/25233080a4a545b0b51de1ef5ca49bc7.mov" className="w-full h-full rounded-md" poster={howToPoster} controls></video>
        </div>
      </div>
    </div>
  )
}
