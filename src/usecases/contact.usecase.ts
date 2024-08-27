import { Contact, ContactCreate, ContactRepository } from "../interfaces/contatcts.interfaces";
import { UserRepository } from "../interfaces/user.interfaces";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase {
    private contactRepository: ContactRepository;
    private userRepository: UserRepository;
    constructor(){

        this.contactRepository = new ContactsRepositoryPrisma()
        this.userRepository = new UserRepositoryPrisma()
    }

    async create ({email,name,phone,userEmail}: ContactCreate){

        // email do usuario logado
        //buscar o usuario pelo email
        // se não existir, retornar erro
        // se existir, criar contato
        // antes de criar contato, validar se ele já existe pelo telefone ou email

        const user = await this.userRepository.findByEmail(userEmail);

        if(!user)   {
            throw new Error('Usuário não encontrado')


        }
        
        const verifyIfUserExists = await this.contactRepository.findByEmailOrPhone(email, phone);

        if(verifyIfUserExists){ 
            throw new Error('Contato já existe');
        }

        const contatact = this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id,



        });
        return contatact
           
    }



    async listAllContacts(userEmail: string){

        const user = await this.userRepository.findByEmail(userEmail);

        if (!user){

            throw new Error('Usuário não encontrado')
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts;



    }

    async updateContact({id, name, email, phone}: Contact){

        const data = await this.contactRepository.updateContact({id, name, email, phone})

        return data

    }

    async delete(id:string){

        const data = await this.contactRepository.delete(id);

        return data;


    }
}

export { ContactUseCase };