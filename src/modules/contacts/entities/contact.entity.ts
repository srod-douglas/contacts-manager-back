export class Contact {
    readonly id: number;
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
    created_at: Date;
}
