import { z } from 'zod';

export const linkSchema = z.object({
    link: z.string().nonempty('Formato de URL inválido').url('Informe uma url válida'),
    shortLink: z.string().nonempty('Informe uma url minúscula e sem espaço/caracter especial').regex(/^[a-z0-9]+$/, 'Informe uma url minúscula e sem espaço/caracterespecial'),
});

export type LinkFormData = z.infer<typeof linkSchema>