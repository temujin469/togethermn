import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer/Footer';
import { MapPin, Phone ,Cloudy} from 'lucide-react';


function ContactUs() {


  // const aboutUs = await myFetch("/api/about-us?populate=*");

  return (
    <div className='bg-white'>
      <Header />
      <div className='mx-auto max-w-[1800px]'>
        <div className="mb-24 mx-auto 2xl:px-6">
          {/* <!-- Section: Design Block --> */}
          <section className="mb-32">
            <div className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/284.jpg')]"></div>
            <div className="container px-6 md:px-12">
              <div
                className="block rounded-lg bg-[#ffffffc9] px-6 py-6 sm:py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[20px]">
                <div className="flex flex-wrap">
                  <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                    {/* <form>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <input type="text"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleInput90" placeholder="Нэр" />
                        <label
                          className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Нэр
                        </label>
                      </div>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <input type="email"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleInput91" placeholder="Имэйл хаяг" />
                        <label
                          className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Имэйл хаяг
                        </label>
                      </div>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <textarea
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlTextarea1" rows={3} placeholder="Your message"></textarea>
                        <label 
                          className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Зурвас</label>
                      </div>
                      <button type="button" data-te-ripple-init data-te-ripple-color="light"
                        className="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0">
                        Илгээх
                      </button>
                    </form> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10694.53831248501!2d106.93019885358044!3d47.924107685927126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692410e9a41b5%3A0x3372eb2a5a6155bf!2sInformation%20Technology%20Park!5e0!3m2!1sen!2smn!4v1691982406578!5m2!1sen!2smn" style={{
                      border:0
                    }} loading="lazy" className='w-full h-full rounded-lg'></iframe>
                  </div>
                  <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                    <div className="flex flex-wrap">
                      <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                        <div className="flex items-start">
                          <div className="shrink-0">
                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                              <MapPin className='text-gray-700' size={30} />
                            </div>
                          </div>
                          <div className="ml-6 grow">
                            <p className="mb-2 font-bold dark:text-white">
                              Хаяг
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              Баянзүрх Дүүрэг 3-р хороо, Токиогийн гудамж , Токио Ресидэнс, 9-р давхар, 22 тоот
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                        <div className="flex items-start">
                          <div className="shrink-0">
                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                              <Cloudy className='text-gray-700' size={30} />
                            </div>
                          </div>
                          <div className="ml-6 grow">
                            <p className="mb-2 font-bold dark:text-white">
                              Техникийн дэмжлэг
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              together.mn
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              (+976) 99996050
                            </p>
                          </div>
                        </div>
                      </div>
                   
                      <div
                        className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                        <div className="align-start flex">
                          <div className="shrink-0">
                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                              <Phone className='text-gray-700' size={30}/>
                            </div>
                          </div>
                          <div className="ml-6 grow">
                            <p className="mb-2 font-bold dark:text-white">Утасны дугаар</p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              (+976) 75104000
                              <br/>
                              (+976) 99996050
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                        <div className="align-start flex">
                          <div className="shrink-0">
                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" className="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-6 grow">
                            <p className="mb-2 font-bold dark:text-white">Bug report</p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              bugs@example.com
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-200">
                              +1 234-567-89
                            </p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section: Design Block --> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
