import express from "express"; // importando express
import path from "path"; // serve para definir caminhos padrões

const __dirname = path.resolve(path.dirname(``)); // dirname serve para informar o caminho padrão local.

const app = express(); //instanciando express dentro da const app

app.use(express.urlencoded({ extended: true })); // O corpo(body) da requisição
app.use(express.json()); // Converte para JSON

app.set("view engine", "ejs"); // Faz com que o express reconheça o ejs como motor de visualização
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3001 || "https://infinite-mesa-81685.herokuapp.com/";

app.listen(PORT, () => console.log(`Server in http://localhost:${PORT}`));

const pokedex = [
  {
    id: 1,
    number: `001`,
    name: "Bulbasaur",
    type: "Leaf",
    category: "Seed",
    abilities: "Overgrow",
    height: "0.7 m",
    weight: "6.9 kg",
    description:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this pokemon.",
    img: "/img/bulbasaur.png",
  },
  {
    id: 2,
    number: `004`,
    name: "Charmander",
    type: "Fire",
    category: "Lizard",
    abilities: "Blaze",
    height: "0.6 m",
    weight: "8.5 kg",
    description:
      "From the time it is born, a flame burns at the tip of its tail. It's life would end if its flame were to go out.",
    img: "/img/charmander.png",
  },
  {
    id: 3,
    number: `007`,
    name: "Squirtle",
    type: "Water",
    category: "Tiny Turtle",
    abilities: "Torrent",
    height: "0.5 m",
    weight: "9.0 kg",
    description:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    img: "/img/squirtle.png",
  },
];

app.get(`/`, (req, res) => {
  // get é um método http/https para criar um servidor
  res.render("index.ejs", {
    pokedex,
  }); // a pasta views já é reconhecida automaticamente, logo não precisa dar o endereço completo
});

app.get(`/detalhes/:id`, (req, res) => {
  let pokemon;
  pokedex.filter((element) => {
    if (element.id == req.params.id) {
      pokemon = element;
    }
  });
  console.log(pokemon);
  res.render(`detalhes.ejs`, { pokemon });
});

app.get(`/cadastro`, (req, res) => {
  res.render("cadastro.ejs");
});

app.post(`/cadastro`, (req, res) => {
  let id = pokedex.length + 1;
  const {
    number,
    name,
    type,
    category,
    abilities,
    height,
    weight,
    description,
    img,
  } = req.body;
  pokedex.push({
    id,
    number,
    name,
    type,
    category,
    abilities,
    height,
    weight,
    description,
    img,
  });
  console.log(pokedex);
  res.redirect("/");
});
