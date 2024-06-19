import SeachField from "../../../../components/SeachField";
import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

function Pengumuman() {
  
  const today = new Date().toISOString().split("T")[0];
  // Mendapatkan tanggal besok dalam format YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  return (
    <div>
      <div className="flex h-full">
        <div className="flex flex-col w-[37%] m-3">
          <Card className="px-6 py-5 border border-black p-2 font-poppins">
            <h1 className="text-2xl text-center ml-1 underline mb-6 font-poppins-semibold">
              Kelola Pengumuman
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-3 flex-col">
                <Input
                  label="Isi Pengumuman: "
                  required={true}
                  type="text"
                ></Input>
                <Input
                  placeholder="hari/bulan/tahun"
                  type="date"
                  name="tgl-lahir"
                  label="Berlaku Mulai: "
                  required={true}
                  defaultValue={today} // Mengatur nilai default ke tanggal hari ini
                  min={today}
                />
                <Input
                  placeholder="hari/bulan/tahun"
                  type="date"
                  name="tgl-lahir"
                  label="Berlaku Hingga: "
                  required={false}
                  min={tomorrowFormatted} // Mengatur nilai default ke tanggal besok
                />

                <Button
                  className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
                  text="Tambahkan"
                  type="submit"
                />
              </div>
            </form>
          </Card>
        </div>
        <div className="ml-2 m-3 flex flex-col gap-4 h-full flex-grow">
          <div className="flex flex-col gap-2 overflow-auto max-h-[428px]">
            <SeachField />
            {/* <TableDosenAdmin header={header} body={body} action={true} /> */}
          </div>
          <div>
            {/* <Pagination
              totalItems={totalItems}
              totalPages={totalPage}
              itemsPerPage={pageInterval}
              currentPage={page}
              onPageChange={(page) => {
                setPage(page);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengumuman;

