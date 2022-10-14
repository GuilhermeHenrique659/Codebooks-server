import { IHashProvider } from "./IHashProvider";

export class MockHashProvider implements IHashProvider {
    public async generateHash(password: string): Promise<string> {
        return password
    }

    public async compareHash(hash1: string, hash2: string): Promise<boolean> {
        return hash1 === hash2;
    }
}