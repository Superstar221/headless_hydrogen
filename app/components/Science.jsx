import { Link } from '~/components'
import wand from '../styles/Export/wand1.png'
import num1 from '../styles/Export/icons/numbers/n1.svg'
import num2 from '../styles/Export/icons/numbers/n2.svg'
import num3 from '../styles/Export/icons/numbers/n3.svg'
import num4 from '../styles/Export/icons/numbers/n4.svg'
import num5 from '../styles/Export/icons/numbers/n5.svg'

export function Science({ isDark }) {
  if (isDark == '1') {
    return (
      <div className="bg-background md:grid md:grid-cols-2 flex flex-col-reverse justify-center align-middle">
        <div className="flex justify-center align-middle">
          <div className="md:p-16 p-5 max-w-[50em] text-white align-middle">
            <div className="md:text-[56px] text-3xl leading-none pb-6 md:justify-start">
              <h2 className='font-light md:text-left text-center'>It's not Magic</h2>
              <h2 className='font-medium md:text-left text-center md:text-[56px] text-4xl'>It's Science.</h2>
            </div>
            <div className="space-y-3 md:text-lg text-base">
              <div className='font-light flex'>
                <div className='md:min-w-[40px] min-w-[35px]'>
                  <img src={num1} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Red Light Therapy</h4>
                  <p className="text-accent">Promotes collagen and minimizes fibroblast production smoothing fine lines, depuffing and glowing the skins appearance.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num2} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Blue Light Therapy</h4>
                  <p className="text-accent">Heals blemishes and minimize breakouts while killing acne causing bacteria.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num3} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Microcurrent</h4>
                  <p className="text-accent">Promotes blood flow and lymphatic drainage by stimulating facial muscles.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num4} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Therapeutic Warmth</h4>
                  <p className="text-accent">Allows oxygen and nutrients to move through blood vessels and increase serum absorption.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num5} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Facial Massage</h4>
                  <p className="text-accent">Rejuvenation process pushes toxins out resulting in healthy radiant skin.</p>
                </div>
              </div>
            </div>
            <div className="flex md:justify-start justify-center">
              <Link
                to='/science'
                prefetch="intent"
              >
                <button className="bg-white font-light rounded-full py-2 px-6 mt-6 text-xl tracking-wider text-background hover:bg-secondary hover:text-white transition-all hover:scale-105">LEARN MORE</button>
              </Link>
            </div>
          </div>
        </div>
        <div className='bg-[url("../styles/Export/scienceImage.jpg")] bg-cover bg-top w-full md:aspect-auto aspect-square h-full'>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="bg-beige md:grid md:grid-cols-2 flex flex-col-reverse justify-center align-middle">
        <div className="flex justify-center align-middle">
          <div className="md:p-16 p-5 max-w-[50em] text-black align-middle ">
            <div className="md:text-[56px] text-4xl leading-none pb-6 md:justify-start justify-center">
              <h2 className='font-light  md:text-left text-center'>It's not Magic</h2>
              <h2 className='font-medium md:text-left text-center md:text-[56px] text-5xl'>It's Science.</h2>
            </div>
            <div className="space-y-3 text-lg">
              <div className='font-light flex'>
                <div className='md:min-w-[40px] min-w-[35px]'>
                  <img src={num1} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Red Light Therapy</h4>
                  <p>Promotes collagen and minimizes fibroblast production smoothing fine lines, depuffing and glowing the skins appearance.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num2} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Blue Light Therapy</h4>
                  <p>Heals blemishes and minimize breakouts while killing acne causing bacteria.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num3} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Microcurrent</h4>
                  <p>Promotes blood flow and lymphatic drainage by stimulating facial muscles.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num4} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Therapeutic Warmth</h4>
                  <p>Allows oxygen and nutrients to move through blood vessels and increase serum absorption.</p>
                </div>
              </div>
              <div className='font-light flex'>
                <div className='md:max-w-[40px] min-w-[35px]'>
                  <img src={num5} className="" />
                </div>
                <div className="ml-4">
                  <h4 className='md:text-2xl text-xl font-medium'>Facial Massage</h4>
                  <p>Rejuvenation process pushes toxins out resulting in healthy radiant skin.</p>
                </div>
              </div>
            </div>
            <div className="flex md:justify-start justify-center">
              <Link
                to='/science'
                prefetch="intent"
              >
                <button className="bg-background text-white font-light rounded-full py-2 px-6 mt-6 text-xl tracking-wider hover:bg-white hover:text-background transition-all hover:scale-105 ">LEARN MORE</button>
              </Link>
            </div>
          </div>
        </div>
        <div className='bg-[url("../styles/Export/scienceImage.jpg")] bg-cover bg-top w-full md:aspect-auto aspect-square h-full'>
        </div>
      </div>
    )
  }
}