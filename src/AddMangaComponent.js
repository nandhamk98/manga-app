import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

function AddManga() {
  const [mangaName, setMangaName] = useState("");
  const [posterLink, setPosterLink] = useState("");
  const [mangaStatus, setMangaStatus] = useState("");
  const [mangaDescription, setMangaDescription] = useState("");
  // const [movieTrailer, setMovieTariler] = useState("");
  const history = useHistory();

  const addMangaThroughPost = (mangaData) => {
    fetch("https://6197ebee164fa60017c22ebd.mockapi.io/manga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mangaData),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("success : ", data);
        history.push("/manga");
      });
  };
  return (
    <div className="inputField">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Manga Name"
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMangaName(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Poster Link"
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setPosterLink(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Status"
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMangaStatus(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Description"
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMangaDescription(event.target.value);
          }}
        />
        {/* <TextField
          id="outlined-name"
          label="Trailer"
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMovieTariler(event.target.value);
          }}
        /> */}
      </Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => {
          const obj = {
            slug: mangaName,
            posterImage: posterLink,
            status: mangaStatus,
            description: mangaDescription,
            synopsis: mangaDescription,
            // trailer: movieTrailer,
          };

          addMangaThroughPost(obj);
        }}
      >
        Add Manga
      </Button>
    </div>
  );
}

export { AddManga };
