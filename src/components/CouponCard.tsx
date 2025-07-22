
import { motion } from "framer-motion";

interface ZeldaModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CouponCard({isOpen, onClose}:ZeldaModalProps) {


    if (!isOpen) {
        return null;
    }

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-30 bg-background dark:bg-dark light:text-txlight dark:text-txDark shadow-2xl rounded-2xl border dark:border-gray-200  w-[250px] p-4 flex flex-col gap-4 h-[400px]"
        >
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <img
              src="/zelda10.png" // Altere para sua imagem
              alt="Promoção"
              className="object-cover"
            />
          </div>

          <div className="text-center">
            <h2 className=" font-semibold text-xs text-gray-900 dark:text-white mt-4 md:text-sm font-sans">Não fique sozinho, leve este cupom de 20% de desconto!</h2>
            <p className="font-semibold text-xs text-gray-900 mt-4 md:text-sm font-sans dark:text-white">Use o cupom abaixo no checkout</p>
            <div className="bg-gray-100 border border-dashed border-gray-400 rounded-lg p-2 mt-2 font-mono text-xl tracking-wider text-gray-800 select-all">
              ZELDA20
            </div>
          </div>

          <button
            onClick={() => onClose(false)}
            className="w-full mt-2 px-4 py-2 text-white dark:text-gray-900 rounded-md border border-gray-300 transition-all bg-red-500 hover:bg-red-800"
          >
            Fechar
          </button>
        </motion.div>
      )}
    </>
  );
}
