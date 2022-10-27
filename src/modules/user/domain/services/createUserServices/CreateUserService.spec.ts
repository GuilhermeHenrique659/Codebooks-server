import { MockRepository } from "../../../../../shared/mock/RepositoryMock";
import { User } from "../../entities/User";
import { MockHashProvider } from "../../providers/MockHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository"
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserService } from "./CreateUserService"

let createUserService: CreateUserService;
let mockUserRepository: IUserRepository;

describe('Unit Test -> CreateUserService method', () => {
    beforeEach(() => {
        mockUserRepository = new UserRepository(new MockRepository<User>);

        createUserService = new CreateUserService(mockUserRepository, new MockHashProvider());
    });

    test('[SUCCESS TEST] - Should return a new User', async () => {
        const user = await createUserService.execute({
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123',
        });

        expect(user).toHaveProperty('id')
    });

    test('[FAIL TEST] - Should return error email Already Exists', async () => {
        await createUserService.execute({
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123',
        });
        await expect(createUserService.execute({
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123',
        })).rejects.toMatchObject({ "message": "Email already Exists", "statusCode": 400 })
    });
});