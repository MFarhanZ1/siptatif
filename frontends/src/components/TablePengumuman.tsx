import iconedit from "../../assets/icons/edit.svg";
import icondelete from "../../assets/icons/delete.svg";
interface Data {
  body: {
    isi: string;
    id: number;
    berlaku_mulai: string;
    berlaku_hingga: string;
    created_by: string;
  }[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
function TablePengumuman({ body, onDelete, onEdit }: Data) {
  return (
    <div className="overflow-x-auto border border-black font-poppins h-full flex-grow">
      <div>{/* <SeachField /> */}</div>
      <div className="overflow-y-auto border border-black">
        {/* table */}
        <table className="w-full text-xs text-left table-auto">
          <thead className="bg-gray-700 uppercase text-white sticky top-0 w-full">
            <tr className="text-center text-sm">
              <th>Isi Pengumuman</th>
              <th>Berlaku Mulai</th>
              <th>Berlaku Hingga</th>
              <th>Dibuat oleh</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {body?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-700 text-center odd:bg-gray-200 even:bg-gray-300"
                >
                  <td className="px-6 py-2 truncate max-w-32">{item.isi}</td>
                  <td className="px-6 py-2 truncate max-w-36">
                    {item.berlaku_mulai}
                  </td>
                  <td className="px-6 py-2 truncate max-w-36">
                    {item.berlaku_hingga}
                  </td>
                  <td className="px-6 py-2 truncate max-w-36">
                    {item.created_by}
                  </td>
                  <td className="flex py-2 items-center justify-center">
                    <div className="flex items-center justify-center gap-1">
                      <button type="button" onClick={() => onEdit(item.id)}>
                        <img src={iconedit} alt="Edit" className="w-6" />
                      </button>
                      <button type="button" onClick={() => onDelete(item.id)}>
                        <img src={icondelete} alt="Delete" className="w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <Pagination
        totalItems={totalItems}
        totalPages={totalPage}
        itemsPerPage={pageInterval}
        currentPage={page}
        onPageChange={(page) => {
          setPage(page);
        }} */}
      {/* /> */}
    </div>
  );
}

export default TablePengumuman;
