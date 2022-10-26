import { User } from "../../modules/user/domain/entities/User";



interface Ioption {
    where: Record<string, unknown>
}

class UserRepositoryMock<T>{
    public db: T[] = [];

    constructor(){}

    public findOne(option: Ioption ): void {
        const where = Object.keys(option.where)
        const property = Object.values(option.where)

        if(where.length > 1){
            const operator = (): string => {
                const query = `item.${where[0]} === "${property[0]}" && `
                const queryArray = []
                for(let i = 1; i < where.length - 1; i++ ){
                    queryArray.push(`item.${where[i]} === "${property[i]}" && `)
                }

                queryArray.push(`item.${where[where.length - 1]} === "${property[where.length - 1]}" `)
                return query.concat(...queryArray)
            }
            
            const res = this.db.filter((item) => eval(operator()) )
            
            console.log(res);
        }else {
            const res = this.db.filter((item) => eval(`item.${where[0]} === "${property[0]}"`))

            console.log(res);
        }


        
    }
}

const userR = new UserRepositoryMock<User>();
userR.db.push(new User({
    name: 'teste',
    email: 'teste@gmail.com',
    password: '213'
})) 

userR.db.push(new User({
    name: 'teste',
    email: 'teste123@gmail.com',
    password: '213'
})) 

userR.findOne({
    where: {
        name: 'teste',
        email: 'teste@gmail.com'
    } 
})