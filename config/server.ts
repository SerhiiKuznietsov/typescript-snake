let port: unknown = process.env.PORT;

if (!Number.isInteger(parseInt(port as string))) port = 80;

export const PORT: number = port as number;