import { getAllPolls, createPoll, togglePollStatus, deletePoll } from '@/app/actions/polls';
import { Share2, Trash2, Power } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export default async function AdminPollingPage() {
  const polls = await getAllPolls();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Vox Populi</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Tambah Polling */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-bold text-slate-800 mb-6 border-b pb-4">Tambah Polling Baru</h2>
            
            <form action={createPoll} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pertanyaan Polling</label>
                <input required type="text" name="question" placeholder="Siapa pemenang laga ini?" className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 bg-slate-50 p-2 rounded">Tim A</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nama Tim</label>
                    <input required type="text" name="team_a_name" placeholder="Mis: Real Madrid" className="w-full p-2 border border-slate-300 rounded text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">URL Logo</label>
                    <input required type="url" name="team_a_logo" placeholder="https://..." className="w-full p-2 border border-slate-300 rounded text-sm outline-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 bg-slate-50 p-2 rounded">Tim B</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nama Tim</label>
                    <input required type="text" name="team_b_name" placeholder="Mis: Barcelona" className="w-full p-2 border border-slate-300 rounded text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">URL Logo</label>
                    <input required type="url" name="team_b_logo" placeholder="https://..." className="w-full p-2 border border-slate-300 rounded text-sm outline-none" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors mt-6">
                Simpan & Aktifkan
              </button>
            </form>
          </div>
        </div>

        {/* Daftar Polling */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm">
                  <th className="p-4 font-semibold text-slate-600">Pertanyaan</th>
                  <th className="p-4 font-semibold text-slate-600">Statistik Votes</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">Status</th>
                  <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {polls.map((poll) => (
                  <tr key={poll.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">
                      {poll.question}
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 relative"><SafeImage src={poll.team_a_logo} alt="A" fill className="object-contain"/></div>
                          {poll.team_a_name}
                        </div>
                        <span>vs</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 relative"><SafeImage src={poll.team_b_logo} alt="B" fill className="object-contain"/></div>
                          {poll.team_b_name}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-blue-600 font-bold">A: {poll.votes_a} suara</span>
                        <span className="text-red-600 font-bold">B: {poll.votes_b} suara</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${poll.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                        {poll.is_active ? 'AKTIF' : 'NONAKTIF'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <form action={togglePollStatus.bind(null, poll.id, poll.is_active)} className="inline-block">
                        <button type="submit" title={poll.is_active ? 'Nonaktifkan' : 'Aktifkan'} className={`p-2 rounded ${poll.is_active ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}>
                          <Power className="w-4 h-4" />
                        </button>
                      </form>
                      
                      <form action={deletePoll.bind(null, poll.id)} className="inline-block">
                        <button type="submit" title="Hapus" className="p-2 rounded text-red-600 hover:bg-red-50" onClick={(e) => { if(!confirm('Yakin ingin menghapus polling ini?')) e.preventDefault(); }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                
                {polls.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      Belum ada polling yang dibuat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
