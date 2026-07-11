import zod from 'zod';

export async function zodValidator(schema: zod.ZodType, body: any) {
    const parsed = schema.safeParse(body);
    if(!parsed.success) {
        const formattedErrors = parsed.error.issues.map((e: any) => ({ path: e.path, msg: e.message }));
        return formattedErrors;
    }
    return null
}