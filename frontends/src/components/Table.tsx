import iconedit from "../../assets/icons/edit.svg";
import icondelete from "../../assets/icons/delete.svg";

function Table() {
  return (
    <div className='border border-black'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[40%">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        NIDN
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Jenis Kelamin
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        1234567890987654
                      </th>
                      <td className="px-6 py-4 text-center">
                        Muhammad Irsyad Jaelani
                      </td>
                      <td className="px-6 py-4 text-center">Laki-laki</td>
                      <td className="px-6 py-4 text-center">
                        <button>
                          <img src={iconedit} alt="" />
                        </button>
                        <button>
                          <img src={icondelete} alt="" />
                        </button>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        1234567890987654
                      </th>
                      <td className="px-6 py-4 text-center">
                        Muhammad Irsyad Jaelani
                      </td>
                      <td className="px-6 py-4 text-center">Laki-laki</td>
                      <td className="px-6 py-4 text-center">
                        <button>
                          <img src={iconedit} alt="" />
                        </button>
                        <button>
                          <img src={icondelete} alt="" />
                        </button>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        1234567890987654
                      </th>
                      <td className="px-6 py-4 text-center">
                        Muhammad Irsyad Jaelani
                      </td>
                      <td className="px-6 py-4 text-center">Laki-laki</td>
                      <td className="px-6 py-4 text-center">
                        <button>
                          <img src={iconedit} alt="" />
                        </button>
                        <button>
                          <img src={icondelete} alt="" />
                        </button>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        1234567890987654
                      </th>
                      <td className="px-6 py-4 text-center">
                        Muhammad Irsyad Jaelani
                      </td>
                      <td className="px-6 py-4 text-center">Laki-laki</td>
                      <td className="px-6 py-4 text-center">
                        <button>
                          <img src={iconedit} alt="" />
                        </button>
                        <button>
                          <img src={icondelete} alt="" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
    </div>
  )
}

export default Table