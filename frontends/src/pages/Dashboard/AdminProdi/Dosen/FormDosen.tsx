import React from 'react'
import Button from '../../../../components/Button'
import Card from '../../../../components/Card'
import Input from '../../../../components/Input'
import Table from '../../../../components/Table'

function FormDosen() {
  return (
    <div><div className="flex">
    <div className="flex flex-col w-[40%] m-3">
      <Card className="py-7 px-10 border border-black p-2 font-poppins">
        <h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
          DOSEN
        </h1>
        <form>
          <Input
            label="NIDN"
            required={true}
            type="text"
            placeholder="0010107574"
          ></Input>
          <Input
            label="Nama Dosen"
            required={true}
            type="text"
            placeholder="Syafat Hidayat"
          ></Input>
          <Input
            label="Email"
            required={true}
            type="email"
            placeholder="syafaat@uin-suska.ac.id"
          ></Input>
          <label>
            <p className="text-xl mb-4 ">
              Jenis Kelamin
              <span className="text-red-500">*</span>
            </p>
          </label>
          <input type="radio" name="gender" id="female" />
          <label className="ml-2">Laki-laki</label>
          <span> </span>
          <input type="radio" name="gender" id="male" />
          <label className="ml-2">Perempuan</label>

          <Button
            className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
            text="Tambahkan"
            type="submit"
          />
        </form>
      </Card>
    </div>
    <div className="w-[60%] ml-2 m-3">
      <Table />
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>{" "}
          Entries
        </span>

        <div className="inline-flex mt-2 xs:mt-0">
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default FormDosen