import { Box, Typography, Grid } from "@mui/material";
import FlashcardIcon from "./../../../../assets/icons/flashcard.svg?react";

export default function FlashcardsPage() {
  const demoFlashcards = [
    { id: 1, title: "World War II" },
    { id: 2, title: "World War II" },
    { id: 3, title: "World War II" },
    { id: 4, title: "World War II" },
  ];

  return (
    <Box sx={{ flexGrow: 1, marginTop: 4 }}>
      <Box sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold">
            Recent Flashcards
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            View all
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {demoFlashcards.map((flashcard) => (
            <Grid key={flashcard.id} item xs={6} sm={4} md={3}>
              <Box sx={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    p: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <FlashcardIcon style={{ color: "#9e9e9e", fontSize: 40 }} />
                </Box>
                <Typography variant="body1" color="text.primary">
                  {flashcard.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
