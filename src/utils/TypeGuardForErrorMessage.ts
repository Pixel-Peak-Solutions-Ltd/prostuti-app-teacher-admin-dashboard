// type guard for error message
export function hasDataProperty(error): error is { data: { message: string; }; } {
    return (
        error !== null &&
        typeof error === 'object' &&
        'data' in error &&
        typeof error.data === 'object' &&
        'message' in error.data
    );
}