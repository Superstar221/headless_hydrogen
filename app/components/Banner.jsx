export function Banner({hide}) {
    return (
      <>
        <div className={`bg-black p-2 ${hide ? 'hidden transition-all' : 'block transition-all'}  transition-all`}>
            <h4 className="text-white font-neue text-center text transition-all fadeIn">
                Free shipping on all USA orders
            </h4>
        </div>
      </>
    );
  }