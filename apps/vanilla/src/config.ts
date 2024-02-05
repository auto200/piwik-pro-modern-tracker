import { object, string, length, safeParse, ObjectSchema } from 'valibot';
const configSchema = object({
  VITE_TRACKER_BASE_URL: string(),
  VITE_SITE_ID: string('Id must be 36 characters long', [
    length(36, 'Id must be 36 characters long'),
  ]),
});

export const config = parseEnv(configSchema);

function parseEnv<T extends ObjectSchema<Record<string, any>>>(schema: T) {
  const parsed = safeParse(schema, import.meta.env);

  if (!parsed.success) {
    console.log(parsed.issues);
    const errors = parsed.issues.map((issue) => `${issue.path?.[0].key} - ${issue.message}`);
    throw new Error(`Env parsing error:\n ${errors.join('\n')}`);
  }

  return parsed.output;
}
