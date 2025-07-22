
import { motion } from "framer-motion";

export default function CupomTrigger({ onClick, isOpen }: { onClick: () => void, isOpen: boolean }) {

    if (isOpen) {
        return
    }

    return (
        <>
            {!isOpen && (
                <motion.div
                    onClick={onClick}
                    className="fixed left-10 bottom-10 z-30 cursor-pointer"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -8, 0] }} // animação de "flutuação"
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="bg-white/40 backdrop-blur-sm shadow-xl border border-gray-200 p-3 rounded-full hover:scale-105 transition-transform">
                        <img
                            src="/kokiri.png"
                            alt="Abrir cupom"
                            width={48}
                            height={48}
                            className="rounded-full object-contain"
                            title="Abrir cupom!"
                        />
                    </div>
                </motion.div>
            )}
        </>
    );
}
