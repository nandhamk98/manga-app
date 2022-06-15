import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function EditManga() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  useEffect(() => {
    fetch("https://6197ebee164fa60017c22ebd.mockapi.io/manga/" + id)
      .then((data) => data.json())
      .then((mvs) => {
        setManga(mvs);
      });
  }, [id]);

  return manga ? <EditMangaSubComp manga={manga} /> : "";
}

function EditMangaSubComp({ manga }) {
  const [mangaName, setMangaName] = useState(manga.slug);
  const [posterLink, setPosterLink] = useState(manga.posterImage);
  const [mangaStatus, setMangaStatus] = useState(manga.status);
  const [mangaDescription, setMangaDescription] = useState(manga.description);

  const editMangaThroughPut = (mangaData) => {
    fetch("https://6197ebee164fa60017c22ebd.mockapi.io/manga/" + manga.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mangaData),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("success : ", data);
      });
  };

  const history = useHistory();
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
          value={mangaName}
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMangaName(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Poster Link"
          value={posterLink}
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setPosterLink(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Rating"
          value={mangaStatus}
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMangaStatus(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Description"
          value={mangaDescription}
          style={{ width: "100%", margin: "10px" }}
          onChange={(event) => {
            setMangaDescription(event.target.value);
          }}
        />
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
          };

          editMangaThroughPut(obj);
          history.push("/manga");
        }}
      >
        Update Manga
      </Button>
    </div>
  );
}

export { EditManga };
