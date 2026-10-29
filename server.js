// importa o express que será usado para criar a API
import express from "express";

// importa o cliente supabase criado no supabase.js
import { supabase } from "./supabase.js";

// cria a aplicação do servidor
const app = express();

// premite que o express leia json() para disponibilizar no req.body()
app.use(express.json());

// usa a porta definida na env ou se não existir usa a 3000
const PORT = process.env.PORT || 3000;

// define o que acontece quando alguem acessa arota inicial "/" usando o metodo GET
app.get("/", (req, res) => {
  // envia uma mensagem como resposta da requisição
  res.send("API de usuarios funcionando!");
});

// retorna a lista de usuarios inteira quando alguem acessa a rota /usuarios
app.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("*");

  // interrompe a função e retorna uma resposta de erro
  if (error) {
    return res.status(500).json({
      erro: "Erro ao buscar usuários",
    });
  }

  res.json(data);
});

app.post("/usuarios", async (req, res) => {
  // Extrai a propriedade name do objeto enviado pelo cliente => é uma forma de destruturação JavaScript
  const { name } = req.body;

  // o !name.trim() é pra verificar se não contem apenas espaços
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      erro: "O nome é obrigatório",
    });
  }

  const { data, error } = await supabase
    .from("usuarios")
    .insert({ name: name.trim() })
    .select()
    .single();
  // o .trim() aqui serve para remover os espaços no inicio e no fim do nome
  // o select seguido retorna o registro que acabou de criar

  if (error) {
    console.error(error);

    // retorna o status e o erro tratado
    return res.status(500).json({
      erro: "Erro ao cadastrar usuário",
    });
  }

  // retorna a resposta, junto com o status "201 Created"
  return res.status(201).json(data);
});

app.get("/usuarios/:id", async (req, res) => {
  // Captura o que esta escrito em "/:id" na URL
  const id = req.params.id;

  // expressão regular que verifica se o id é composto apenas por dígitos
  // ou
  // numeros não podem ser menores que 1
  if (!/^\d+$/.test(id) || Number(id) < 1) {
    // 400 Bad Request
    return res.status(400).json({
      erro: "ID inválido",
    });
  }

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  // O método eq significa equal, ou seja, igual.
  // Procura onde na coluna "id" é igual ao valor da variavel id
  // maybeSingle() espera apenas um usuario, mas aceita não encontrar nenhum, retornando null

  if (error) {
    console.error(error);

    // 500 Internal Server Error
    return res.status(500).json({
      erro: "Erro ao buscar usuário",
    });
  }

  if (!data) {
    // 404 Not Found
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  // retorna o usuario encontrado
  return res.json(data);
});

app.put("/usuarios/:id", async (req, res) => {
  // pega o valor presente em "/:id"
  const id = req.params.id;
  // Extrai a propriedade name do objeto enviado pelo cliente => é uma forma de destruturação JavaScript
  const { name } = req.body;

  // expressão regular que verifica se id é composto apenas por digitos
  // || = ou, se id é menor que 1
  if (!/^\d+$/.test(id) || Number(id) < 1) {
    // 400 Bad request
    return res.status(400).json({
      erro: "ID inválido",
    });
  }
  // typeof verifica o tipo da variavel, se for diferente de string, não passa
  // name.trim() verifica se é vazia, ou se só contem espaços
  if (!name || typeof name !== "string" || !name.trim()) {
    // 400 Bad request
    return res.status(400).json({
      erro: "O nome é obrigatório",
    });
  }

  // manda para o supabase quais valores devem ser atualizados, e onde
  const { data, error } = await supabase
    .from("usuarios")
    .update({ name: name.trim() })
    .eq("id", id) // restringe a atualização a apenas o id q é equivalente
    .select() // seleciona o registro que acabou de modificar
    .maybeSingle(); // espera um unico resultado, mas aceita null

  if (error) {
    console.error(error);
    // 500 Internal Server Error
    return res.status(500).json({
      erro: "Erro ao atualizar usuário",
    });
  }

  if (!data) {
    // 404 Not Found
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }
  // retorna o usuario encontrado
  return res.json(data);
});

app.delete("/usuarios/:id", async (req, res) => {
  // pega o valor presente em "/:id"
  const id = req.params.id;

  // expressão regular que verifica se id é composto apenas por digitos
  // || = ou, se id é menor que 1
  if (!/^\d+$/.test(id) || Number(id) < 1) {
    // 400 Bad Request
    return res.status(400).json({
      erro: "ID inválido",
    });
  }

  const { data, error } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", id) // restringe a atualização a apenas o id q é equivalente
    .select() // seleciona o registro que acabou de modificar
    .maybeSingle(); // espera um unico resultado, mas aceita null

  if (error) {
    console.error(error);
    // 500 Internal Server Error
    return res.status(500).json({
      erro: "Erro ao excluir usuário",
    });
  }

  if (!data) {
    // 404 Not Found
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  return res.status(200).json({
    mensagem: "Usuário excluido com sucesso",
    usuario: data,
  });
});
// inicia o servidor
app.listen(PORT, () => {
  // mostra no terminal qual porta esta usando
  console.log(`Servidor rodando na porta ${PORT}`);
});
