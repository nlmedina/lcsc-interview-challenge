import React from "react";
import { Dialog, Text, VisuallyHidden } from "@radix-ui/themes";

import Movie from "../types/Movie";

interface MoviePreviewProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const MoviePreview: React.FC<MoviePreviewProps> = ({
  movie,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px" aria-description="Movie Preview">
        {movie === null ? (
          <Text>Error, movie info unavailable</Text>
        ) : (
          <>
            <VisuallyHidden>
              <Dialog.Title>{movie.Title}</Dialog.Title>
            </VisuallyHidden>
            <div>
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            </div>
            <Text>{JSON.stringify(movie, null, 2)}</Text>
          </>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
