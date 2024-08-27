export interface Contact{
    id: String;
    name:String;
    email: String;
    phone: String;
    userId?: String;


}



export interface ContactCreate{


    name: string;
    email: string;
    phone: string;
    userEmail: string;
}

export interface ContactCreateData{
    
    name:String;
    email: String;
    phone: String;
    userId: String;


}

export interface ContactRepository{
    create(data: ContactCreateData): Promise<Contact>;
    findByEmailOrPhone(email:string, phone:string): Promise<Contact | null>;
    findAllContacts(userId: string): Promise<Contact[]>;
    updateContact({id, name, email, phone}: Contact): Promise<Contact>;
    delete(id: string): Promise<boolean>;



}

