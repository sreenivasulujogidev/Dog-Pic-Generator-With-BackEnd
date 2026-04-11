import express from "express";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/getDogPics", async (req, res) => {
  const dType = req.body.dogBreed;
  if (!dType) {
    return res.status(400).json({ error: "Please Enter the Dog Breed" });
  }
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${dType}/images/random`,
    );

    if (response.status === 404) {
      return res.status(409).json({
        error: "Dog Breed Not Found Verify Below",
        status: 409,
      });
    }
    if (!response.ok) {
      return res.status(502).json({ error: "DOG API Server Error" });
    }
    const data = await response.json();
    if (data.status !== "success") {
      return res
        .status(409)
        .json({ error: "Dog Breed Not Found Verify Below", status: 409 });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Crashed" });
  }
});
app.get("/breeds", (req, res) => {
  res.render("breeds.ejs");
});
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
  console.log(`Type http://localhost:8080/ in CHROME or any OTHER BROWSER`);
});
