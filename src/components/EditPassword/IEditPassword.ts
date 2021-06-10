export interface IEditPasswordProps{

}

export interface IEditPasswordStates{
    oldPassword:string;
    newPassword: string;
    confirmPassword: string;
    successSnackBar: boolean;
    errorSnackBar: boolean;
    errorConfirmPassword: boolean;
    errorSnackBarMessage: string;
}