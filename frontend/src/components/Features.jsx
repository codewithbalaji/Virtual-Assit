import img1 from "../assets/coach.jpeg";
import img2 from "../assets/doctor.png";
import img3 from "../assets/psychologist.jpeg";
import img4 from "../assets/movie.jpeg";
import img5 from "../assets/story.jpeg";
import img6 from "../assets/travel.jpeg";

const Features = () => {
  return (
    <section id="features">
      <div className=" px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gray-200 ">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16 ">
          <div className="mx-auto  text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-6xl">
              Create Your Virtual
            </h2>
            <h2 className="text-3xl font-bold sm:text-5xl pt-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  text-transparent">AI Assistants</h2>
            <a
              href="/chat"
              className="mt-8 inline-block rounded border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Create Now
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div
              className="rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-300 hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring flex flex-col items-center"
              href="#"
            >
              <img className="w-40 h-40 rounded-full" src={img1} alt="" />
              <h2 className="mt-2 font-bold text-center">Talent Coach</h2>
            </div>
            <div
              className="rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-300 hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring flex flex-col items-center"
              href="#"
            >
              <img className="w-40 h-40 rounded-full" src={img2} alt="" />
              <h2 className="mt-2 font-bold text-center">Mental Health Advisor</h2>
            </div>
            <div
              className="rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-300 hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring flex flex-col items-center"
              href="#"
            >
              <img className="w-40 h-40 rounded-full" src={img3} alt="" />
              <h2 className="mt-2 font-bold text-center">Psychologist</h2>
            </div>
            <div
              className="rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-300 hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring flex flex-col items-center"
              href="#"
            >
              <img className="w-40 h-40 rounded-full" src={img4} alt="" />
              <h2 className="mt-2 font-bold text-center">Movie Critic</h2>
            </div>
            <div
              className="rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-300 hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring flex flex-col items-center"
              href="#"
            >
              <img className="w-40 h-40 rounded-full" src={img5} alt="" />
              <h2 className="mt-2 font-bold text-center">Story Teller</h2>
            </div>
            <div
              className="rounded-xl border border-gray-100 p-4 shadow-sm hover:border-blue-300 hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring flex flex-col items-center"
              href="#"
            >
              <img className="w-40 h-40 rounded-full" src={img6} alt="" />
              <h2 className="mt-2 font-bold text-center">Travel Guide</h2>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
