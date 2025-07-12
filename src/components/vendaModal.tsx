// components/VendaModal.tsx
import { Produto} from '@/types/types'
import { PaymentForm } from './paymentForm';



interface Props {
  produto: Produto | null;
  onClose: () => void 
}

// Lucas update component theme
export function VendaModal({ produto, onClose }: Props) {
  if (!produto) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-[var(--container-bg)] w-full max-w-md h-[800px] p-6 overflow-y-auto shadow-lg mt-[60px] flex flex-col items-center z-50 border border-[var(--container-border)] text-[var(--container-text)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border-primary)] text-[var(--header-text)] w-full text-center">
          Carrinho
        </h2>

        {produto.Stock === 0 ? (
          <p className="text-[var(--text-muted)] m-auto">
            Nenhum item no carrinho.
          </p>
        ) : (
          <ul className="space-y-4 border-b border-[var(--border-primary)] w-full h-[500px]">
            <li
              key={produto.id}
              className="pb-2 flex flex-col items-center w-full space-y-4"
            >
              <p className="text-xl font-bold mt-4 text-[var(--text-primary)] mx-auto text-center">
                {produto.title}
              </p>

              <div className="max-w-[60%] max-h-[170px] w-full h-[170px] border border-[var(--border-muted)] rounded-md px-5 py-4 shadow-2xl mb-1 flex items-center justify-center overflow-hidden bg-[var(--bg-muted)]">
                <img
                  src={produto.Iimage}
                  alt={produto.title}
                  className="object-contain h-full w-full max-w-full max-h-full rounded-xl"
                />
              </div>

              <p className="text-[var(--text-secondary)] mt-2 flex flex-col md:text-lg text-base font-medium break-words max-h-20 mx-auto w-full text-center">
                {produto.description}
              </p>

              <p className="text-lg font-semibold mt-2 text-[var(--button-text-default)] bg-[var(--color-success)] max-w-32 rounded-2xl px-2">
                R$ {produto.price.toFixed(2)}
              </p>
            </li>
          </ul>
        )}

        <PaymentForm produto={produto} />

        <button
          onClick={onClose}
          className="mt-6 bg-[var(--color-error)] hover:bg-[var(--color-error-dark)] text-[var(--button-text-hover)] px-4 py-2 rounded mx-auto"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}



////////////////////////

  // <div
  //   className={`
  //     fixed inset-0 bg-black/30 flex pt-12
  //     items-start justify-center
  //     sm:items-center sm:justify-center
  //     md:items-start md:justify-end
  //     z-50
  //   `}
  //   onClick={onClose}
  // >
  //   <div
  //     className={`
  //       w-full max-w-2xl bg-[#fff8dc] py-6 px-6 h-[80vh] overflow-y-auto flex flex-col items-center rounded-lg border-gray-700 border-2 shadow-2xl text-black
  //       mx-2
  //       md:rounded-l-lg md:rounded-r-none md:h-[90vh] md:w-[420px] md:mr-8
  //     `}
  //     onClick={(e) => e.stopPropagation()}
  //   >
  //     <div className="max-w-[85%] w-full border border-gray-400 rounded-md px-5 py-4 shadow-2xl mb-1">
  //       <img
  //         src={produto.Iimage}
  //         alt={produto.title}
  //         className="object-cover rounded-xl max-w-full max-h-full bg-center bg-no-repeat px-8 mx-auto min-w-full"
  //       />
  //       <h2 className="text-xl font-bold mt-4">{produto.title}</h2>
  //       <p className="text-gray-600 mt-2 flex flex-col md:text-lg text-base font-medium break-words max-h-20">
  //         {produto.description}
  //       </p>
  //       <p className="text-lg font-semibold mt-2 text-white bg-green-600 max-w-32 rounded-2xl px-2">
  //         R$ {produto.price.toFixed(2)}
  //       </p>
  //     </div>

  //     <PaymentForm produto={produto} />

  //     <button
  //       onClick={onClose}
  //       className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded w-60 disabled:opacity-50 mt-3 mx-auto"
  //     >
  //       Cancelar
  //     </button>
  //   </div>
  // </div>


  //////////////////////////

// return (
  //   // Lucas: Modal fecha ao clicar fora
  //   <div
  //     className="fixed inset-0 top-10 bg-black/30 flex justify-center items-start pt-12"
  //     onClick={onClose} // Clique fora fecha
  //   >
  //     <div
  //       className="w-full max-w-2xl bg-[#fff8dc] py-6 px-10 h-[800px] overflow-y-auto flex flex-col items-center rounded-lg border-gray-700 border-2 shadow-2xl text-black"
  //       onClick={(e) => e.stopPropagation()} // Clique dentro não fecha
  //     >
  //       <div className="max-w-[85%] w-full border border-gray-400 rounded-md px-5 py-4 shadow-2xl mb-1">
  //         <img
  //           src={produto.Iimage}
  //           alt={produto.title}
  //           className="object-cover rounded-xl max-w-full max-h-full bg-center bg-no-repeat px-8 mx-auto min-w-full"
  //         />
  //         <h2 className="text-xl font-bold mt-4">{produto.title}</h2>
  //         <p className="text-gray-600 mt-2 flex flex-col md:text-lg text-base font-medium break-words max-h-20">
  //           {produto.description}
  //         </p>
  //         <p className="text-lg font-semibold mt-2 text-white bg-green-600 max-w-32 rounded-2xl px-2">
  //           R$ {produto.price.toFixed(2)}
  //         </p>
  //       </div>

     
  //         <PaymentForm  produto={produto}/>
        

  //       <button
  //         onClick={onClose}
  //         className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded w-60 disabled:opacity-50 mt-3 mx-auto"
  //       >
  //         Cancelar
  //       </button>
  //     </div>
  //   </div>
  // );