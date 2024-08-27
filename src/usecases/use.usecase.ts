import { UserCreate, UserRepository } from "../interfaces/user.interfaces";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase{
    private userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepositoryPrisma()
    }

    async create ({name, email}: UserCreate): Promise<User>{


        const verifyIfUserExists = await this.userRepository.findByEmail(email);
        
        if (verifyIfUserExists){
            throw new Error('Usuário já existe')
        }
        const result = await this.userRepository.create({email, name}); 

        return result;


    }


}

export {UserUseCase};