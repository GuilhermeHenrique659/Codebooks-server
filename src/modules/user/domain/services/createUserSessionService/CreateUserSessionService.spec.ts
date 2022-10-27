import { MockRepository } from "../../../../../shared/mock/RepositoryMock";
import { User } from "../../entities/User";
import { MockHashProvider } from "../../providers/MockHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserService } from "../createUserServices/CreateUserService";
import { CreateUserSessionService } from "./CreateUserSessionService";

let createUserSession: CreateUserSessionService;
let createUserService: CreateUserService;
let mockUserRepository: IUserRepository;
describe('Unit Test -> CreateUserSessionService', () => {
    beforeEach(() => {
        mockUserRepository = new UserRepository(new MockRepository<User>);
        createUserSession = new CreateUserSessionService(mockUserRepository, new MockHashProvider());
        createUserService = new CreateUserService(mockUserRepository, new MockHashProvider());
        createUserService.execute({
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123',
        });
    });

    test('[SUCCESS TEST] - Should return new jwt and user', async () => {
        const userToken = await createUserSession.execute({
            email: 'teste@gmail.com',
            password: '123'
        });

        expect(userToken).toHaveProperty('token');
    });

    test('[FAIL TEST] - Should return error email not found', async () => {
        await expect(createUserSession.execute({
            email: 'teste124@gmail.com',
            password: '123'
        })).rejects.toMatchObject({ "message": "Email not Found", "statusCode": 400 })
    });

    test('[FAIL TES] - Should return erro password incorrect', async () => {
        await expect(createUserSession.execute({
            email: 'teste@gmail.com',
            password: 'dsfsd'
        })).rejects.toMatchObject({ "message": "Password Incorrect!", "statusCode": 400 })
    });
});