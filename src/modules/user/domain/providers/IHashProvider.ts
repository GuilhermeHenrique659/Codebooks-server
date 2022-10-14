
export interface IHashProvider {
    generateHash(password: string): Promise<string>;
    compareHash(hash1: string, hash2: string): Promise<boolean>;
}