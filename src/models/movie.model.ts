import { z } from 'zod';

export const Movie = z.object({
  title: z.string().min(3).max(255),
  img: z.string().url(),
  vtype: z.string(),
  nfid: z.number().positive(),
  synopsis: z.string(),
  avgrating: z.number().positive(),
  year: z.number().positive(),
  runtime: z.number().positive(),
  imdbid: z.optional(z.string()),
  poster: z.string().url(),
  top250: z.optional(z.string()),
  top250tv: z.optional(z.string()),
  clist: z.optional(z.string()),
  titledate: z.optional(z.string()),
});

export type MovieType = z.infer<typeof Movie>;
