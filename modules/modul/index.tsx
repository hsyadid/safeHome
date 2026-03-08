'use client'

export default function ModulPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b0c] via-[#4F1718] to-[#2d1114] relative">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
            <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-jakarta">
            Modul
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-jakarta">
            Kumpulan modul edukatif yang disusun oleh tim SafeHome Anara untuk mendukung pemahaman dan pencegahan kekerasan berbasis gender
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-jakarta">Segera Hadir</h3>
          <p className="text-white/60 font-jakarta">
            Modul-modul edukatif sedang dalam proses penyusunan dan akan segera tersedia untuk diunduh.
          </p>
        </div>
      </div>
    </div>
  )
}
