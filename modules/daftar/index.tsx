import Form from "next/form"

export default function() {
  return(
<div className="w-full h-dvh bg-[#D5D3D4] flex items-center justify-center p-4">
  <div className="bg-white px-4 py-6 rounded-3xl md:py-20 md:px-24 md:rounded-[44px] shadow-lg w-full md:max-w-[694px]">
    <Form action="isi-apa-kek" className="flex flex-col gap-8">
      <h1 className="text-2xl text-black font-semibold">Buat Akun</h1>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="font-medium text-black">Nama Lengkap</span>
          <input 
            type="text" 
            name="fullName" 
            placeholder="Contoh: John Doe"
            className="placeholder:text-lg border border-[#8E8E8E] px-5 py-3 rounded-xl focus:ring-2 focus:ring-[#AD8861] outline-none text-black"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black">Email</span>
          <input 
            type="email" 
            name="email" 
            placeholder="Contoh: johndoe@email.com"
            className="placeholder:text-lg border border-[#8E8E8E] px-5 py-3 rounded-xl focus:ring-2 focus:ring-[#AD8861] outline-none text-black"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black">Phone</span>
          <input 
            type="tel" 
            name="phone" 
            placeholder="Contoh: 08XXXXXXXXXX"
            className="placeholder:text-lg border border-[#8E8E8E] px-5 py-3 rounded-xl focus:ring-2 focus:ring-[#AD8861] outline-none text-black"
            required
          />
        </label>
      </div>
      <div className="w-full flex flex-col gap-3">
        <button 
          type="submit" 
          className="bg-[#4F1718] text-[#FAFAFA] w-full p-4 rounded-2xl hover:bg-[#AD8861] transition-colors font-semibold"
        >
          Daftar
        </button>
        <a href="isi apa lagi ini" className="underline text-sm text-[#4F1718]">Sudah punya akun? Masuk</a>
      </div>
    </Form>
  </div>
</div>
  )
}