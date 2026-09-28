export default function AgendaPage() {
    return (
        <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/20 dark:bg-cyan-600/20 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute top-[30%] left-[-15%] w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
                <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: "4s" }} />
            </div>

            <section className="pt-24 pb-24 md:pt-32 md:pb-32 relative">
                <div className="mx-auto max-w-3xl px-6 text-center space-y-6">
                    <p className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#00D9FF] text-[#001F3F]">
                        AIFEST 2027
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-semibold text-[#001F3F] dark:text-white leading-tight"
                        style={{ fontFamily: "Blanka, sans-serif" }}
                    >
                        Agenda Coming Soon
                    </h1>
                    <p className="text-lg md:text-xl text-[#001F3F]/70 dark:text-white/70 max-w-2xl mx-auto">
                        We are preparing the schedule for the next edition. Check back soon for sessions, timings, and the full AIFEST 2027 programme.
                    </p>
                </div>
            </section>
        </main>
    );
}
