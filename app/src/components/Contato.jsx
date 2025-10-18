import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
const Contato = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Enviando...");
    const formData = new FormData(event.target);

    // 🔑 Substitua pelo seu access_key real do Web3Forms
    formData.append("access_key", "8b6c8539-d9ee-4d8c-baa0-3631f615f32b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Mensagem enviada com sucesso!");
      event.target.reset();
    } else {
      console.log("Erro:", data);
      setResult("");
       toast.error("Erro ao enviar a mensagem. Tente novamente.");  
    }
  };

  return (
    <div className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden" id="Contact">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Contato <span className="underline underline-offset-4 decoration-1 font-light">Queimap</span>
      </h1>

      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        Quer saber mais sobre os pontos turísticos de Queimadas ou divulgar seu próprio espaço?
        Fale conosco e ajude a fortalecer o turismo local!
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-gray-600 pt-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            <label className="block font-medium text-gray-700 mb-1">Seu Nome</label>
            <input
              className="w-full border border-gray-300 rounded py-3 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              name="Name"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="w-full md:w-1/2 text-left md:pl-4">
            <label className="block font-medium text-gray-700 mb-1">Seu Email</label>
            <input
              className="w-full border border-gray-300 rounded py-3 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              name="Email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
        </div>

        <div className="my-6 text-left">
          <label className="block font-medium text-gray-700 mb-1">Mensagem</label>
          <textarea
            className="w-full border border-gray-300 rounded py-3 px-4 mt-1 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="Message"
            placeholder="Escreva sua mensagem aqui..."
            required
          ></textarea>
        </div>

        <button
          className="bg-orange-500 text-white px-8 py-3 rounded hover:bg-orange-600 transition-colors"
          type="submit"
        >{result ?  result:"Enviar Mensagem"}
        </button>

        {/* Exibe o resultado do envio */}
        <p className="mt-4 text-gray-600">{result}</p>
      </form>
    </div>
  );
};

export default Contato;
