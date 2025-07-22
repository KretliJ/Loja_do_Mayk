// components/VendaModal.tsx
import { Produto} from '../types/types'
import { PaymentForm } from './paymentForm';
import { Separator } from './separator';



interface Props {
  produto: Produto | null;
  onClose: () => void,
  

 
  
  
}

export function VendaModal({ produto, onClose,}: Props) {
  
  if (!produto) return null;

  return (


    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={onClose}>
      <div
        className="light:bg-background dark:bg-dark w-full max-w-md h-full p-6 overflow-y-auto shadow-lg mt-[60px] flex flex-col items-center z-50 light:text-txlight dark:text-txDark "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 light:text-txlight dark:text-txDark border-b border-gray-300 mx-auto">Carrinho</h2>
        {produto.Stock === 0 ? (
          <p className="light:text-txlight dark:text-txDark font-sans m-auto mx-auto">Nenhum item no carrinho.</p>
        ) : (
          <ul className="space-y-4 border-b border-gray-300 w-full h-[500px] mx-auto">
            
              <li key={produto.id} className="pb-2 flex flex-col items-center w-full  space-y-4 mx-auto">
                <p className="text-xl font-bold mt-4 font-sans light:text-txlight dark:text-txDark mx-auto ">{produto.title}</p>

                <div className="max-w-[60%] max-h-[170px] mx-auto w-full h-[170px] border border-gray-400 rounded-md px-5 py-4 shadow-2xl mb-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={produto.Iimage}
                    alt={produto.title}
                    className="object-contain h-full w-full max-w-full max-h-full rounded-xl mx-auto"
                  />
                </div>

                <p className="text-gray-600 mt-2 font-sans flex flex-col md:text-lg text-base font-medium break-words  max-h-20 mx-auto w-full text-center light:text-txlight dark:text-txDark ">
                  {produto.description}
                </p>
                <p className='text-lg font-semibold mt-2 font-sans light:text-txlight dark:text-txDark bg-green-600 max-w-32 rounded-2xl px-2 mx-auto'>R$ {produto.price.toFixed(2)}</p>
              </li>
            
          </ul>
        )}

        <PaymentForm produto={produto} />
        <button onClick={onClose} className=" bg-red-500 font-sans hover:bg-red-800 text-lg font-semibold light:text-txlight dark:text-txDark shadow cursor-pointer transition-colors duration-200 h-10 m text-center px-4 rounded w-52 disabled:opacity-50 mt-3 mx-auto mb-[60px]" aria-label="Fechar" title="Fechar">
          Fechar
        </button>
        <Separator className='mt-0'/>
      </div>
    </div>


);
}
