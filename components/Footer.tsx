import { FaTelegramPlane, FaGithub} from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-lime mt-auto">
      <div className="grid sm:grid-flow-row md:grid-flow-colsm:grid-rows-3 md:grid-cols-3 bg-gray-900 border-2  border-lime rounded-2xl text-lime p-4">
        <a
          href="https://t.me/aosoaap"
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-100 max-w-fit"><p>Contact us</p><FaTelegramPlane/></a>
        <p className="md:text-center">&copy; 2024, All rights reserved.</p>
        <a 
          href="https://github.com/miklisanton" 
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-100 max-w-fit md:ml-auto"><p>Developed by Anton Miklis</p><FaGithub/></a>
      </div>
    </footer>
  );
}
