import { prisma } from "../Database/prisma-cliente";
import { User, UserRepository } from "../interfaces/user.interfaces";

class UserRepositoryPrisma implements UserRepository {
    async create(data: User): Promise<User> {
        const result = await prisma.user.create({
            data:{


                name:data.name,
                email: data.email
            },


        });
        return result;

    
}

    async findByEmail(email: string): Promise<User | null>{

        
        const result = await prisma.user.findFirst({

            where:{

                email

            },
        });


        return result || null;


    }

     
}

export { UserRepositoryPrisma };