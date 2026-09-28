import { EditionContent } from "../../components/edition/EditionContent";
import { editionData } from "./data";

export default function EditionTemplatePage() {
    return (
        <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-0">
            {/* Sitewide Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/20 dark:bg-cyan-600/20 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute top-[30%] left-[-15%] w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            <EditionContent {...editionData} />
        </main>
    );
}
