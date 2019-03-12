export interface Register {
    FirstName:string;
    Lastname:string;
    email: string;
    password: string;
    confirmpassword:string;
    
  }
  export interface Login{
    email:string;
    password:string;
  }

  export interface Forgot{
    email:string;
  }

  export interface reset{
    password:string;
  }
  