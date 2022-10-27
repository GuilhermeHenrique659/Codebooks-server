import { MockRepository } from "../../../../../shared/mock/RepositoryMock";
import { User } from "../../entities/User";
import { MockHashProvider } from "../../providers/MockHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository"
import { UserRepository } from "../../repositories/UserRepository";
import { UpdateUserService } from "./UpdateUserService"



let mockRepository: IUserRepository;
let service: UpdateUserService;
let user: User
describe('Unit Test -> UpdateUserService', () => {
    beforeEach(() => {
        mockRepository = new UserRepository(new MockRepository<User>);
        service = new UpdateUserService(mockRepository, new MockHashProvider());
        user = new User({
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123'
        });
        mockRepository.store(user);
    });

    test('[SUCCESS TEST] - Should update user name', async () => {
        const userUpdated = await service.execute({
            id: user.id,
            name: 'teste123',
            passwordToConfirm: '123',
        });

        expect(userUpdated).toMatchObject({
            name: 'teste123',
        })
    });

    test('[SUCCESS TES] - Should update email and password', async () => {
        const userUpdated = await service.execute({
            id: user.id,
            email: 'teste123@gmail.com',
            password: '567',
            passwordToConfirm: '123',
        });

        expect(userUpdated).toMatchObject({
            name: 'teste',
            email: 'teste123@gmail.com',
            password: '567',
        });
    });

    test('[FAIL TEST] - Should return error password incorret', async () => {
        await expect(service.execute({
            id: user.id,
            name: 'test123',
            passwordToConfirm: '890'
        })).rejects.toMatchObject({ "message": "Password Incorrect!", "statusCode": 400 });
    });

    test('[FAIL TEST - Should return error email already used', async () => {
        await mockRepository.store(new User({
            name: 'teste',
            email: 'testeAlreadyExists@gmail.com',
            password: '123'
        }))
        await expect(service.execute({
            id: user.id,
            email: 'testeAlreadyExists@gmail.com',
            passwordToConfirm: '123'
        })).rejects.toMatchObject({ "message": "Email already used", "statusCode": 400 });
    })
})